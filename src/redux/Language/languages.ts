import type { Lang } from './types'

export type LangOption = {
  code: Lang
  /** Native language name without code suffix */
  label: string
  /** ISO-style short code shown in UI, e.g. RU */
  short: string
  /** dayjs locale id (may differ from Lang, e.g. zh → zh-cn) */
  dayjsLocale: string
}

export const LANG_OPTIONS: readonly LangOption[] = [
  { code: 'ru', label: 'Русский', short: 'RU', dayjsLocale: 'ru' },
  { code: 'en', label: 'English', short: 'EN', dayjsLocale: 'en' },
  { code: 'az', label: 'Azərbaycan', short: 'AZ', dayjsLocale: 'az' },
  { code: 'be', label: 'Беларуская', short: 'BE', dayjsLocale: 'be' },
  { code: 'kk', label: 'Қазақша', short: 'KK', dayjsLocale: 'kk' },
  { code: 'ky', label: 'Кыргызча', short: 'KY', dayjsLocale: 'ky' },
  { code: 'de', label: 'Deutsch', short: 'DE', dayjsLocale: 'de' },
  { code: 'fr', label: 'Français', short: 'FR', dayjsLocale: 'fr' },
  { code: 'zh', label: '中文', short: 'ZH', dayjsLocale: 'zh-cn' },
  { code: 'ja', label: '日本語', short: 'JA', dayjsLocale: 'ja' },
  { code: 'tr', label: 'Türkçe', short: 'TR', dayjsLocale: 'tr' },
] as const

export const getLangLabel = (option: LangOption): string =>
  `${option.label} [${option.short}]`

export const getDayjsLocale = (lang: Lang): string => {
  const option = LANG_OPTIONS.find(item => item.code === lang)
  return option?.dayjsLocale ?? 'en'
}
