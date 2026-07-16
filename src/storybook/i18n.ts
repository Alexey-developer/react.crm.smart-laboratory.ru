import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import globalAz from '@translations/az/global.json'
import globalBe from '@translations/be/global.json'
import globalDe from '@translations/de/global.json'
import globalEn from '@translations/en/global.json'
import globalFr from '@translations/fr/global.json'
import globalJa from '@translations/ja/global.json'
import globalKk from '@translations/kk/global.json'
import globalKy from '@translations/ky/global.json'
import globalRu from '@translations/ru/global.json'
import globalTr from '@translations/tr/global.json'
import globalZh from '@translations/zh/global.json'

import type { Lang } from '@redux/Language/types'

export const storybookI18n = i18next.createInstance()

storybookI18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: 'ru',
  resources: {
    az: { global: globalAz },
    be: { global: globalBe },
    de: { global: globalDe },
    en: { global: globalEn },
    fr: { global: globalFr },
    ja: { global: globalJa },
    kk: { global: globalKk },
    ky: { global: globalKy },
    ru: { global: globalRu },
    tr: { global: globalTr },
    zh: { global: globalZh },
  },
})

export const setStorybookLocale = (locale: Lang) => {
  void storybookI18n.changeLanguage(locale)
}
