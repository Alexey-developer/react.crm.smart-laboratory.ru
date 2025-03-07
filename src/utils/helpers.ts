import { useTranslation } from 'react-i18next'

import debounce from 'lodash.debounce'

import { constants } from '@utils/constants/constants.json'

// export const setStateValueDebounce = debounce(
//   (state: { value: string | string[] }, value: string | string[]) => {
//     state.value = value
//   },
//   constants.SEARCH_TIMEOUT
// )

export type States = { value: string | string[] }[]
export type Values = (string | string[])[]

export const setStatesValuesDebounce = debounce(
  (states: States, values: Values) => {
    if (states.length !== values.length) {
      const error = 'states.length !== values.length'

      console.log(error)
      throw error
    }
    for (let index = 0; index < states.length; index++) {
      states[index].value = values[index]
    }
  },
  constants.SEARCH_TIMEOUT
)

export const SetPageTitle = (pageTitle: string) => {
  const [translated_phrase] = useTranslation('global')

  document.title = `${translated_phrase(
    'Common.companyName'
  )} CRM | ${pageTitle}`
}

//
import type { TFunction } from 'i18next'
const formatMinutes = (minutes: number) => {
  return minutes > 9 ? minutes : `0${minutes}`
}
export const seconds2TimeHelper = (seconds: number) => {
  const hours = Math.floor(seconds / 60 / 60)
  const minutes = formatMinutes(Math.floor(seconds / 60 - hours * 60))
  return { hours: hours.toLocaleString('ru-RU'), minutes }
}
export const seconds2Time = (seconds: number, translated_phrase: TFunction) => {
  return `${seconds2TimeHelper(seconds)['hours']} ${translated_phrase(
    'Time.short_hours'
  )} ${seconds2TimeHelper(seconds)['minutes']} ${translated_phrase(
    'Time.short_minutes'
  )}`
}

export const convert2string = (
  number: number,
  str: string = '',
  locale: string = 'ru-RU'
) => {
  return number.toLocaleString(locale) + (str ? ' ' + str : '')
}

export const getDateTimeFormat = (locale: string = 'ru-RU') => {
  return locale === 'ru-RU' ? 'DD.MM.YYYY HH:mm' : 'YYYY-MM-DD HH:mm'
}

export const GetValidateMessages = () => {
  const [translated_phrase] = useTranslation('global')

  //   const validateMessages = {
  //     // required: "'${name}' is Required!",
  //     //   max: "'${name}' is Required!",
  //     length: "'${name}' is Required!",
  //     // max: "'${name}' is 55!",

  //     string: {
  //       len: "'${name}' is 55!",
  //     },
  //     // rwqrq: '123',
  //     // ...
  //   }

  const validateMessages = {
    //   required: "'${name}' is Required!",
    //   max: "'${name}' is Required!",
    // required: "'${name}' is Required!",
    string: {
      len: translated_phrase('Form.Errors.len'),
      min: translated_phrase('Form.Errors.min'),
      max: translated_phrase('Form.Errors.max'),
      //   "range": "${label} must be between ${min}-${max} characters"
    },
    // max: "'${name}' is 123123213!",
  }
  return validateMessages
}
