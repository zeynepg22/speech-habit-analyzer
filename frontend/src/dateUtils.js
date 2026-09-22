import { daysAgo, hoursAgo, localeForLang, minutesAgo, t } from './i18n'

export function relativeTime(isoString, lang) {
  const diffMs = Date.now() - new Date(isoString).getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffMin < 1) return t(lang, 'justNow')
  if (diffMin < 60) return minutesAgo(lang, diffMin)
  if (diffHour < 24) return hoursAgo(lang, diffHour)
  if (diffDay < 7) return daysAgo(lang, diffDay)
  return new Date(isoString).toLocaleDateString(localeForLang(lang), { month: 'short', day: 'numeric' })
}

export function groupKey(isoString) {
  const date = new Date(isoString)
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfYesterday = new Date(startOfToday.getTime() - 86400000)
  const startOfWeek = new Date(startOfToday.getTime() - 7 * 86400000)

  if (date >= startOfToday) return 'today'
  if (date >= startOfYesterday) return 'yesterday'
  if (date >= startOfWeek) return 'thisWeek'
  return 'older'
}
