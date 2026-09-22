import { useMemo, useRef, useState } from 'react'
import { t } from '../i18n'
import AudioPlayer from './AudioPlayer'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = (seconds % 60).toFixed(1)
  return `${m}:${s.padStart(4, '0')}`
}

function groupTranscript(transcript) {
  const groups = []
  let i = 0
  while (i < transcript.length) {
    const current = transcript[i]
    if (current.is_filler && current.filler_group != null) {
      let j = i + 1
      while (j < transcript.length && transcript[j].filler_group === current.filler_group) j++
      groups.push(transcript.slice(i, j))
      i = j
    } else {
      groups.push([current])
      i++
    }
  }
  return groups
}

function FillerBadge({ words, isActive, onClick }) {
  const text = words.map((w) => w.word).join('').trim()
  const start = words[0].start
  const end = words[words.length - 1].end
  const timeLabel = words.length > 1 ? `${formatTime(start)}–${formatTime(end)}` : formatTime(start)

  return (
    <span className="relative inline-block group/word">
      <span
        onClick={onClick}
        className={`mx-0.5 cursor-pointer rounded-full bg-gradient-to-r from-filler-from to-filler-to px-1.5 py-0.5 font-medium text-bg transition-shadow ${
          isActive ? 'ring-2 ring-accent ring-offset-1 ring-offset-surface' : ''
        }`}
      >
        {text}
      </span>
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface-raised px-2 py-1 text-[11px] text-text-muted opacity-0 shadow-card transition-opacity duration-150 group-hover/word:opacity-100">
        {timeLabel}
      </span>
    </span>
  )
}

function PlainWord({ word, start, isActive, onClick }) {
  return (
    <span
      onClick={onClick}
      title={formatTime(start)}
      className={`cursor-pointer rounded px-0.5 transition-colors ${
        isActive ? 'bg-accent-soft text-accent' : 'text-text hover:text-accent'
      }`}
    >
      {word}
    </span>
  )
}

export default function TranscriptView({ transcript, lang, audioSrc }) {
  const [currentTime, setCurrentTime] = useState(-1)
  const audioPlayerRef = useRef(null)
  const groups = useMemo(() => groupTranscript(transcript), [transcript])

  return (
    <div className="bg-surface border border-border rounded-card shadow-card p-6">
      <h2 className="font-display text-lg font-semibold text-text mb-4">{t(lang, 'transcriptTitle')}</h2>

      {audioSrc && (
        <div className="mb-5 pb-5 border-b border-border-subtle">
          <AudioPlayer ref={audioPlayerRef} src={audioSrc} onTimeUpdate={setCurrentTime} />
        </div>
      )}

      <p className="thin-scrollbar max-h-[420px] overflow-y-auto pr-1 text-[15px] leading-loose text-text-muted">
        {groups.map((words, i) => {
          const start = words[0].start
          const end = words[words.length - 1].end
          const isActive = currentTime >= start && currentTime < end
          const onClick = () => audioPlayerRef.current?.seekTo(start)

          return words[0].is_filler ? (
            <FillerBadge key={i} words={words} isActive={isActive} onClick={onClick} />
          ) : (
            <PlainWord key={i} word={words[0].word} start={start} isActive={isActive} onClick={onClick} />
          )
        })}
      </p>
    </div>
  )
}
