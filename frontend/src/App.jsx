import { useEffect, useState } from 'react'
import UploadView from './views/UploadView'
import ResultsView from './views/ResultsView'
import SavedBanner from './components/SavedBanner'
import ModelQualitySelector from './components/ModelQualitySelector'
import Dropdown from './components/Dropdown'
import { IconClock, IconGlobe } from './components/icons'
import { LANGUAGES, t } from './i18n'

const API_URL = 'http://127.0.0.1:8000'

const LIMIT_OPTIONS = [
  { value: '60', key: 'limit1Min' },
  { value: '180', key: 'limit3Min' },
  { value: '300', key: 'limit5Min' },
  { value: '600', key: 'limit10Min' },
  { value: 'unlimited', key: 'limitUnlimited' },
]

export default function App() {
  const [lang, setLang] = useState('en')
  const [view, setView] = useState('upload')
  const [file, setFile] = useState(null)
  const [fileSource, setFileSource] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [resultIsSaved, setResultIsSaved] = useState(false)
  const [history, setHistory] = useState([])
  const [activeHistoryId, setActiveHistoryId] = useState(null)
  const [limitSeconds, setLimitSeconds] = useState(null)
  const [modelQuality, setModelQuality] = useState('accurate')

  useEffect(() => {
    refreshHistory()
  }, [])

  async function refreshHistory() {
    try {
      const res = await fetch(`${API_URL}/history`)
      if (res.ok) {
        setHistory(await res.json())
      }
    } catch {}
  }

  function handleFileSelected(selected) {
    setFile(selected)
    setFileSource(selected ? 'upload' : null)
    setResult(null)
    setError(null)
  }

  function handleRecordingReady(recordedFile) {
    setFile(recordedFile)
    setFileSource('record')
    setResult(null)
    setError(null)
  }

  function handleRecordAgain() {
    setFile(null)
    setFileSource(null)
  }

  async function runAnalysis(fileToAnalyze) {
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', fileToAnalyze)
    formData.append('language', lang)
    formData.append('model_quality', modelQuality)
    if (limitSeconds != null) {
      formData.append('limit_seconds', String(limitSeconds))
    }

    try {
      const res = await fetch(`${API_URL}/analyze`, { method: 'POST', body: formData })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || `Request failed (${res.status})`)
      }
      const data = await res.json()
      setResult(data)
      setResultIsSaved(false)
      setActiveHistoryId(null)
      setView('results')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleAnalyze() {
    if (!file) return
    runAnalysis(file)
  }

  async function handleSelectHistoryItem(id) {
    try {
      const res = await fetch(`${API_URL}/history/${id}`)
      if (!res.ok) return
      const data = await res.json()
      setResult(data)
      setResultIsSaved(true)
      setActiveHistoryId(id)
      setView('results')
    } catch {
      setError('Could not load that analysis.')
    }
  }

  async function handleDeleteHistoryItem(id) {
    setHistory((prev) => prev.filter((item) => item.id !== id))
    try {
      await fetch(`${API_URL}/history/${id}`, { method: 'DELETE' })
    } catch {
      refreshHistory()
    }
  }

  async function handleRenameHistoryItem(id, newName) {
    const trimmed = newName.trim()
    if (!trimmed) return

    setHistory((prev) => prev.map((item) => (item.id === id ? { ...item, name: trimmed } : item)))
    setResult((prev) => (prev && prev.id === id ? { ...prev, name: trimmed } : prev))

    try {
      const res = await fetch(`${API_URL}/history/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      })
      if (!res.ok) refreshHistory()
    } catch {
      refreshHistory()
    }
  }

  function handleSaved(savedRecord) {
    setResult(savedRecord)
    setActiveHistoryId(savedRecord.id)
    refreshHistory()
  }

  function handleBack() {
    setView('upload')
    setResult(null)
    setFile(null)
    setFileSource(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <ModelQualitySelector lang={lang} value={modelQuality} onChange={setModelQuality} />

              <h1 className="font-display text-2xl font-semibold tracking-tight text-text">{t(lang, 'appTitle')}</h1>
            </div>

            <div className="shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <Dropdown
                  compact
                  icon={IconGlobe}
                  value={lang}
                  onChange={setLang}
                  options={LANGUAGES.map((l) => ({ value: l.code, label: l.name }))}
                />

                <Dropdown
                  compact
                  icon={IconClock}
                  value={limitSeconds ?? 'unlimited'}
                  onChange={(val) => setLimitSeconds(val === 'unlimited' ? null : Number(val))}
                  options={LIMIT_OPTIONS.map((option) => ({ value: option.value, label: t(lang, option.key) }))}
                />
              </div>
            </div>
          </div>

          <p className="mt-2 h-4 text-xs text-text-faint">
            {modelQuality === 'accurate' ? t(lang, 'modelAccurateNote') : ' '}
          </p>

          {history.length > 0 && (
            <div className="mt-4">
              <SavedBanner item={history[0]} lang={lang} onClick={() => handleSelectHistoryItem(history[0].id)} />
            </div>
          )}
        </div>
      </header>

      {view === 'upload' ? (
        <UploadView
          lang={lang}
          file={file}
          fileSource={fileSource}
          loading={loading}
          error={error}
          history={history}
          activeHistoryId={activeHistoryId}
          limitSeconds={limitSeconds}
          onFileSelected={handleFileSelected}
          onRecordingReady={handleRecordingReady}
          onRecordAgain={handleRecordAgain}
          onRecordError={setError}
          onAnalyze={handleAnalyze}
          onSelectHistoryItem={handleSelectHistoryItem}
          onDeleteHistoryItem={handleDeleteHistoryItem}
          onRenameHistoryItem={handleRenameHistoryItem}
        />
      ) : (
        <ResultsView
          result={result}
          history={history}
          lang={lang}
          initiallySaved={resultIsSaved}
          onBack={handleBack}
          onSaved={handleSaved}
          onRename={handleRenameHistoryItem}
        />
      )}
    </div>
  )
}
