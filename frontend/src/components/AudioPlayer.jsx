import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { IconPauseCircle, IconPlay } from './icons'

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

const AudioPlayer = forwardRef(function AudioPlayer({ src, onTimeUpdate }, ref) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useImperativeHandle(ref, () => ({
    seekTo(time) {
      if (!audioRef.current) return
      audioRef.current.currentTime = time
      audioRef.current.play()
    },
  }))

  function togglePlay() {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  function handleTimeUpdate() {
    const time = audioRef.current.currentTime
    setCurrentTime(time)
    onTimeUpdate?.(time)
  }

  function handleSeekBar(e) {
    const time = Number(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
    setCurrentTime(time)
  }

  return (
    <div className="flex items-center gap-3">
      <audio
        ref={audioRef}
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        className="hidden"
      />
      <button
        onClick={togglePlay}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover transition-colors"
      >
        {isPlaying ? <IconPauseCircle className="h-4 w-4" /> : <IconPlay className="h-4 w-4" />}
      </button>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.01}
        value={currentTime}
        onChange={handleSeekBar}
        className="h-1.5 flex-1 accent-accent"
      />
      <span className="w-20 shrink-0 text-right text-xs text-text-faint">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </div>
  )
})

export default AudioPlayer
