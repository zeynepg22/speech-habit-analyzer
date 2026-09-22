import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { localeForLang, t } from '../i18n'
import { IconTrendingUp } from './icons'

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-surface-raised px-3 py-2 shadow-card">
      <p className="text-[11px] text-text-faint">{payload[0].payload.label}</p>
      <p className="text-sm font-medium text-text">{payload[0].value}/100</p>
    </div>
  )
}

export default function ProgressTrendChart({ history, lang }) {
  if (history.length < 2) {
    return (
      <div className="bg-surface border border-border rounded-card shadow-card p-6 flex items-center gap-3">
        <IconTrendingUp className="h-4 w-4 text-text-faint shrink-0" />
        <p className="text-sm text-text-faint">{t(lang, 'progressEmpty')}</p>
      </div>
    )
  }

  const data = [...history]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map((item) => ({
      score: item.fluency_score,
      label: new Date(item.created_at).toLocaleDateString(localeForLang(lang), {
        month: 'short',
        day: 'numeric',
      }),
    }))

  return (
    <div className="bg-surface border border-border rounded-card shadow-card p-6">
      <h2 className="font-display text-lg font-semibold text-text mb-4">{t(lang, 'progressTitle')}</h2>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={data} margin={{ top: 5, right: 12, left: -12, bottom: 0 }}>
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#5c6274' }} axisLine={{ stroke: '#232733' }} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#5c6274' }} axisLine={false} tickLine={false} width={30} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3, fill: '#8b5cf6' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
