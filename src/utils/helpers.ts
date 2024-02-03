import { useTranslation } from 'react-i18next'

export const SetPageTitle = (pageTitle: string) => {
  const [translated_phrase] = useTranslation('global')
  return (document.title =
    translated_phrase('Common.companyName') + ' CRM | ' + pageTitle)
}

export const convert2string = (
  number: number,
  str: string = '',
  locale: string = 'ru-RU'
) => {
  return number.toLocaleString(locale) + (str ? ' ' + str : '')
}
