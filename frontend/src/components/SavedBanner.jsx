import { relativeTime } from '../dateUtils'
import { t } from '../i18n'
import { IconCheck } from './icons'

export default function SavedBanner({ item, lang, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs transition-colors hover:border-accent/40"
    >
      <IconCheck className="h-3.5 w-3.5 shrink-0 text-score-high" />
      <span className="shrink-0 text-text-muted">{t(lang, 'savedBannerPrefix')}</span>
      <span className="truncate font-medium text-text">{item.name}</span>
      <span className="shrink-0 text-text-faint">· {relativeTime(item.created_at, lang)}</span>
    </button>
  )
}
