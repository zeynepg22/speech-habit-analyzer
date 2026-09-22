import { useState } from 'react'
import Modal from './Modal'
import { t } from '../i18n'

export default function SaveDialog({ lang, onCancel, onConfirm, saving }) {
  const [saveToHistory, setSaveToHistory] = useState(true)
  const [download, setDownload] = useState(false)

  return (
    <Modal onClose={onCancel}>
      <h3 className="font-display text-lg font-semibold text-text">{t(lang, 'saveDialogTitle')}</h3>

      <div className="mt-4 space-y-3">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-text">
          <input
            type="checkbox"
            checked={saveToHistory}
            onChange={(e) => setSaveToHistory(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          {t(lang, 'saveToHistoryOption')}
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-text">
          <input
            type="checkbox"
            checked={download}
            onChange={(e) => setDownload(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          {t(lang, 'downloadOption')}
        </label>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-full px-4 py-2 text-sm text-text-faint transition-colors hover:text-text"
        >
          {t(lang, 'cancel')}
        </button>
        <button
          onClick={() => onConfirm({ saveToHistory, download })}
          disabled={(!saveToHistory && !download) || saving}
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-surface-hover disabled:text-text-faint"
        >
          {saving ? t(lang, 'saving') : t(lang, 'confirm')}
        </button>
      </div>
    </Modal>
  )
}
