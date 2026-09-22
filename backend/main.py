import shutil
import uuid
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

from analyzer import analyze
from storage import delete_analysis, get_analysis, init_db, list_analyses, rename_analysis, save_analysis
from transcriber import probe_duration, transcribe

app = FastAPI(title="Speech Habit Analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_EXTENSIONS = {".mp3", ".wav", ".m4a", ".mp4", ".webm", ".ogg"}
SUPPORTED_LANGUAGES = {"tr", "en", "it", "es", "de", "fr"}
HARD_MAX_ANALYSIS_SECONDS = 1800
RECORDINGS_DIR = Path(__file__).parent / "recordings"
TMP_DIR = Path(__file__).parent / "tmp"

RECORDINGS_DIR.mkdir(exist_ok=True)
if TMP_DIR.exists():
    shutil.rmtree(TMP_DIR)
TMP_DIR.mkdir(exist_ok=True)
init_db()


class SaveRequest(BaseModel):
    id: str
    name: str
    language: str
    result: dict


class RenameRequest(BaseModel):
    name: str


def find_tmp_file(analysis_id: str) -> Path | None:
    matches = list(TMP_DIR.glob(f"{analysis_id}.*"))
    return matches[0] if matches else None


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze")
async def analyze_audio(
    file: UploadFile = File(...),
    language: str = Form(...),
    limit_seconds: int | None = Form(None),
    model_quality: str = Form("accurate"),
):
    if language not in SUPPORTED_LANGUAGES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported language: {language}. Supported: {sorted(SUPPORTED_LANGUAGES)}",
        )

    if model_quality not in {"fast", "accurate"}:
        raise HTTPException(
            status_code=400,
            detail="Unsupported model_quality. Supported: ['fast', 'accurate']",
        )

    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {suffix}. Supported: {sorted(ALLOWED_EXTENSIONS)}",
        )

    analysis_id = uuid.uuid4().hex
    tmp_path = TMP_DIR / f"{analysis_id}{suffix}"
    tmp_path.write_bytes(await file.read())

    try:
        original_duration = probe_duration(str(tmp_path))
    except RuntimeError as e:
        tmp_path.unlink(missing_ok=True)
        raise HTTPException(status_code=422, detail="Could not read the audio file.")

    effective_limit = min(limit_seconds, HARD_MAX_ANALYSIS_SECONDS) if limit_seconds else HARD_MAX_ANALYSIS_SECONDS
    was_truncated = original_duration > effective_limit
    hit_hard_cap = was_truncated and effective_limit == HARD_MAX_ANALYSIS_SECONDS and (
        limit_seconds is None or limit_seconds > HARD_MAX_ANALYSIS_SECONDS
    )

    try:
        words, detected_language = transcribe(
            str(tmp_path),
            language,
            max_seconds=effective_limit if was_truncated else None,
            model_quality=model_quality,
        )
    except RuntimeError as e:
        tmp_path.unlink(missing_ok=True)
        raise HTTPException(status_code=500, detail=str(e))

    if not words:
        tmp_path.unlink(missing_ok=True)
        raise HTTPException(status_code=422, detail="No speech detected in the audio file.")

    if words[-1]["end"] <= 0:
        tmp_path.unlink(missing_ok=True)
        raise HTTPException(status_code=422, detail="Audio was too short or corrupted to analyze.")

    result = analyze(words, language)
    result["detected_language"] = detected_language
    result["language_mismatch"] = detected_language != language
    result["truncated"] = (
        {
            "original_duration": round(original_duration, 2),
            "limit_seconds": effective_limit,
            "hit_hard_cap": hit_hard_cap,
        }
        if was_truncated
        else None
    )

    return {"id": analysis_id, "language": language, **result}


@app.get("/tmp-recordings/{analysis_id}")
def get_tmp_recording(analysis_id: str):
    path = find_tmp_file(analysis_id)
    if path is None:
        raise HTTPException(status_code=404, detail="Recording not found or already saved.")
    return FileResponse(path)


@app.post("/history")
def save_history_item(payload: SaveRequest):
    tmp_path = find_tmp_file(payload.id)
    if tmp_path is None:
        raise HTTPException(status_code=404, detail="Recording not found or already saved.")

    stored_filename = f"{payload.id}{tmp_path.suffix}"
    stored_path = RECORDINGS_DIR / stored_filename
    shutil.move(str(tmp_path), str(stored_path))

    created_at = datetime.now(timezone.utc).isoformat()
    name = payload.name.strip() or "Untitled Recording"
    save_analysis(payload.id, created_at, name, stored_filename, payload.language, payload.result)

    return {"id": payload.id, "created_at": created_at, "name": name, "language": payload.language, **payload.result}


@app.get("/history")
def get_history():
    return list_analyses()


@app.get("/history/{analysis_id}")
def get_history_item(analysis_id: str):
    analysis = get_analysis(analysis_id)
    if analysis is None:
        raise HTTPException(status_code=404, detail="Analysis not found.")
    return analysis


@app.patch("/history/{analysis_id}")
def rename_history_item(analysis_id: str, payload: RenameRequest):
    name = payload.name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="Name cannot be empty.")
    updated = rename_analysis(analysis_id, name)
    if not updated:
        raise HTTPException(status_code=404, detail="Analysis not found.")
    return {"id": analysis_id, "name": name}


@app.delete("/history/{analysis_id}")
def delete_history_item(analysis_id: str):
    filename = delete_analysis(analysis_id)
    if filename is None:
        raise HTTPException(status_code=404, detail="Analysis not found.")
    (RECORDINGS_DIR / filename).unlink(missing_ok=True)
    return {"deleted": True}


@app.get("/recordings/{analysis_id}")
def get_recording(analysis_id: str):
    analysis = get_analysis(analysis_id)
    if analysis is None:
        raise HTTPException(status_code=404, detail="Analysis not found.")
    path = RECORDINGS_DIR / analysis["filename"]
    if not path.exists():
        raise HTTPException(status_code=404, detail="Recording file not found.")
    return FileResponse(path)
