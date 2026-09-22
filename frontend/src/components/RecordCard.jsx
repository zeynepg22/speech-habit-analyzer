import { useEffect, useRef, useState } from 'react'
import { IconCheck, IconMic, IconSquare, IconTrash } from './icons'
import { t } from '../i18n'

const MIN_RECORDING_BYTES = 2000
const SHORT_RECORDING_SECONDS = 5
const LEVEL_BAR_BIN_INDEXES = [1, 3, 6, 10, 15]

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function RecordCard({ lang, isActive, limitSeconds, onRecordingReady, onRecordAgain, onError }) {
  const [phase, setPhase] = useState('idle')
  const [confirmed, setConfirmed] = useState(false)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [previewBlob, setPreviewBlob] = useState(null)
  const [recordedSeconds, setRecordedSeconds] = useState(0)

  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const streamRef = useRef(null)
  const audioCtxRef = useRef(null)
  const rafRef = useRef(null)
  const intervalRef = useRef(null)
  const startTimeRef = useRef(0)
  const barRefs = useRef([])
  const previewUrlRef = useRef(null)

  useEffect(() => {
    previewUrlRef.current = previewUrl
  }, [previewUrl])

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current)
      clearInterval(intervalRef.current)
      streamRef.current?.getTracks().forEach((track) => track.stop())
      audioCtxRef.current?.close()
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    }
  }, [])

  function handleRecorderStop() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    cancelAnimationFrame(rafRef.current)
    clearInterval(intervalRef.current)
    audioCtxRef.current?.close()

    const recordedMs = Date.now() - startTimeRef.current
    const blob = new Blob(chunksRef.current, { type: 'audio/webm' })

    if (blob.size < MIN_RECORDING_BYTES) {
      onError(t(lang, 'recordingTooShort'))
      setPhase('idle')
      return
    }

    setPreviewUrl(URL.createObjectURL(blob))
    setPreviewBlob(blob)
    setRecordedSeconds(Math.floor(recordedMs / 1000))
    setPhase('preview')
  }

  async function handleStart() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    streamRef.current = stream

    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    const audioCtx = new AudioContextClass()
    const source = audioCtx.createMediaStreamSource(stream)
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 64
    source.connect(analyser)
    audioCtxRef.current = audioCtx

    const recorder = new MediaRecorder(stream)
    chunksRef.current = []
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data)
    recorder.onstop = handleRecorderStop
    recorder.start()
    mediaRecorderRef.current = recorder

    startTimeRef.current = Date.now()
    setElapsedMs(0)
    setConfirmed(false)
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      setElapsedMs(elapsed)
      if (limitSeconds != null && elapsed >= limitSeconds * 1000) {
        handleStop()
      }
    }, 200)

    const freqData = new Uint8Array(analyser.frequencyBinCount)
    const tick = () => {
      analyser.getByteFrequencyData(freqData)
      LEVEL_BAR_BIN_INDEXES.forEach((binIndex, i) => {
        const el = barRefs.current[i]
        if (!el) return
        const value = freqData[binIndex] ?? 0
        el.style.height = `${Math.max(8, Math.min(100, (value / 255) * 100))}%`
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()

    setPhase('recording')
  }

  function handleStop() {
    mediaRecorderRef.current?.stop()
  }

  function handleDiscard() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setPreviewBlob(null)
    setPhase('idle')
  }

  function handleUse() {
    const file = new File([previewBlob], `${crypto.randomUUID()}.webm`, { type: 'audio/webm' })
    onRecordingReady(file)
    setConfirmed(true)
  }

  function handleRecordAgain() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setPreviewBlob(null)
    setPhase('idle')
    setConfirmed(false)
    onRecordAgain()
  }

  if (phase === 'recording') {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-5 rounded-card border border-score-low/40 bg-score-low/5 p-12 text-center">
        <div className="flex h-20 items-end justify-center gap-2">
          {LEVEL_BAR_BIN_INDEXES.map((_, i) => (
            <div
              key={i}
              ref={(el) => (barRefs.current[i] = el)}
              className="w-2.5 rounded-full bg-accent"
              style={{ height: '8%' }}
            />
          ))}
        </div>
        <p className="font-display text-3xl font-semibold tabular-nums text-text">{formatDuration(elapsedMs)}</p>
        <p className="text-sm text-score-low">{t(lang, 'recordingInProgress')}</p>
        <button
          onClick={handleStop}
          className="inline-flex items-center gap-2 rounded-full border border-score-low bg-score-low/10 px-5 py-2.5 text-sm text-score-low animate-pulse"
        >
          <IconSquare className="h-4 w-4" />
          {t(lang, 'stop')}
        </button>
      </div>
    )
  }

  if (phase === 'preview' && !confirmed) {
    return (
      <div className="flex h-full min-h-[320px] flex-col justify-center gap-4 rounded-card border border-border bg-surface p-8">
        <p className="text-base font-medium text-text">
          {t(lang, 'previewReady')} · {formatDuration(recordedSeconds * 1000)}
        </p>
        <audio controls src={previewUrl} className="w-full" />
        {recordedSeconds < SHORT_RECORDING_SECONDS && (
          <p className="text-sm text-score-mid">{t(lang, 'shortRecordingWarning')}</p>
        )}
        <div className="flex gap-3">
          <button
            onClick={handleDiscard}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-text-faint transition-colors hover:border-score-low/50 hover:text-score-low"
          >
            <IconTrash className="h-4 w-4" />
            {t(lang, 'discardRetry')}
          </button>
          <button
            onClick={handleUse}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <IconCheck className="h-4 w-4" />
            {t(lang, 'useRecording')}
          </button>
        </div>
      </div>
    )
  }

  if (confirmed && isActive) {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-card border border-accent/40 bg-accent-soft p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
          <IconCheck className="h-7 w-7" />
        </div>
        <div>
          <p className="text-base font-medium text-text">{t(lang, 'recordingReady')}</p>
          <p className="mt-1 text-sm text-text-faint">{formatDuration(recordedSeconds * 1000)}</p>
        </div>
        <button
          onClick={handleRecordAgain}
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-text transition-colors hover:border-accent hover:text-accent"
        >
          <IconMic className="h-4 w-4" />
          {t(lang, 'recordAgain')}
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-card border border-border bg-surface p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
        <IconMic className="h-7 w-7 text-accent" />
      </div>
      <div>
        <p className="text-base text-text">{t(lang, 'recordCardTitle')}</p>
        <p className="mt-1.5 text-sm text-text-faint">{t(lang, 'recordCardSubtitle')}</p>
      </div>
      <button
        onClick={handleStart}
        className="mt-1 inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-5 py-2.5 text-sm text-text transition-colors hover:border-accent hover:text-accent"
      >
        <IconMic className="h-4 w-4" />
        {t(lang, 'record')}
      </button>
    </div>
  )
}
