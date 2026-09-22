import { Area, AreaChart, CartesianGrid, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { t } from '../i18n'

function parseWindowStart(timeWindow) {
  return Number(timeWindow.split('-')[0])
}

function ChartTooltip({ active, payload, label, lang }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-surface-raised px-3 py-2 shadow-card">
      <p className="text-[11px] text-text-faint">{label}s</p>
      <p className="text-sm font-medium text-text">
        {payload[0].value} <span className="font-normal text-text-muted">{t(lang, 'tooltipPaceLabel')}</span>
      </p>
    </div>
  )
}

export default function PaceChart({ paceTimeline, pauses, lang, totalDuration }) {
  const data = paceTimeline.map((point) => ({
    time: parseWindowStart(point.time_window),
    wpm: point.wpm,
  }))

  if (data.length > 0 && totalDuration > data[data.length - 1].time) {
    data.push({ time: Math.round(totalDuration * 10) / 10, wpm: data[data.length - 1].wpm })
  }

  return (
    <div className="bg-surface border border-border rounded-card shadow-card p-6">
      <h2 className="font-display text-lg font-semibold text-text mb-4">{t(lang, 'paceChartTitle')}</h2>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="paceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 6" stroke="#232733" vertical={false} />
          <XAxis
            dataKey="time"
            type="number"
            domain={['dataMin', 'dataMax']}
            unit="s"
            tick={{ fontSize: 11, fill: '#5c6274' }}
            axisLine={{ stroke: '#232733' }}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 11, fill: '#5c6274' }} axisLine={false} tickLine={false} width={36} />
          <Tooltip
            content={<ChartTooltip lang={lang} />}
            cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          {pauses.map((pause, i) => (
            <ReferenceArea key={i} x1={pause.start} x2={pause.end} fill="#5c6274" fillOpacity={0.18} />
          ))}
          <Area
            type="monotone"
            dataKey="wpm"
            stroke="#8b5cf6"
            strokeWidth={2.5}
            fill="url(#paceGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#8b5cf6', stroke: '#08090d', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-xs text-text-faint mt-3">{t(lang, 'pauseNote')}</p>
    </div>
  )
}
