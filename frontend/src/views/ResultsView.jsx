import { useRef, useState } from 'react'
import FluencyGauge from '../components/FluencyGauge'
import SummaryCard from '../components/SummaryCard'
import TranscriptView from '../components/TranscriptView'
import PaceChart from '../components/PaceChart'
import ProgressTrendChart from '../components/ProgressTrendChart'
import SaveDialog from '../components/SaveDialog'
import UnsavedChangesDialog from '../components/UnsavedChangesDialog'
import { IconAlertTriangle, IconArrowLeft, IconClock, IconSave } from '../components/icons'
import { languageMismatchMessage, t, truncationMessage } from '../i18n'
import { downloadAudio, downloadJSON, sanitizeFilename } from '../download'

const API_URL = 'http://127.0.0.1:8000'

export default function ResultsView({ result, history, lang, initiallySaved, onBack, onSaved, onRename }) {
  const [name, setName] = useState(result.name ?? '')
  const [isSaved, setIsSaved] = useState(initiallySaved)
  const [showBackConfirm, setShowBackConfirm] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [pendingBack, setPendingBack] = useState(false)
  const [saving, setSaving] = useState(false)
  const [nameError, setNameError] = useState(false)
  const nameInputRef = useRef(null)

  const audioSrc = isSaved
    ? `${API_URL}/recordings/${result.id}`
    : `${API_URL}/tmp-recordings/${result.id}`

  function handleBackClick() {
    if (isSaved) {
      onBack()
    } else {
      setShowBackConfirm(true)
    }
  }

  function openSaveDialog(fromBackConfirm) {
    setShowBackConfirm(false)
    setPendingBack(fromBackConfirm)
    setShowSaveDialog(true)
  }

  function handleNameBlur() {
    if (!isSaved) return
    const trimmed = name.trim()
    if (!trimmed) {
      setName(result.name ?? '')
      return
    }
    if (trimmed !== (result.name ?? '')) {
      onRename(result.id, trimmed)
    }
  }

  async function handleConfirmSave({ saveToHistory, download }) {
    const trimmedName = name.trim()

    if (saveToHistory && !trimmedName) {
      setShowSaveDialog(false)
      setNameError(true)
      nameInputRef.current?.focus()
      return
    }

    setSaving(true)
    const finalName = trimmedName || t(lang, 'untitledRecording')
    const safeName = sanitizeFilename(finalName)

    try {
      if (saveToHistory) {
        const payload = {
          id: result.id,
          name: trimmedName,
          language: result.language,
          result: {
            transcript: result.transcript,
            pace_timeline: result.pace_timeline,
            pauses: result.pauses,
            summary: result.summary,
            detected_language: result.detected_language,
            language_mismatch: result.language_mismatch,
            truncated: result.truncated,
            possible_hallucination: result.possible_hallucination,
            hallucination_note: result.hallucination_note,
          },
        }
        const res = await fetch(`${API_URL}/history`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          const saved = await res.json()
          setIsSaved(true)
          onSaved(saved)
        }
      }

      if (download) {
        downloadJSON(safeName, result)
        await downloadAudio(audioSrc, safeName)
      }
    } finally {
      setSaving(false)
      setShowSaveDialog(false)
      if (pendingBack) onBack()
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-10 lg:px-8">
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
        >
          <IconArrowLeft className="h-4 w-4" />
          {t(lang, 'back')}
        </button>

        {!isSaved && (
          <button
            onClick={() => openSaveDialog(false)}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <IconSave className="h-4 w-4" />
            {t(lang, 'save')}
          </button>
        )}
      </div>

      <input
        ref={nameInputRef}
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          if (nameError) setNameError(false)
        }}
        onBlur={handleNameBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.currentTarget.blur()
        }}
        placeholder={t(lang, 'untitledRecording')}
        className={`w-full border-b bg-transparent pb-1 font-display text-2xl font-semibold text-text placeholder:text-text-faint focus:outline-none ${
          nameError ? 'border-score-low' : 'border-transparent focus:border-border'
        }`}
      />
      {nameError && <p className="text-xs text-score-low">{t(lang, 'nameRequired')}</p>}

      {result.truncated && (
        <div className="flex items-start gap-3 rounded-card border border-score-mid/30 bg-score-mid/10 p-4 text-sm text-score-mid">
          <IconClock className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{truncationMessage(lang, result.truncated)}</p>
        </div>
      )}

      {result.language_mismatch && (
        <div className="flex items-start gap-3 rounded-card border border-score-mid/30 bg-score-mid/10 p-4 text-sm text-score-mid">
          <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{languageMismatchMessage(lang, result.detected_language, result.language)}</p>
        </div>
      )}

      {result.possible_hallucination && (
        <div className="flex items-start gap-3 rounded-card border border-score-mid/30 bg-score-mid/10 p-4 text-sm text-score-mid">
          <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{t(lang, 'hallucinationWarning')}</p>
        </div>
      )}

      <ProgressTrendChart history={history} lang={lang} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-1">
          <FluencyGauge score={result.summary.fluency_score} breakdown={result.summary.fluency_breakdown} lang={lang} />
        </div>
        <div className="lg:col-span-2">
          <SummaryCard summary={result.summary} lang={lang} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5 xl:items-start">
        <div className="xl:col-span-3">
          <TranscriptView transcript={result.transcript} lang={lang} audioSrc={audioSrc} />
        </div>
        <div className="xl:col-span-2">
          <PaceChart
            paceTimeline={result.pace_timeline}
            pauses={result.pauses}
            lang={lang}
            totalDuration={result.summary.total_duration}
          />
        </div>
      </div>

      {showBackConfirm && (
        <UnsavedChangesDialog
          lang={lang}
          onLeave={onBack}
          onCancel={() => setShowBackConfirm(false)}
          onSave={() => openSaveDialog(true)}
        />
      )}

      {showSaveDialog && (
        <SaveDialog
          lang={lang}
          saving={saving}
          onCancel={() => {
            setShowSaveDialog(false)
            setPendingBack(false)
          }}
          onConfirm={handleConfirmSave}
        />
      )}
    </div>
  )
}
