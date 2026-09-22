function Icon({ children, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  )
}

export function IconActivity({ className }) {
  return (
    <Icon className={className}>
      <polyline points="3 12 8 12 10 18 14 6 16 12 21 12" />
    </Icon>
  )
}

export function IconRepeat({ className }) {
  return (
    <Icon className={className}>
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </Icon>
  )
}

export function IconTag({ className }) {
  return (
    <Icon className={className}>
      <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.5 3H4a1 1 0 0 0-1 1v5.5a2 2 0 0 0 .59 1.41l9.59 9.59a2 2 0 0 0 2.83 0l4.58-4.58a2 2 0 0 0 0-2.83Z" />
      <circle cx="7.5" cy="7.5" r="1.15" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function IconClock({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </Icon>
  )
}

export function IconHash({ className }) {
  return (
    <Icon className={className}>
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </Icon>
  )
}

export function IconPause({ className }) {
  return (
    <Icon className={className}>
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </Icon>
  )
}

export function IconAlertTriangle({ className }) {
  return (
    <Icon className={className}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </Icon>
  )
}

export function IconMic({ className }) {
  return (
    <Icon className={className}>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </Icon>
  )
}

export function IconSquare({ className }) {
  return (
    <Icon className={className}>
      <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function IconUploadCloud({ className }) {
  return (
    <Icon className={className}>
      <path d="M8 17l4-4 4 4" />
      <path d="M12 13v9" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </Icon>
  )
}

export function IconSparkles({ className }) {
  return (
    <Icon className={className}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
      <path d="M5 3v3" />
      <path d="M3.5 4.5h3" />
      <path d="M19 15v3" />
      <path d="M17.5 16.5h3" />
    </Icon>
  )
}

export function IconFile({ className }) {
  return (
    <Icon className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
    </Icon>
  )
}

export function IconArrowLeft({ className }) {
  return (
    <Icon className={className}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </Icon>
  )
}

export function IconTrash({ className }) {
  return (
    <Icon className={className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </Icon>
  )
}

export function IconPlay({ className }) {
  return (
    <Icon className={className}>
      <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function IconPauseCircle({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <line x1="10" y1="9" x2="10" y2="15" />
      <line x1="14" y1="9" x2="14" y2="15" />
    </Icon>
  )
}

export function IconTrendingUp({ className }) {
  return (
    <Icon className={className}>
      <polyline points="3 17 9 11 13 15 21 6" />
      <polyline points="14 6 21 6 21 13" />
    </Icon>
  )
}

export function IconSave({ className }) {
  return (
    <Icon className={className}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </Icon>
  )
}

export function IconCheck({ className }) {
  return (
    <Icon className={className}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  )
}

export function IconPencil({ className }) {
  return (
    <Icon className={className}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="M15 5l4 4" />
    </Icon>
  )
}

export function IconGlobe({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3a13 13 0 0 1 3.5 9 13 13 0 0 1-3.5 9 13 13 0 0 1-3.5-9A13 13 0 0 1 12 3Z" />
    </Icon>
  )
}

export function IconChevronDown({ className }) {
  return (
    <Icon className={className}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  )
}

export function IconInbox({ className }) {
  return (
    <Icon className={className}>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
    </Icon>
  )
}

export function IconZap({ className }) {
  return (
    <Icon className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function IconTarget({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </Icon>
  )
}
