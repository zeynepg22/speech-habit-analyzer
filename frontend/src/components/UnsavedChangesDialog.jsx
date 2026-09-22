import Modal from './Modal'
import { t } from '../i18n'

export default function UnsavedChangesDialog({ lang, onLeave, onCancel, onSave }) {
  return (
    <Modal onClose={onCancel}>
      <h3 className="font-display text-lg font-semibold text-text">{t(lang, 'unsavedTitle')}</h3>
      <p className="mt-2 text-sm text-text-muted">{t(lang, 'unsavedMessage')}</p>

      <div className="mt-6 flex flex-col gap-2">
        <button
          onClick={onSave}
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          {t(lang, 'save')}
        </button>
        <button
          onClick={onLeave}
          className="rounded-full border border-border px-4 py-2 text-sm text-text transition-colors hover:bg-surface-hover"
        >
          {t(lang, 'leaveWithoutSaving')}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm text-text-faint transition-colors hover:text-text"
        >
          {t(lang, 'cancel')}
        </button>
      </div>
    </Modal>
  )
}
