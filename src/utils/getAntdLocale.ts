import type { Locale } from 'antd/es/locale'

import azerbaijani from 'antd/locale/az_AZ'
import german from 'antd/locale/de_DE'
import english from 'antd/locale/en_US'
import french from 'antd/locale/fr_FR'
import japanese from 'antd/locale/ja_JP'
import kazakh from 'antd/locale/kk_KZ'
import russian from 'antd/locale/ru_RU'
import turkish from 'antd/locale/tr_TR'
import chinese from 'antd/locale/zh_CN'

import type { Lang } from '@redux/Language/types'

/**
 * Antd has no dedicated be/ky packs — fall back to Russian (closest Cyrillic UI).
 */
const antdLocales: Record<Lang, Locale> = {
  ru: russian,
  en: english,
  az: azerbaijani,
  be: russian,
  kk: kazakh,
  ky: russian,
  de: german,
  fr: french,
  zh: chinese,
  ja: japanese,
  tr: turkish,
}

export const getAntdLocale = (lang: Lang): Locale => antdLocales[lang]
