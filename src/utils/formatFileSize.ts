const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const

export const formatFileSize = (bytes?: number | null, fractionDigits = 1): string => {
  if (bytes == null || Number.isNaN(bytes)) {
    return '—'
  }

  if (bytes === 0) {
    return '0 B'
  }

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    UNITS.length - 1
  )
  const value = bytes / 1024 ** exponent

  return `${value.toFixed(exponent === 0 ? 0 : fractionDigits)} ${UNITS[exponent]}`
}
