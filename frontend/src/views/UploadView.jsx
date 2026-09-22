import UploadCard from '../components/UploadCard'
import RecordCard from '../components/RecordCard'
import HistorySidebar from '../components/HistorySidebar'
import ResultSkeleton from '../components/Skeleton'
import { IconSparkles } from '../components/icons'
import { t } from '../i18n'

export default function UploadView({
  lang,
  file,
  fileSource,
  loading,
  error,
  history,
  activeHistoryId,
  limitSeconds,
  onFileSelected,
  onRecordingReady,
  onRecordAgain,
  onRecordError,
  onAnalyze,
  onSelectHistoryItem,
  onDeleteHistoryItem,
  onRenameHistoryItem,
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <p className="mb-6 text-sm text-text-muted">{t(lang, 'appSubtitle')}</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UploadCard lang={lang} file={fileSource === 'upload' ? file : null} onFileSelected={onFileSelected} />
        <RecordCard
          lang={lang}
          isActive={fileSource === 'record'}
          limitSeconds={limitSeconds}
          onRecordingReady={onRecordingReady}
          onRecordAgain={onRecordAgain}
          onError={onRecordError}
        />
        <div className="sm:col-span-2 lg:col-span-1">
          <HistorySidebar
            history={history}
            lang={lang}
            activeId={activeHistoryId}
            onSelect={onSelectHistoryItem}
            onDelete={onDeleteHistoryItem}
            onRename={onRenameHistoryItem}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onAnalyze}
          disabled={!file || loading}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-surface-hover disabled:text-text-faint"
        >
          <IconSparkles className="h-4 w-4" />
          {loading ? t(lang, 'analyzing') : t(lang, 'analyze')}
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-card border border-score-low/30 bg-score-low/10 p-4 text-sm text-score-low">
          {error}
        </div>
      )}

      {loading && <div className="mt-6"><ResultSkeleton /></div>}
    </div>
  )
}
