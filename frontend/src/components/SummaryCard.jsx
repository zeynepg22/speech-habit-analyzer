import { t, tiedFillerMessage } from '../i18n'
import { IconActivity, IconAlertTriangle, IconClock, IconHash, IconPause, IconRepeat, IconTag } from './icons'

function Stat({ icon: IconComponent, label, value, valueClassName }) {
  return (
    <div className="group bg-surface border border-border rounded-card shadow-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover">
      <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center mb-3 text-accent">
        <IconComponent className="w-4 h-4" />
      </div>
      <p className={valueClassName ?? 'font-display text-2xl font-semibold text-text'}>{value}</p>
      <p className="text-xs text-text-muted mt-1">{label}</p>
    </div>
  )
}

export default function SummaryCard({ summary, lang }) {
  const isTied = Array.isArray(summary.most_common_filler_tied) && summary.most_common_filler_tied.length > 1

  const fillerValue = isTied
    ? tiedFillerMessage(lang, summary.most_common_filler_tied.length, summary.most_common_filler_tied_count)
    : summary.most_common_filler ?? '—'

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Stat icon={IconActivity} label={t(lang, 'statAvgPace')} value={`${summary.avg_wpm} WPM`} />
      <Stat icon={IconRepeat} label={t(lang, 'statFillerCount')} value={summary.filler_count} />
      <Stat
        icon={IconTag}
        label={t(lang, 'statMostCommonFiller')}
        value={fillerValue}
        valueClassName={isTied ? 'font-display text-sm font-medium text-text leading-snug' : undefined}
      />
      <Stat icon={IconClock} label={t(lang, 'statTotalDuration')} value={`${summary.total_duration.toFixed(1)}s`} />
      <Stat icon={IconHash} label={t(lang, 'statTotalWords')} value={summary.total_words} />
      <Stat icon={IconPause} label={t(lang, 'statAvgPause')} value={`${summary.avg_pause_duration}s`} />
      <Stat icon={IconAlertTriangle} label={t(lang, 'statLongestPause')} value={`${summary.longest_pause}s`} />
    </div>
  )
}
