import React from 'react'

import { Tag } from 'antd'

import { useTranslation } from 'react-i18next'

import { getIcon } from '@utils/getIcon'
import { convert2string, seconds2Time } from '@utils/helpers'

export type MetaCalculationAttribute = {
  field: string
  value: number | null
  type: 'time' | 'money' | 'common' | 'money_by_currency'
  by_currency?: Array<{
    currency_id: number
    code: string
    symbol: string
    value: number
  }>
}

type MetaCalculationProps = {
  attribute: MetaCalculationAttribute
}

export const MetaCalculation: React.FC<MetaCalculationProps> = ({
  attribute,
}) => {
  const [translated_phrase] = useTranslation('global')

  let value: React.ReactNode
  let icon
  let className

  switch (attribute.type) {
    case 'time':
      value = seconds2Time(attribute.value ?? 0, translated_phrase)
      icon = getIcon('TIME')
      className = 'success transparent'
      break
    case 'money':
      value = convert2string(attribute.value ?? 0, '')
      icon = getIcon('RUBLE')
      className = 'warning transparent'
      break
    case 'money_by_currency':
      value = (attribute.by_currency ?? [])
        .map(row => convert2string(row.value, row.symbol))
        .join(' · ')
      icon = getIcon('RUBLE')
      className = 'warning transparent'
      break
    case 'common':
      value = attribute.value
      icon = getIcon('INFO')
      className = 'success'
      break
  }

  return (
    <Tag className={className} icon={<i className={icon}></i>}>
      {`${translated_phrase(`Form.EntitiesFields.${attribute.field}`)}: ${value}`}
    </Tag>
  )
}
