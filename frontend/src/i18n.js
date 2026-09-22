export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'it', name: 'Italiano' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
]

const translations = {
  en: {
    appTitle: 'Speech Habit Analyzer',
    appSubtitle: "Upload your interview or presentation rehearsal and discover the speech habits you don't notice.",
    languageLabel: 'Language',
    record: 'Record',
    stop: 'Stop',
    analyze: 'Analyze',
    analyzing: 'Analyzing…',
    transcriptTitle: 'Transcript',
    paceChartTitle: 'Speaking Pace (WPM)',
    pauseNote: 'Gray bands mark pauses longer than 0.5 seconds.',
    tooltipPaceLabel: 'words/min',
    statAvgPace: 'Avg. Pace',
    statFillerCount: 'Filler Words',
    statMostCommonFiller: 'Most Common Filler',
    statTotalDuration: 'Total Duration',
    statTotalWords: 'Total Words',
    statAvgPause: 'Avg. Pause',
    statLongestPause: 'Longest Pause',
    fluencyScoreLabel: 'Fluency Score',
    fluencyOutOf: '/ 100',
    fluencyDescription: 'A composite measure of pace consistency, pause control, and filler word usage.',
    tempoLabel: 'Tempo',
    pauseLabel: 'Pauses',
    fillerLabel: 'Fillers',
    dropzoneTitle: 'Drop an audio file here, or click to browse',
    dropzoneSubtitle: 'MP3, WAV, M4A, MP4, WEBM or OGG',
    orDivider: 'or',
    clickToReplace: 'Click to choose a different file',
    changeFile: 'Change File',
    removeFile: 'Remove',
    recordCardTitle: 'Record with your microphone',
    recordCardSubtitle: 'Record your speech directly in the browser.',
    recordingInProgress: 'Recording…',
    previewReady: 'Listen to your recording',
    discardRetry: 'Discard & Retry',
    useRecording: 'Use this Recording',
    recordAgain: 'Record Again',
    shortRecordingWarning: 'For a more reliable result, we recommend speaking for at least 10-15 seconds.',
    recordingReady: 'Recording ready',
    analysisLimitLabel: 'Analysis limit',
    limit1Min: '1 minute',
    limit3Min: '3 minutes',
    limit5Min: '5 minutes',
    limit10Min: '10 minutes',
    limitUnlimited: 'Unlimited',
    back: 'Back',
    historyTitle: 'History',
    historyEmpty: 'No analyses yet.',
    deleteConfirm: 'Delete this analysis? This cannot be undone.',
    progressTitle: 'Progress',
    progressEmpty: 'Not enough data yet — analyze at least 2 recordings to see your trend.',
    recordingTooShort: 'The recording was too short or empty. Please try again.',
    untitledRecording: 'Untitled Recording',
    save: 'Save',
    saving: 'Saving…',
    saveDialogTitle: 'Save this analysis',
    saveToHistoryOption: 'Save to History',
    nameRequired: 'Please enter a name before saving to history.',
    downloadOption: 'Download',
    confirm: 'Confirm',
    cancel: 'Cancel',
    unsavedTitle: "You haven't saved this analysis",
    unsavedMessage: 'Do you still want to go back?',
    leaveWithoutSaving: 'Leave without saving',
    savedBannerPrefix: 'Saved:',
    justNow: 'just now',
    groupToday: 'Today',
    groupYesterday: 'Yesterday',
    groupThisWeek: 'This Week',
    groupOlder: 'Older',
    hallucinationWarning: 'This transcript may contain errors due to audio quality or recognition issues. Consider re-recording in a quieter environment.',
    modelFast: 'Fast',
    modelAccurate: 'Accurate',
    modelFastHint: 'Good for casual speech',
    modelAccurateHint: 'Better for names & technical terms',
    modelAccurateNote: 'Analysis may take a bit longer.',
  },
  tr: {
    appTitle: 'Konuşma Alışkanlığı Analizörü',
    appSubtitle: 'Mülakat veya sunum provanı yükle, farkında olmadığın konuşma alışkanlıklarını keşfet.',
    languageLabel: 'Dil',
    record: 'Kaydet',
    stop: 'Durdur',
    analyze: 'Analiz Et',
    analyzing: 'Analiz ediliyor…',
    transcriptTitle: 'Transkript',
    paceChartTitle: 'Konuşma Hızı (WPM)',
    pauseNote: 'Gri bantlar 0.5 saniyeden uzun duraklamaları gösterir.',
    tooltipPaceLabel: 'kelime/dk',
    statAvgPace: 'Ort. Hız',
    statFillerCount: 'Dolgu Kelime',
    statMostCommonFiller: 'En Sık Dolgu',
    statTotalDuration: 'Toplam Süre',
    statTotalWords: 'Toplam Kelime',
    statAvgPause: 'Ort. Duraklama',
    statLongestPause: 'En Uzun Duraklama',
    fluencyScoreLabel: 'Akıcılık Skoru',
    fluencyOutOf: '/ 100',
    fluencyDescription: 'Tempo tutarlılığı, duraklama kontrolü ve dolgu kelime kullanımını birleştiren bir ölçüm.',
    tempoLabel: 'Tempo',
    pauseLabel: 'Duraklama',
    fillerLabel: 'Dolgu Kelime',
    dropzoneTitle: 'Ses dosyasını buraya sürükle ya da göz atmak için tıkla',
    dropzoneSubtitle: 'MP3, WAV, M4A, MP4, WEBM veya OGG',
    orDivider: 'veya',
    clickToReplace: 'Farklı bir dosya seçmek için tıkla',
    changeFile: 'Dosyayı Değiştir',
    removeFile: 'Kaldır',
    recordCardTitle: 'Mikrofonla Kaydet',
    recordCardSubtitle: 'Konuşmanı doğrudan tarayıcıdan kaydet.',
    recordingInProgress: 'Kayıt yapılıyor…',
    previewReady: 'Kaydını dinle',
    discardRetry: 'Sil ve Tekrar Dene',
    useRecording: 'Bu Kaydı Kullan',
    recordAgain: 'Tekrar Kaydet',
    shortRecordingWarning: 'Daha güvenilir bir sonuç için en az 10-15 saniye konuşmanı öneririz.',
    recordingReady: 'Kayıt hazır',
    analysisLimitLabel: 'Analiz Süresi Sınırı',
    limit1Min: '1 dakika',
    limit3Min: '3 dakika',
    limit5Min: '5 dakika',
    limit10Min: '10 dakika',
    limitUnlimited: 'Sınırsız',
    back: 'Geri',
    historyTitle: 'Geçmiş',
    historyEmpty: 'Henüz analiz yok.',
    deleteConfirm: 'Bu analiz silinsin mi? Bu işlem geri alınamaz.',
    progressTitle: 'İlerleme',
    progressEmpty: 'Henüz yeterli veri yok — trendini görmek için en az 2 kayıt analiz et.',
    recordingTooShort: 'Kayıt çok kısa veya boş oldu. Lütfen tekrar dene.',
    untitledRecording: 'Adsız Kayıt',
    save: 'Kaydet',
    saving: 'Kaydediliyor…',
    saveDialogTitle: 'Bu analizi kaydet',
    saveToHistoryOption: 'Geçmişe Kaydet',
    nameRequired: 'Geçmişe kaydetmeden önce bir isim girin.',
    downloadOption: 'İndir',
    confirm: 'Onayla',
    cancel: 'İptal',
    unsavedTitle: 'Bu analizi kaydetmediniz',
    unsavedMessage: 'Yine de geri dönmek istiyor musunuz?',
    leaveWithoutSaving: 'Kaydetmeden Dön',
    savedBannerPrefix: 'Kaydedildi:',
    justNow: 'az önce',
    groupToday: 'Bugün',
    groupYesterday: 'Dün',
    groupThisWeek: 'Bu Hafta',
    groupOlder: 'Daha Eski',
    hallucinationWarning: 'Bu transkript, ses kalitesi veya tanıma sorunları nedeniyle hatalar içerebilir. Daha sessiz bir ortamda tekrar kaydetmeyi düşünün.',
    modelFast: 'Hızlı',
    modelAccurate: 'Hassas',
    modelFastHint: 'Günlük konuşmalar için uygun',
    modelAccurateHint: 'İsimler ve teknik terimler için daha iyi',
    modelAccurateNote: 'Analiz biraz daha uzun sürebilir.',
  },
  it: {
    appTitle: 'Analizzatore di Abitudini Linguistiche',
    appSubtitle: 'Carica la tua prova di colloquio o presentazione e scopri le abitudini linguistiche di cui non ti accorgi.',
    languageLabel: 'Lingua',
    record: 'Registra',
    stop: 'Ferma',
    analyze: 'Analizza',
    analyzing: 'Analisi in corso…',
    transcriptTitle: 'Trascrizione',
    paceChartTitle: 'Velocità del Parlato (WPM)',
    pauseNote: 'Le fasce grigie indicano pause superiori a 0.5 secondi.',
    tooltipPaceLabel: 'parole/min',
    statAvgPace: 'Velocità Media',
    statFillerCount: 'Parole Riempitive',
    statMostCommonFiller: 'Riempitivo Più Comune',
    statTotalDuration: 'Durata Totale',
    statTotalWords: 'Parole Totali',
    statAvgPause: 'Pausa Media',
    statLongestPause: 'Pausa Più Lunga',
    fluencyScoreLabel: 'Punteggio di Fluidità',
    fluencyOutOf: '/ 100',
    fluencyDescription: 'Una misura combinata di coerenza del ritmo, controllo delle pause e uso di riempitivi.',
    tempoLabel: 'Ritmo',
    pauseLabel: 'Pause',
    fillerLabel: 'Riempitivi',
    dropzoneTitle: 'Trascina un file audio qui, o clicca per sfogliare',
    dropzoneSubtitle: 'MP3, WAV, M4A, MP4, WEBM o OGG',
    orDivider: 'oppure',
    clickToReplace: 'Clicca per scegliere un altro file',
    changeFile: 'Cambia File',
    removeFile: 'Rimuovi',
    recordCardTitle: 'Registra con il microfono',
    recordCardSubtitle: 'Registra il tuo parlato direttamente nel browser.',
    recordingInProgress: 'Registrazione in corso…',
    previewReady: 'Ascolta la tua registrazione',
    discardRetry: 'Elimina e Riprova',
    useRecording: 'Usa questa Registrazione',
    recordAgain: 'Registra di Nuovo',
    shortRecordingWarning: 'Per un risultato più affidabile, ti consigliamo di parlare per almeno 10-15 secondi.',
    recordingReady: 'Registrazione pronta',
    analysisLimitLabel: 'Limite di analisi',
    limit1Min: '1 minuto',
    limit3Min: '3 minuti',
    limit5Min: '5 minuti',
    limit10Min: '10 minuti',
    limitUnlimited: 'Illimitato',
    back: 'Indietro',
    historyTitle: 'Cronologia',
    historyEmpty: 'Nessuna analisi ancora.',
    deleteConfirm: 'Eliminare questa analisi? Non può essere annullata.',
    progressTitle: 'Progressi',
    progressEmpty: 'Dati non ancora sufficienti — analizza almeno 2 registrazioni per vedere il tuo andamento.',
    recordingTooShort: 'La registrazione era troppo breve o vuota. Riprova.',
    untitledRecording: 'Registrazione Senza Titolo',
    save: 'Salva',
    saving: 'Salvataggio…',
    saveDialogTitle: 'Salva questa analisi',
    saveToHistoryOption: 'Salva nella Cronologia',
    nameRequired: 'Inserisci un nome prima di salvare nella cronologia.',
    downloadOption: 'Scarica',
    confirm: 'Conferma',
    cancel: 'Annulla',
    unsavedTitle: 'Non hai salvato questa analisi',
    unsavedMessage: 'Vuoi comunque tornare indietro?',
    leaveWithoutSaving: 'Esci senza salvare',
    savedBannerPrefix: 'Salvato:',
    justNow: 'proprio ora',
    groupToday: 'Oggi',
    groupYesterday: 'Ieri',
    groupThisWeek: 'Questa Settimana',
    groupOlder: 'Meno Recenti',
    hallucinationWarning: 'Questa trascrizione potrebbe contenere errori dovuti alla qualità audio o a problemi di riconoscimento. Valuta di registrare di nuovo in un ambiente più silenzioso.',
    modelFast: 'Veloce',
    modelAccurate: 'Preciso',
    modelFastHint: 'Adatto al parlato informale',
    modelAccurateHint: 'Meglio per nomi e termini tecnici',
    modelAccurateNote: "L'analisi potrebbe richiedere un po' più di tempo.",
  },
  es: {
    appTitle: 'Analizador de Hábitos del Habla',
    appSubtitle: 'Sube tu ensayo de entrevista o presentación y descubre los hábitos del habla de los que no te das cuenta.',
    languageLabel: 'Idioma',
    record: 'Grabar',
    stop: 'Detener',
    analyze: 'Analizar',
    analyzing: 'Analizando…',
    transcriptTitle: 'Transcripción',
    paceChartTitle: 'Ritmo del Habla (WPM)',
    pauseNote: 'Las bandas grises marcan pausas de más de 0.5 segundos.',
    tooltipPaceLabel: 'palabras/min',
    statAvgPace: 'Ritmo Medio',
    statFillerCount: 'Muletillas',
    statMostCommonFiller: 'Muletilla Más Común',
    statTotalDuration: 'Duración Total',
    statTotalWords: 'Palabras Totales',
    statAvgPause: 'Pausa Media',
    statLongestPause: 'Pausa Más Larga',
    fluencyScoreLabel: 'Puntuación de Fluidez',
    fluencyOutOf: '/ 100',
    fluencyDescription: 'Una medida combinada de la consistencia del ritmo, el control de pausas y el uso de muletillas.',
    tempoLabel: 'Ritmo',
    pauseLabel: 'Pausas',
    fillerLabel: 'Muletillas',
    dropzoneTitle: 'Suelta un archivo de audio aquí, o haz clic para buscar',
    dropzoneSubtitle: 'MP3, WAV, M4A, MP4, WEBM o OGG',
    orDivider: 'o',
    clickToReplace: 'Haz clic para elegir otro archivo',
    changeFile: 'Cambiar Archivo',
    removeFile: 'Quitar',
    recordCardTitle: 'Graba con tu micrófono',
    recordCardSubtitle: 'Graba tu voz directamente en el navegador.',
    recordingInProgress: 'Grabando…',
    previewReady: 'Escucha tu grabación',
    discardRetry: 'Descartar y Reintentar',
    useRecording: 'Usar esta Grabación',
    recordAgain: 'Grabar de Nuevo',
    shortRecordingWarning: 'Para un resultado más fiable, te recomendamos hablar durante al menos 10-15 segundos.',
    recordingReady: 'Grabación lista',
    analysisLimitLabel: 'Límite de análisis',
    limit1Min: '1 minuto',
    limit3Min: '3 minutos',
    limit5Min: '5 minutos',
    limit10Min: '10 minutos',
    limitUnlimited: 'Ilimitado',
    back: 'Atrás',
    historyTitle: 'Historial',
    historyEmpty: 'Aún no hay análisis.',
    deleteConfirm: '¿Eliminar este análisis? No se puede deshacer.',
    progressTitle: 'Progreso',
    progressEmpty: 'Aún no hay suficientes datos — analiza al menos 2 grabaciones para ver tu tendencia.',
    recordingTooShort: 'La grabación fue demasiado corta o estaba vacía. Inténtalo de nuevo.',
    untitledRecording: 'Grabación Sin Título',
    save: 'Guardar',
    saving: 'Guardando…',
    saveDialogTitle: 'Guardar este análisis',
    saveToHistoryOption: 'Guardar en el Historial',
    nameRequired: 'Introduce un nombre antes de guardar en el historial.',
    downloadOption: 'Descargar',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    unsavedTitle: 'No has guardado este análisis',
    unsavedMessage: '¿Aún quieres volver atrás?',
    leaveWithoutSaving: 'Salir sin guardar',
    savedBannerPrefix: 'Guardado:',
    justNow: 'ahora mismo',
    groupToday: 'Hoy',
    groupYesterday: 'Ayer',
    groupThisWeek: 'Esta Semana',
    groupOlder: 'Más Antiguos',
    hallucinationWarning: 'Esta transcripción puede contener errores debido a la calidad del audio o problemas de reconocimiento. Considera grabar de nuevo en un entorno más silencioso.',
    modelFast: 'Rápido',
    modelAccurate: 'Preciso',
    modelFastHint: 'Ideal para habla informal',
    modelAccurateHint: 'Mejor para nombres y términos técnicos',
    modelAccurateNote: 'El análisis puede tardar un poco más.',
  },
  de: {
    appTitle: 'Sprachgewohnheiten-Analysator',
    appSubtitle: 'Lade deine Vorstellungsgespräch- oder Präsentationsprobe hoch und entdecke Sprachgewohnheiten, die dir nicht auffallen.',
    languageLabel: 'Sprache',
    record: 'Aufnehmen',
    stop: 'Stopp',
    analyze: 'Analysieren',
    analyzing: 'Analysiere…',
    transcriptTitle: 'Transkript',
    paceChartTitle: 'Sprechtempo (WPM)',
    pauseNote: 'Graue Balken markieren Pausen über 0.5 Sekunden.',
    tooltipPaceLabel: 'Wörter/Min',
    statAvgPace: 'Ø Tempo',
    statFillerCount: 'Füllwörter',
    statMostCommonFiller: 'Häufigstes Füllwort',
    statTotalDuration: 'Gesamtdauer',
    statTotalWords: 'Wörter Gesamt',
    statAvgPause: 'Ø Pause',
    statLongestPause: 'Längste Pause',
    fluencyScoreLabel: 'Sprachfluss-Score',
    fluencyOutOf: '/ 100',
    fluencyDescription: 'Ein zusammengesetztes Maß aus Tempo-Konsistenz, Pausenkontrolle und Nutzung von Füllwörtern.',
    tempoLabel: 'Tempo',
    pauseLabel: 'Pausen',
    fillerLabel: 'Füllwörter',
    dropzoneTitle: 'Audiodatei hierher ziehen oder zum Durchsuchen klicken',
    dropzoneSubtitle: 'MP3, WAV, M4A, MP4, WEBM oder OGG',
    orDivider: 'oder',
    clickToReplace: 'Klicken, um eine andere Datei zu wählen',
    changeFile: 'Datei Ändern',
    removeFile: 'Entfernen',
    recordCardTitle: 'Mit dem Mikrofon aufnehmen',
    recordCardSubtitle: 'Nimm deine Sprache direkt im Browser auf.',
    recordingInProgress: 'Aufnahme läuft…',
    previewReady: 'Höre dir deine Aufnahme an',
    discardRetry: 'Verwerfen & Erneut Versuchen',
    useRecording: 'Diese Aufnahme Verwenden',
    recordAgain: 'Erneut Aufnehmen',
    shortRecordingWarning: 'Für ein zuverlässigeres Ergebnis empfehlen wir, mindestens 10-15 Sekunden zu sprechen.',
    recordingReady: 'Aufnahme bereit',
    analysisLimitLabel: 'Analyse-Limit',
    limit1Min: '1 Minute',
    limit3Min: '3 Minuten',
    limit5Min: '5 Minuten',
    limit10Min: '10 Minuten',
    limitUnlimited: 'Unbegrenzt',
    back: 'Zurück',
    historyTitle: 'Verlauf',
    historyEmpty: 'Noch keine Analysen.',
    deleteConfirm: 'Diese Analyse löschen? Dies kann nicht rückgängig gemacht werden.',
    progressTitle: 'Fortschritt',
    progressEmpty: 'Noch nicht genug Daten — analysiere mindestens 2 Aufnahmen, um deinen Trend zu sehen.',
    recordingTooShort: 'Die Aufnahme war zu kurz oder leer. Bitte versuche es erneut.',
    untitledRecording: 'Unbenannte Aufnahme',
    save: 'Speichern',
    saving: 'Wird gespeichert…',
    saveDialogTitle: 'Diese Analyse speichern',
    saveToHistoryOption: 'Im Verlauf speichern',
    nameRequired: 'Gib einen Namen ein, bevor du im Verlauf speicherst.',
    downloadOption: 'Herunterladen',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    unsavedTitle: 'Du hast diese Analyse nicht gespeichert',
    unsavedMessage: 'Möchtest du trotzdem zurückgehen?',
    leaveWithoutSaving: 'Ohne Speichern verlassen',
    savedBannerPrefix: 'Gespeichert:',
    justNow: 'gerade eben',
    groupToday: 'Heute',
    groupYesterday: 'Gestern',
    groupThisWeek: 'Diese Woche',
    groupOlder: 'Älter',
    hallucinationWarning: 'Dieses Transkript kann aufgrund der Audioqualität oder Erkennungsproblemen Fehler enthalten. Erwäge, in einer ruhigeren Umgebung erneut aufzunehmen.',
    modelFast: 'Schnell',
    modelAccurate: 'Präzise',
    modelFastHint: 'Gut für lockere Sprache',
    modelAccurateHint: 'Besser für Namen und Fachbegriffe',
    modelAccurateNote: 'Die Analyse kann etwas länger dauern.',
  },
  fr: {
    appTitle: 'Analyseur d\'Habitudes de Parole',
    appSubtitle: "Téléchargez votre répétition d'entretien ou de présentation et découvrez les habitudes de parole que vous ne remarquez pas.",
    languageLabel: 'Langue',
    record: 'Enregistrer',
    stop: 'Arrêter',
    analyze: 'Analyser',
    analyzing: 'Analyse en cours…',
    transcriptTitle: 'Transcription',
    paceChartTitle: 'Débit de Parole (WPM)',
    pauseNote: 'Les bandes grises indiquent des pauses de plus de 0.5 seconde.',
    tooltipPaceLabel: 'mots/min',
    statAvgPace: 'Débit Moyen',
    statFillerCount: 'Mots de Remplissage',
    statMostCommonFiller: 'Remplissage le Plus Fréquent',
    statTotalDuration: 'Durée Totale',
    statTotalWords: 'Mots au Total',
    statAvgPause: 'Pause Moyenne',
    statLongestPause: 'Pause la Plus Longue',
    fluencyScoreLabel: 'Score de Fluidité',
    fluencyOutOf: '/ 100',
    fluencyDescription: 'Une mesure combinée de la régularité du débit, du contrôle des pauses et de l\'usage de mots de remplissage.',
    tempoLabel: 'Tempo',
    pauseLabel: 'Pauses',
    fillerLabel: 'Remplissages',
    dropzoneTitle: 'Déposez un fichier audio ici, ou cliquez pour parcourir',
    dropzoneSubtitle: 'MP3, WAV, M4A, MP4, WEBM ou OGG',
    orDivider: 'ou',
    clickToReplace: 'Cliquez pour choisir un autre fichier',
    changeFile: 'Changer de Fichier',
    removeFile: 'Retirer',
    recordCardTitle: 'Enregistrer avec le microphone',
    recordCardSubtitle: 'Enregistrez votre voix directement dans le navigateur.',
    recordingInProgress: 'Enregistrement…',
    previewReady: 'Écoutez votre enregistrement',
    discardRetry: 'Supprimer et Réessayer',
    useRecording: 'Utiliser cet Enregistrement',
    recordAgain: 'Enregistrer à Nouveau',
    shortRecordingWarning: 'Pour un résultat plus fiable, nous recommandons de parler pendant au moins 10 à 15 secondes.',
    recordingReady: 'Enregistrement prêt',
    analysisLimitLabel: 'Limite d\'analyse',
    limit1Min: '1 minute',
    limit3Min: '3 minutes',
    limit5Min: '5 minutes',
    limit10Min: '10 minutes',
    limitUnlimited: 'Illimité',
    back: 'Retour',
    historyTitle: 'Historique',
    historyEmpty: 'Aucune analyse pour le moment.',
    deleteConfirm: 'Supprimer cette analyse ? Cette action est irréversible.',
    progressTitle: 'Progression',
    progressEmpty: 'Pas encore assez de données — analysez au moins 2 enregistrements pour voir votre tendance.',
    recordingTooShort: "L'enregistrement était trop court ou vide. Veuillez réessayer.",
    untitledRecording: 'Enregistrement Sans Titre',
    save: 'Enregistrer',
    saving: 'Enregistrement…',
    saveDialogTitle: 'Enregistrer cette analyse',
    saveToHistoryOption: "Enregistrer dans l'Historique",
    nameRequired: "Saisissez un nom avant d'enregistrer dans l'historique.",
    downloadOption: 'Télécharger',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    unsavedTitle: "Vous n'avez pas enregistré cette analyse",
    unsavedMessage: 'Voulez-vous quand même revenir en arrière ?',
    leaveWithoutSaving: 'Quitter sans enregistrer',
    savedBannerPrefix: 'Enregistré :',
    justNow: "à l'instant",
    groupToday: "Aujourd'hui",
    groupYesterday: 'Hier',
    groupThisWeek: 'Cette Semaine',
    groupOlder: 'Plus Ancien',
    hallucinationWarning: 'Cette transcription peut contenir des erreurs dues à la qualité audio ou à des problèmes de reconnaissance. Envisagez de réenregistrer dans un environnement plus calme.',
    modelFast: 'Rapide',
    modelAccurate: 'Précis',
    modelFastHint: 'Adapté à la parole informelle',
    modelAccurateHint: 'Meilleur pour les noms et termes techniques',
    modelAccurateNote: "L'analyse peut prendre un peu plus de temps.",
  },
}

