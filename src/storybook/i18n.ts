import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import globalEn from '@translations/en/global.json'
import globalRu from '@translations/ru/global.json'

import type { Lang } from '@redux/Language/types'

export const storybookI18n = i18next.createInstance()

storybookI18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: 'ru',
  resources: {
    en: { global: globalEn },
    ru: { global: globalRu },
  },
})

export const setStorybookLocale = (locale: Lang) => {
  void storybookI18n.changeLanguage(locale)
}
