import { useEffect, useRef, useState } from 'react'
import { IconFile, IconTrash, IconUploadCloud } from './icons'
import { t } from '../i18n'

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function UploadCard({ lang, file, onFileSelected }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [duration, setDuration] = useState(null)

  useEffect(() => {
    if (!file) {
      setDuration(null)
      return
    }
    const objectUrl = URL.createObjectURL(file)
    const probe = new Audio(objectUrl)
    const handleLoadedMetadata = () => setDuration(probe.duration)
    probe.addEventListener('loadedmetadata', handleLoadedMetadata)
    return () => {
      probe.removeEventListener('loadedmetadata', handleLoadedMetadata)
      URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) onFileSelected(dropped)
  }

  function handleInputChange(e) {
    const selected = e.target.files?.[0]
    if (selected) onFileSelected(selected)
    e.target.value = ''
  }

  if (file) {
    return (
      <div className="flex h-full min-h-[320px] flex-col justify-center gap-5 rounded-card border border-border bg-surface p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <IconFile className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-base font-medium text-text">{file.name}</p>
            <p className="mt-0.5 text-sm text-text-faint">
              {formatFileSize(file.size)}
              {duration != null && ` · ${formatDuration(duration)}`}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => inputRef.current?.click()}
            className="flex-1 rounded-full border border-border px-4 py-2 text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            {t(lang, 'changeFile')}
          </button>
          <button
            onClick={() => onFileSelected(null)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-text-faint transition-colors hover:border-score-low/50 hover:text-score-low"
          >
            <IconTrash className="h-4 w-4" />
            {t(lang, 'removeFile')}
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".mp3,.wav,.m4a,.mp4,.webm,.ogg"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    )
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`flex h-full min-h-[320px] cursor-pointer flex-col items-center justify-center gap-4 rounded-card border-2 border-dashed p-12 text-center transition-all duration-150 ${
        isDragging
          ? 'scale-[1.01] border-accent bg-accent-soft shadow-card-hover ring-2 ring-accent/40'
          : 'border-border bg-surface hover:border-text-faint'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".mp3,.wav,.m4a,.mp4,.webm,.ogg"
        onChange={handleInputChange}
        className="hidden"
      />

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
        <IconUploadCloud className="h-8 w-8 text-accent" />
      </div>
      <div>
        <p className="text-base text-text">{t(lang, 'dropzoneTitle')}</p>
        <p className="mt-1.5 text-sm text-text-faint">{t(lang, 'dropzoneSubtitle')}</p>
      </div>
    </div>
  )
}
