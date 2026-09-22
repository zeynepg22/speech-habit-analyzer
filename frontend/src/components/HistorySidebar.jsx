import { useEffect, useRef, useState } from 'react'
import { groupKey, relativeTime } from '../dateUtils'
import { t } from '../i18n'
import { IconActivity, IconInbox, IconPencil, IconRepeat, IconTrash } from './icons'

const GROUP_ORDER = ['today', 'yesterday', 'thisWeek', 'older']
const GROUP_LABEL_KEY = {
  today: 'groupToday',
  yesterday: 'groupYesterday',
  thisWeek: 'groupThisWeek',
  older: 'groupOlder',
}

function scoreColorClass(score) {
  if (score < 50) return 'text-score-low'
  if (score < 75) return 'text-score-mid'
  return 'text-score-high'
}

function groupHistory(history) {
  const groups = { today: [], yesterday: [], thisWeek: [], older: [] }
  for (const item of history) {
    groups[groupKey(item.created_at)].push(item)
  }
  return groups
}

function HistoryItem({ item, lang, isActive, onSelect, onDelete, onRename }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(item.name)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  function commit() {
    setEditing(false)
    const trimmed = draft.trim()
    if (trimmed && trimmed !== item.name) {
      onRename(item.id, trimmed)
    } else {
      setDraft(item.name)
    }
  }

  return (
    <div
      onClick={() => !editing && onSelect(item.id)}
      className={`group cursor-pointer rounded-lg border-l-2 p-3.5 pl-4 transition-colors hover:bg-surface-hover ${
        isActive ? 'border-accent bg-surface-hover' : 'border-transparent'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          {editing ? (
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onBlur={commit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.blur()
                if (e.key === 'Escape') {
                  setDraft(item.name)
                  setEditing(false)
                }
              }}
              className="w-full truncate rounded border border-accent bg-transparent text-sm font-medium text-text focus:outline-none"
            />
          ) : (
            <p className="truncate text-sm font-medium text-text">{item.name}</p>
          )}
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-faint">
            <span className="rounded border border-border px-1 py-0.5 text-[10px] uppercase tracking-wide">
              {item.language}
            </span>
            <span className={`font-semibold ${scoreColorClass(item.fluency_score)}`}>{item.fluency_score}</span>
            <span className="inline-flex items-center gap-0.5">
              <IconActivity className="h-3 w-3" />
              {item.avg_wpm}
            </span>
            <span className="inline-flex items-center gap-0.5">
              <IconRepeat className="h-3 w-3" />
              {item.filler_count}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-text-faint">{relativeTime(item.created_at, lang)}</p>
        </div>
        <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setDraft(item.name)
              setEditing(true)
            }}
            className="rounded-md p-1.5 text-text-faint transition-colors hover:text-accent"
          >
            <IconPencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (window.confirm(t(lang, 'deleteConfirm'))) onDelete(item.id)
            }}
            className="rounded-md p-1.5 text-text-faint transition-colors hover:text-score-low"
          >
            <IconTrash className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function HistorySidebar({ history, lang, activeId, onSelect, onDelete, onRename }) {
  const groups = groupHistory(history)

  return (
    <div className="flex min-h-[320px] max-h-[680px] flex-col rounded-card border border-border bg-surface p-6 shadow-card">
      <h2 className="mb-4 shrink-0 font-display text-base font-semibold text-text">{t(lang, 'historyTitle')}</h2>

      {history.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-14 text-center">
          <IconInbox className="h-10 w-10 text-text-faint/40" />
          <p className="text-sm text-text-faint">{t(lang, 'historyEmpty')}</p>
        </div>
      ) : (
        <div className="thin-scrollbar space-y-5 overflow-y-auto pr-1">
          {GROUP_ORDER.filter((key) => groups[key].length > 0).map((key) => (
            <div key={key}>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-text-faint">
                {t(lang, GROUP_LABEL_KEY[key])}
              </p>
              <div className="space-y-1.5">
                {groups[key].map((item) => (
                  <HistoryItem
                    key={item.id}
                    item={item}
                    lang={lang}
                    isActive={item.id === activeId}
                    onSelect={onSelect}
                    onDelete={onDelete}
                    onRename={onRename}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
