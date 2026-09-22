import os
import subprocess
import tempfile
from pathlib import Path

import mlx_whisper

DETECTION_MODEL_REPO = "mlx-community/whisper-small-mlx"
MODEL_REPOS = {
    "fast": "mlx-community/whisper-small-mlx",
    "accurate": "mlx-community/whisper-large-v3-turbo",
}
DECODE_TEMPERATURE = (0.2, 0.4, 0.6, 0.8, 1.0)
DECODE_SETTINGS = {
    "fast": {"best_of": 3},
    "accurate": {"best_of": 5},
}
LANGUAGE_DETECTION_CLIP_SECONDS = "10"


def probe_duration(path: str) -> float:
    result = subprocess.run(
        [
            "ffprobe",
            "-v", "error",
            "-show_entries", "format=duration",
            "-of", "csv=p=0",
            path,
        ],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0 or not result.stdout.strip():
        raise RuntimeError(f"ffprobe duration probe failed: {result.stderr}")

    return float(result.stdout.strip())


def convert_to_wav(input_path: str, max_seconds: float | None = None) -> str:
    output_fd, output_path = tempfile.mkstemp(suffix=".wav")
    os.close(output_fd)

    command = ["ffmpeg", "-y", "-i", input_path, "-ar", "16000", "-ac", "1"]
    if max_seconds is not None:
        command += ["-t", str(max_seconds)]
    command += ["-f", "wav", output_path]

    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"ffmpeg conversion failed: {result.stderr}")

    return output_path


def detect_language(wav_path: str) -> str:
    clip_fd, clip_path = tempfile.mkstemp(suffix=".wav")
    os.close(clip_fd)

    result = subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i", wav_path,
            "-t", LANGUAGE_DETECTION_CLIP_SECONDS,
            "-ar", "16000",
            "-ac", "1",
            "-f", "wav",
            clip_path,
        ],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        Path(clip_path).unlink(missing_ok=True)
        raise RuntimeError(f"ffmpeg clip extraction failed: {result.stderr}")

    try:
        detection_result = mlx_whisper.transcribe(
            clip_path,
            path_or_hf_repo=DETECTION_MODEL_REPO,
            word_timestamps=False,
            condition_on_previous_text=False,
        )
    finally:
        Path(clip_path).unlink(missing_ok=True)

    return detection_result["language"]


def transcribe(
    audio_path: str,
    language: str,
    max_seconds: float | None = None,
    model_quality: str = "accurate",
) -> tuple[list[dict], str]:
    wav_path = convert_to_wav(audio_path, max_seconds)
    try:
        detected_language = detect_language(wav_path)
        settings = DECODE_SETTINGS.get(model_quality, DECODE_SETTINGS["fast"])
        result = mlx_whisper.transcribe(
            wav_path,
            path_or_hf_repo=MODEL_REPOS.get(model_quality, MODEL_REPOS["fast"]),
            word_timestamps=True,
            language=language,
            condition_on_previous_text=False,
            temperature=DECODE_TEMPERATURE,
            best_of=settings["best_of"],
        )
    finally:
        Path(wav_path).unlink(missing_ok=True)

    words: list[dict] = []
    for segment in result.get("segments", []):
        for w in segment.get("words", []):
            words.append(
                {
                    "word": w["word"],
                    "start": w["start"],
                    "end": w["end"],
                }
            )
    return words, detected_language
