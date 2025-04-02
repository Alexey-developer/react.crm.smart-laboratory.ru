import React from 'react'

import { Form, Select } from 'antd'
import type { DefaultOptionType } from 'antd/es/select'

import { useTranslation } from 'react-i18next'

import { useAPIQuery } from '@api/useAPIQuery'

import { useSelector } from 'react-redux'
import { selectCurrentFormSetFieldsValue } from '@redux/CurrentForm/selectors'

import { CheckboxFilterType } from '@components/Filter/CheckboxFilter'

import { getCheckboxFilterType } from '@utils/getCheckboxFilterType'
import { getMethod } from '@utils/getMethod'

import './index.module.scss'

type CustomSimpleSelectProps = {
  type: CheckboxFilterType
  //   onChange: (value: number) => void
  name: string
  defaultValue?: number
}

export const CustomSimpleSelect: React.FC<CustomSimpleSelectProps> = ({
  type,
  //   onChange,
  name,
  defaultValue,
}) => {
  const [translated_phrase] = useTranslation('global')
  const setFieldsValue = useSelector(selectCurrentFormSetFieldsValue)
  const options: DefaultOptionType[] = []

  const { data, isLoading } = useAPIQuery(
    getCheckboxFilterType(type).group,
    getMethod('INDEX')
  )

  data?.map((selectOption: { lang_code: string; id: number }) => {
    options.push({
      //   label: <span>{translated_phrase(selectOption.lang_code)}</span>,
      label: translated_phrase(selectOption.lang_code),
      value: selectOption.id,
      //   key: selectOption.lang_code,
    })
  })

  return (
    // <Form.Item name={type} noStyle>
    <Select
      showSearch
      defaultValue={defaultValue ?? 1}
      disabled={isLoading}
      options={options}
      //   allowClear
      filterOption={(inputValue, option) => {
        const optionLabel = option?.label as string
        return optionLabel.toLowerCase().includes(inputValue.toLowerCase())
      }}
      //   onChange={onChange}
      onChange={(value: number) => {
        setFieldsValue ? setFieldsValue({ [name]: value }) : false
      }}
    />
    // </Form.Item>
  )
}
