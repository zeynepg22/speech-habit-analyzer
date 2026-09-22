TURKISH_FILLERS = {
    "şey", "yani", "ıı", "aslında", "işte", "falan", "filan", "ya", "hani",
    "eee", "mmm", "acaba", "sanırım", "neyse", "aa", "tabii", "bilmem",
} | {
    "diyelim ki", "ne bileyim", "hemen hemen", "yani işte",
}

ENGLISH_FILLERS = {
    "um", "uh", "like", "so", "actually", "basically", "literally", "right",
    "well", "anyway",
} | {
    "you know", "i mean", "kind of", "sort of", "i guess", "okay so",
    "you see", "i think", "or something", "and stuff",
}

ITALIAN_FILLERS = {
    "cioè", "tipo", "insomma", "ecco", "allora", "boh", "diciamo",
    "praticamente", "niente", "vabbè", "ehm", "dai", "ovvero", "no", "capito",
} | {
    "in pratica",
}

SPANISH_FILLERS = {
    "este", "eh", "bueno", "pues", "entonces", "digamos", "tipo", "nada",
    "vale", "mmm", "no", "sabes",
} | {
    "o sea", "la verdad", "a ver", "en plan",
}

GERMAN_FILLERS = {
    "äh", "ähm", "also", "halt", "quasi", "sozusagen", "irgendwie",
    "eigentlich", "genau", "naja", "gewissermaßen",
} | {
    "weißt du", "na ja", "sag ich mal", "wie gesagt", "also gut",
}

FRENCH_FILLERS = {
    "euh", "genre", "donc", "quoi", "voilà", "bon", "bah", "hein", "enfin",
    "disons",
} | {
    "en fait", "du coup", "tu vois", "c'est-à-dire", "en gros",
    "je veux dire", "tu sais", "si tu veux", "en fait quoi", "bref",
}

FILLERS_BY_LANGUAGE = {
    "tr": TURKISH_FILLERS,
    "en": ENGLISH_FILLERS,
    "it": ITALIAN_FILLERS,
    "es": SPANISH_FILLERS,
    "de": GERMAN_FILLERS,
    "fr": FRENCH_FILLERS,
}


def normalize_word(word: str, language: str) -> str:
    cleaned = word.strip().strip(".,!?;:…'\"¿¡").replace("’", "'")
    if language == "tr":
        cleaned = cleaned.replace("İ", "i").replace("I", "ı")
    return cleaned.lower()
