function barColor(value) {
  if (value < 50) return 'bg-score-low'
  if (value < 75) return 'bg-score-mid'
  return 'bg-score-high'
}

export default function MiniBar({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-text-muted mb-1">
        <span>{label}</span>
        <span className="text-text font-medium">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-hover overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
