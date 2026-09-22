const AUDIO_EXTENSIONS = {
  'audio/wav': 'wav',
  'audio/x-wav': 'wav',
  'audio/webm': 'webm',
  'audio/mp4': 'm4a',
  'audio/mpeg': 'mp3',
  'audio/ogg': 'ogg',
}

function triggerDownload(blob, filename) {
  const objectUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = objectUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(objectUrl)
}

export function sanitizeFilename(name) {
  return name.trim().replace(/[\\/:*?"<>|]/g, '_')
}

export function downloadJSON(baseName, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  triggerDownload(blob, `${baseName}.json`)
}

export async function downloadAudio(url, baseName) {
  const res = await fetch(url)
  const blob = await res.blob()
  const extension = AUDIO_EXTENSIONS[blob.type] ?? 'audio'
  triggerDownload(blob, `${baseName}.${extension}`)
}
