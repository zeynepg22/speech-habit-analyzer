import { t } from '../i18n'
import MiniBar from './MiniBar'

function scoreColors(score) {
  if (score < 50) return { stroke: 'stroke-score-low', text: 'text-score-low' }
  if (score < 75) return { stroke: 'stroke-score-mid', text: 'text-score-mid' }
  return { stroke: 'stroke-score-high', text: 'text-score-high' }
}

export default function FluencyGauge({ score, breakdown, lang }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - score / 100)
  const colors = scoreColors(score)

  return (
    <div className="bg-surface border border-border rounded-card shadow-card p-6 flex flex-col sm:flex-row items-center gap-8">
      <div className="relative w-32 h-32 shrink-0">
        <svg viewBox="0 0 120 120" className="w-32 h-32 -rotate-90">
          <circle cx="60" cy="60" r={radius} fill="none" strokeWidth="10" className="stroke-border" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`transition-all duration-1000 ease-out ${colors.stroke}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-display text-3xl font-bold ${colors.text}`}>{score}</span>
          <span className="text-[10px] uppercase tracking-wider text-text-faint mt-0.5">
            {t(lang, 'fluencyOutOf')}
          </span>
        </div>
      </div>

      <div className="flex-1 w-full space-y-3">
        <div>
          <p className="font-display text-lg font-semibold text-text">{t(lang, 'fluencyScoreLabel')}</p>
          <p className="text-xs text-text-muted mt-1">{t(lang, 'fluencyDescription')}</p>
        </div>
        <div className="space-y-2.5 pt-1">
          <MiniBar label={t(lang, 'tempoLabel')} value={breakdown.tempo_consistency} />
          <MiniBar label={t(lang, 'pauseLabel')} value={breakdown.pause_regularity} />
          <MiniBar label={t(lang, 'fillerLabel')} value={breakdown.filler_density} />
        </div>
      </div>
    </div>
  )
}
