import { IconTarget, IconZap } from './icons'
import { t } from '../i18n'

function ModelOption({ active, icon: IconComponent, label, hint, onClick }) {
  return (
    <button
      onClick={onClick}
      title={hint}
      className={`flex items-center gap-2 rounded-md border px-3.5 py-2 text-sm transition-colors ${
        active
          ? 'border-accent bg-accent-soft text-accent'
          : 'border-border bg-surface text-text-muted hover:border-text-faint hover:text-text'
      }`}
    >
      <IconComponent className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </button>
  )
}

export default function ModelQualitySelector({ lang, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <ModelOption
        active={value === 'fast'}
        icon={IconZap}
        label={t(lang, 'modelFast')}
        hint={t(lang, 'modelFastHint')}
        onClick={() => onChange('fast')}
      />
      <ModelOption
        active={value === 'accurate'}
        icon={IconTarget}
        label={t(lang, 'modelAccurate')}
        hint={t(lang, 'modelAccurateHint')}
        onClick={() => onChange('accurate')}
      />
    </div>
  )
}
