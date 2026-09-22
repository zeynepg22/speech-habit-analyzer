import math
from collections import Counter

from filler_words import FILLERS_BY_LANGUAGE, normalize_word

PAUSE_THRESHOLD_SECONDS = 0.5
PACE_WINDOW_SECONDS = 10.0
LONG_PAUSE_SECONDS = 2.0
NATURAL_PAUSES_PER_MINUTE = 6
REPETITION_MAX_WINDOW = 10
REPETITION_MIN_WINDOW = 3
REPETITION_MIN_REPEATS = 4
FILLER_DENSITY_DECAY = 3.0


def annotate_fillers(words: list[dict], language: str) -> tuple[list[dict], list[str]]:
    fillers = FILLERS_BY_LANGUAGE.get(language, set())
    max_phrase_len = max((len(f.split()) for f in fillers), default=1)
    normalized = [normalize_word(w["word"], language) for w in words]

    annotated = [
        {"word": w["word"], "start": w["start"], "end": w["end"], "is_filler": False, "filler_group": None}
        for w in words
    ]
    filler_phrases = []
    group_id = 0

    i = 0
    while i < len(words):
        matched = False
        for n in range(max_phrase_len, 0, -1):
            if i + n > len(words):
                continue
            phrase = " ".join(normalized[i:i + n])
            if phrase in fillers:
                for j in range(i, i + n):
                    annotated[j]["is_filler"] = True
                    annotated[j]["filler_group"] = group_id
                group_id += 1
                filler_phrases.append(phrase)
                i += n
                matched = True
                break
        if not matched:
            i += 1

    return annotated, filler_phrases


def normalize_for_repetition(word: str) -> str:
    return word.strip().strip(".,!?;:…'\"¿¡").replace("’", "'").lower()


def detect_repetition(words: list[dict]) -> tuple[bool, str | None]:
    normalized = [normalize_for_repetition(w["word"]) for w in words]
    total = len(normalized)

    for window in range(REPETITION_MAX_WINDOW, REPETITION_MIN_WINDOW - 1, -1):
        i = 0
        while i + window * REPETITION_MIN_REPEATS <= total:
            phrase = normalized[i:i + window]
            if any(phrase):
                repeats = 1
                j = i + window
                while j + window <= total and normalized[j:j + window] == phrase:
                    repeats += 1
                    j += window
                if repeats >= REPETITION_MIN_REPEATS:
                    snippet = " ".join(w for w in phrase if w)
                    return True, snippet
            i += 1

    return False, None


def detect_pauses(words: list[dict]) -> list[dict]:
    pauses = []
    for prev, nxt in zip(words, words[1:]):
        gap = nxt["start"] - prev["end"]
        if gap > PAUSE_THRESHOLD_SECONDS:
            pauses.append(
                {
                    "start": prev["end"],
                    "end": nxt["start"],
                    "duration": round(gap, 3),
                }
            )
    return pauses


