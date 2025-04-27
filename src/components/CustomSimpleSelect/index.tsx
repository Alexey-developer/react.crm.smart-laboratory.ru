import React from 'react'

import { Form, Select } from 'antd'
import type { DefaultOptionType } from 'antd/es/select'

import { useTranslation } from 'react-i18next'

import { useAPIQuery } from '@api/useAPIQuery'

import { CheckboxFilterType } from '@components/Filter/CheckboxFilter'

import { getCheckboxFilterType } from '@utils/getCheckboxFilterType'
import { getMethod } from '@utils/getMethod'

import './index.module.scss'

type CustomSimpleSelectProps = {
  type: CheckboxFilterType
  name: string
  defaultValue?: number
  mode?: 'multiple' | undefined
}

export const CustomSimpleSelect: React.FC<CustomSimpleSelectProps> = ({
  type,
  name,
  defaultValue,
  mode,
}) => {
  const [translated_phrase] = useTranslation('global')
  const options: DefaultOptionType[] = []

  const { data, isLoading } = useAPIQuery(
    getCheckboxFilterType(type).group,
    getMethod('INDEX')
  )

  data?.map((selectOption: { lang_code: string; id: number }) => {
    options.push({
      label: translated_phrase(selectOption.lang_code),
      value: selectOption.id,
      //   key: selectOption.lang_code,
    })
  })

  return (
    <Form.Item name={name} noStyle>
      <Select
        mode={mode}
        showSearch
        defaultValue={defaultValue ?? 1}
        disabled={isLoading}
        options={options}
        //   allowClear
        filterOption={(inputValue, option) => {
          const optionLabel = option?.label as string
          return optionLabel.toLowerCase().includes(inputValue.toLowerCase())
        }}
      />
    </Form.Item>
  )
}
