export default function ResultSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-card shadow-card p-6 flex items-center gap-8">
        <div className="w-32 h-32 rounded-full skeleton shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-40 rounded skeleton" />
          <div className="h-3 w-64 rounded skeleton" />
          <div className="space-y-2 pt-2">
            <div className="h-1.5 w-full rounded-full skeleton" />
            <div className="h-1.5 w-full rounded-full skeleton" />
            <div className="h-1.5 w-full rounded-full skeleton" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-24 rounded-card skeleton" />
        ))}
      </div>

      <div className="h-40 rounded-card skeleton" />
      <div className="h-72 rounded-card skeleton" />
    </div>
  )
}
