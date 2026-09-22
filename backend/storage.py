import json
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "data" / "history.db"


def get_connection():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    connection = get_connection()
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS analyses (
            id TEXT PRIMARY KEY,
            created_at TEXT NOT NULL,
            name TEXT NOT NULL,
            filename TEXT NOT NULL,
            language TEXT NOT NULL,
            result TEXT NOT NULL
        )
        """
    )
    connection.commit()
    connection.close()


def save_analysis(analysis_id: str, created_at: str, name: str, filename: str, language: str, result: dict):
    connection = get_connection()
    connection.execute(
        "INSERT INTO analyses (id, created_at, name, filename, language, result) VALUES (?, ?, ?, ?, ?, ?)",
        (analysis_id, created_at, name, filename, language, json.dumps(result)),
    )
    connection.commit()
    connection.close()


def list_analyses() -> list[dict]:
    connection = get_connection()
    rows = connection.execute(
        "SELECT id, created_at, name, language, result FROM analyses ORDER BY created_at DESC"
    ).fetchall()
    connection.close()

    summaries = []
    for row in rows:
        summary = json.loads(row["result"])["summary"]
        summaries.append(
            {
                "id": row["id"],
                "created_at": row["created_at"],
                "name": row["name"],
                "language": row["language"],
                "avg_wpm": summary["avg_wpm"],
                "filler_count": summary["filler_count"],
                "fluency_score": summary["fluency_score"],
                "total_duration": summary["total_duration"],
            }
        )
    return summaries


def get_analysis(analysis_id: str) -> dict | None:
    connection = get_connection()
    row = connection.execute(
        "SELECT id, created_at, name, filename, language, result FROM analyses WHERE id = ?",
        (analysis_id,),
    ).fetchone()
    connection.close()

    if row is None:
        return None

    return {
        "id": row["id"],
        "created_at": row["created_at"],
        "name": row["name"],
        "language": row["language"],
        "filename": row["filename"],
        **json.loads(row["result"]),
    }


def rename_analysis(analysis_id: str, name: str) -> bool:
    connection = get_connection()
    cursor = connection.execute("UPDATE analyses SET name = ? WHERE id = ?", (name, analysis_id))
    connection.commit()
    updated = cursor.rowcount > 0
    connection.close()
    return updated


def delete_analysis(analysis_id: str) -> str | None:
    connection = get_connection()
    row = connection.execute(
        "SELECT filename FROM analyses WHERE id = ?", (analysis_id,)
    ).fetchone()
    connection.execute("DELETE FROM analyses WHERE id = ?", (analysis_id,))
    connection.commit()
    connection.close()
    return row["filename"] if row else None