const LOCALES = {
  en: 'en-US',
  tr: 'tr-TR',
  it: 'it-IT',
  es: 'es-ES',
  de: 'de-DE',
  fr: 'fr-FR',
}

export function localeForLang(lang) {
  return LOCALES[lang] ?? 'en-US'
}

export function t(lang, key) {
  return translations[lang]?.[key] ?? translations.en[key]
}

export function languageName(code, uiLang) {
  try {
    return new Intl.DisplayNames([localeForLang(uiLang)], { type: 'language' }).of(code)
  } catch {
    return code
  }
}

export function languageMismatchMessage(lang, detectedCode, selectedCode) {
  const detected = languageName(detectedCode, lang)
  const selected = languageName(selectedCode, lang)
  switch (lang) {
    case 'tr':
      return `Algılanan dil (${detected}) seçilen dille (${selected}) uyuşmuyor. Sonuçlar hatalı olabilir.`
    case 'it':
      return `La lingua rilevata (${detected}) non corrisponde alla lingua selezionata (${selected}). I risultati potrebbero non essere accurati.`
    case 'es':
      return `El idioma detectado (${detected}) no coincide con el idioma seleccionado (${selected}). Los resultados pueden ser inexactos.`
    case 'de':
      return `Die erkannte Sprache (${detected}) stimmt nicht mit der ausgewählten Sprache (${selected}) überein. Die Ergebnisse könnten ungenau sein.`
    case 'fr':
      return `La langue détectée (${detected}) ne correspond pas à la langue sélectionnée (${selected}). Les résultats peuvent être inexacts.`
    default:
      return `Detected language (${detected}) doesn't match the selected language (${selected}). Results may be inaccurate.`
  }
}

