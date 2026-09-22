import { useEffect, useRef, useState } from 'react'
import { IconCheck, IconChevronDown } from './icons'

export default function Dropdown({ value, options, onChange, icon: IconComponent, compact = false, className }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleOutsideEvent(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideEvent)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleOutsideEvent)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const selected = options.find((option) => String(option.value) === String(value))

  return (
    <div ref={containerRef} className={`relative ${className ?? ''}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={
          compact
            ? 'inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:border-text-faint hover:text-text focus:outline-none focus:ring-1 focus:ring-accent'
            : 'flex w-full items-center gap-1.5 rounded-lg bg-transparent px-3 py-1.5 text-sm text-text transition-colors hover:bg-surface-hover focus:outline-none focus:ring-1 focus:ring-accent'
        }
      >
        {IconComponent && <IconComponent className={compact ? 'h-4 w-4 shrink-0' : 'h-3.5 w-3.5 shrink-0'} />}
        <span className="truncate">{selected?.label}</span>
        <IconChevronDown
          className={`${compact ? 'h-4 w-4' : 'h-3.5 w-3.5'} shrink-0 text-text-faint transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-20 mt-1 w-max min-w-full overflow-hidden rounded-lg border border-border bg-surface-raised shadow-card"
        >
          {options.map((option) => {
            const isSelected = String(option.value) === String(value)
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors ${
                  isSelected ? 'bg-accent-soft text-accent' : 'text-text hover:bg-surface-hover'
                }`}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && <IconCheck className="h-3.5 w-3.5 shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