def compute_pace_timeline(words: list[dict]) -> list[dict]:
    if not words:
        return []

    total_duration = words[-1]["end"]
    num_windows = int(total_duration // PACE_WINDOW_SECONDS) + 1

    timeline = []
    for i in range(num_windows):
        window_start = i * PACE_WINDOW_SECONDS
        window_end = window_start + PACE_WINDOW_SECONDS
        word_count = sum(
            1 for w in words if window_start <= w["start"] < window_end
        )
        wpm = round(word_count * (60.0 / PACE_WINDOW_SECONDS))
        timeline.append(
            {
                "time_window": f"{int(window_start)}-{int(window_end)}s",
                "wpm": wpm,
            }
        )
    return timeline


def compute_tempo_consistency_score(pace_timeline: list[dict]) -> float:
    values = [p["wpm"] for p in pace_timeline if p["wpm"] > 0]
    if len(values) < 2:
        return 100.0
    mean = sum(values) / len(values)
    variance = sum((v - mean) ** 2 for v in values) / len(values)
    std = variance ** 0.5
    coefficient_of_variation = std / mean
    return max(0.0, min(100.0, 100.0 - coefficient_of_variation * 150))


def compute_pause_regularity_score(pauses: list[dict], total_duration: float) -> float:
    if total_duration <= 0 or not pauses:
        return 100.0
    pauses_per_minute = len(pauses) / (total_duration / 60.0)
    frequency_penalty = max(0.0, pauses_per_minute - NATURAL_PAUSES_PER_MINUTE) * 5
    long_pause_penalty = sum(max(0.0, p["duration"] - LONG_PAUSE_SECONDS) for p in pauses) * 8
    return max(0.0, min(100.0, 100.0 - frequency_penalty - long_pause_penalty))


def compute_filler_density_score(filler_count: int, total_words: int) -> float:
    if total_words == 0:
        return 100.0
    ratio = filler_count / total_words
    return max(0.0, min(100.0, 100.0 * math.exp(-FILLER_DENSITY_DECAY * ratio)))


def compute_fluency_score(
    pace_timeline: list[dict],
    pauses: list[dict],
    total_duration: float,
    filler_count: int,
    total_words: int,
) -> tuple[int, dict]:
    tempo_consistency = round(compute_tempo_consistency_score(pace_timeline))
    pause_regularity = round(compute_pause_regularity_score(pauses, total_duration))
    filler_density = round(compute_filler_density_score(filler_count, total_words))

    fluency_score = round(
        tempo_consistency * 0.40 + pause_regularity * 0.35 + filler_density * 0.25
    )

    return fluency_score, {
        "tempo_consistency": tempo_consistency,
        "pause_regularity": pause_regularity,
        "filler_density": filler_density,
    }


def build_summary(
    words: list[dict],
    pauses: list[dict],
    filler_phrases: list[str],
    pace_timeline: list[dict],
) -> dict:
    total_duration = words[-1]["end"] if words else 0.0
    total_words = len(words)
    avg_wpm = round(total_words / (total_duration / 60.0)) if total_duration > 0 else 0

    filler_counter = Counter(filler_phrases)
    most_common_filler = None
    most_common_filler_tied = None
    most_common_filler_tied_count = None

    if filler_counter:
        max_count = max(filler_counter.values())
        top_fillers = sorted(word for word, count in filler_counter.items() if count == max_count)
        if len(top_fillers) == 1:
            most_common_filler = top_fillers[0]
        else:
            most_common_filler_tied = top_fillers
            most_common_filler_tied_count = max_count

    if pauses:
        durations = [p["duration"] for p in pauses]
        avg_pause_duration = round(sum(durations) / len(durations), 2)
        longest_pause = round(max(durations), 2)
    else:
        avg_pause_duration = 0.0
        longest_pause = 0.0

    fluency_score, fluency_breakdown = compute_fluency_score(
        pace_timeline, pauses, total_duration, len(filler_phrases), total_words
    )

    return {
        "total_duration": round(total_duration, 2),
        "total_words": total_words,
        "avg_wpm": avg_wpm,
        "filler_count": len(filler_phrases),
        "most_common_filler": most_common_filler,
        "most_common_filler_tied": most_common_filler_tied,
        "most_common_filler_tied_count": most_common_filler_tied_count,
        "avg_pause_duration": avg_pause_duration,
        "longest_pause": longest_pause,
        "fluency_score": fluency_score,
        "fluency_breakdown": fluency_breakdown,
    }


def analyze(words: list[dict], language: str) -> dict:
    annotated_words, filler_phrases = annotate_fillers(words, language)
    pauses = detect_pauses(words)
    pace_timeline = compute_pace_timeline(words)
    summary = build_summary(words, pauses, filler_phrases, pace_timeline)
    possible_hallucination, repeated_phrase = detect_repetition(words)

    return {
        "transcript": annotated_words,
        "pace_timeline": pace_timeline,
        "pauses": pauses,
        "summary": summary,
        "possible_hallucination": possible_hallucination,
        "hallucination_note": (
            f'Repeated phrase detected ("{repeated_phrase}"), transcript may be inaccurate'
            if possible_hallucination
            else None
        ),
    }