function formatClockDuration(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = Math.round(totalSeconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function truncationMessage(lang, truncated) {
  const { original_duration, limit_seconds, hit_hard_cap } = truncated
  const capMinutes = Math.round(limit_seconds / 60)

  if (hit_hard_cap) {
    switch (lang) {
      case 'tr':
        return `Analiz en fazla ${capMinutes} dakika ile sınırlandı (desteklenen azami uzunluk).`
      case 'it':
        return `Analisi limitata a ${capMinutes} minuti (durata massima supportata).`
      case 'es':
        return `Análisis limitado a ${capMinutes} minutos (duración máxima admitida).`
      case 'de':
        return `Analyse auf ${capMinutes} Minuten begrenzt (maximal unterstützte Länge).`
      case 'fr':
        return `Analyse limitée à ${capMinutes} minutes (durée maximale prise en charge).`
      default:
        return `Analysis limited to ${capMinutes} minutes (maximum supported length).`
    }
  }

  const limitLabel = formatClockDuration(limit_seconds)
  const originalLabel = formatClockDuration(original_duration)
  const remainingLabel = formatClockDuration(Math.max(0, original_duration - limit_seconds))

  switch (lang) {
    case 'tr':
      return `Analiz ilk ${limitLabel} ile sınırlandı. Kaydınız ${originalLabel} uzunluğundaydı — kalan ${remainingLabel} analiz edilmedi.`
    case 'it':
      return `Analisi limitata ai primi ${limitLabel}. La tua registrazione durava ${originalLabel} — i restanti ${remainingLabel} non sono stati analizzati.`
    case 'es':
      return `Análisis limitado a los primeros ${limitLabel}. Tu grabación duraba ${originalLabel} — los ${remainingLabel} restantes no se analizaron.`
    case 'de':
      return `Analyse auf die ersten ${limitLabel} begrenzt. Deine Aufnahme war ${originalLabel} lang — die verbleibenden ${remainingLabel} wurden nicht analysiert.`
    case 'fr':
      return `Analyse limitée aux premières ${limitLabel}. Votre enregistrement durait ${originalLabel} — les ${remainingLabel} restantes n'ont pas été analysées.`
    default:
      return `Analysis limited to the first ${limitLabel}. Your recording was ${originalLabel} long — the remaining ${remainingLabel} were not analyzed.`
  }
}

export function minutesAgo(lang, n) {
  switch (lang) {
    case 'tr':
      return `${n} dakika önce`
    case 'it':
      return `${n} minut${n === 1 ? 'o' : 'i'} fa`
    case 'es':
      return `hace ${n} minuto${n === 1 ? '' : 's'}`
    case 'de':
      return `vor ${n} Minute${n === 1 ? '' : 'n'}`
    case 'fr':
      return `il y a ${n} minute${n === 1 ? '' : 's'}`
    default:
      return `${n} minute${n === 1 ? '' : 's'} ago`
  }
}

export function hoursAgo(lang, n) {
  switch (lang) {
    case 'tr':
      return `${n} saat önce`
    case 'it':
      return `${n} or${n === 1 ? 'a' : 'e'} fa`
    case 'es':
      return `hace ${n} hora${n === 1 ? '' : 's'}`
    case 'de':
      return `vor ${n} Stunde${n === 1 ? '' : 'n'}`
    case 'fr':
      return `il y a ${n} heure${n === 1 ? '' : 's'}`
    default:
      return `${n} hour${n === 1 ? '' : 's'} ago`
  }
}

export function daysAgo(lang, n) {
  switch (lang) {
    case 'tr':
      return `${n} gün önce`
    case 'it':
      return `${n} giorn${n === 1 ? 'o' : 'i'} fa`
    case 'es':
      return `hace ${n} día${n === 1 ? '' : 's'}`
    case 'de':
      return `vor ${n} Tag${n === 1 ? '' : 'en'}`
    case 'fr':
      return `il y a ${n} jour${n === 1 ? '' : 's'}`
    default:
      return `${n} day${n === 1 ? '' : 's'} ago`
  }
}

export function tiedFillerMessage(lang, typesCount, usesCount) {
  switch (lang) {
    case 'tr':
      return `${typesCount} farklı dolgu kelimesi, her biri ${usesCount} kez`
    case 'it':
      return `${typesCount} riempitivi diversi, ${usesCount} ${usesCount === 1 ? 'volta' : 'volte'} ciascuno`
    case 'es':
      return `${typesCount} muletillas distintas, ${usesCount} ${usesCount === 1 ? 'vez' : 'veces'} cada una`
    case 'de':
      return `${typesCount} verschiedene Füllwörter, je ${usesCount} Mal`
    case 'fr':
      return `${typesCount} remplissages différents, ${usesCount} fois chacun`
    default:
      return `${typesCount} filler types, ${usesCount} use${usesCount === 1 ? '' : 's'} each`
  }
}
