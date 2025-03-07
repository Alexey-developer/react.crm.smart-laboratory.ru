import React from 'react'

import { Radio, type RadioChangeEvent, Select } from 'antd'

import { useTranslation } from 'react-i18next'

// import styles from './index.module.scss'

export type SortDirection = 'asc' | 'desc'
export type RequestSortState = {
  sortByFiledName: string //keyof typeof FilterEnum
  sortDirection: SortDirection
}
type SortProps = {
  requestSortState: RequestSortState
  isLoading: boolean
  sortAttributes: string[]
}

export const Sort: React.FC<SortProps> = ({
  requestSortState,
  isLoading,
  sortAttributes,
}) => {
  const [translated_phrase] = useTranslation('global')

  const defaultSortAttributeOptions = [
    { label: translated_phrase(`Filters.id`), value: 'id' },
  ]

  const sortAttributeOptions = defaultSortAttributeOptions.concat(
    sortAttributes
      ? sortAttributes.map(attribute => ({
          label: translated_phrase(`Form.EntitiesFields.${attribute}`),
          value: attribute,
        }))
      : []
  )

  const onSelectChangeHandler = (value: string) => {
    requestSortState.sortByFiledName = value
  }
  const onRadioChangeHandler = (e: RadioChangeEvent) => {
    requestSortState.sortDirection = e.target.value
  }

  return (
    <>
      <Select
        // loading={isLoading}
        disabled={isLoading}
        defaultValue={requestSortState.sortByFiledName}
        // style={{ width: '200px' }}
        options={sortAttributeOptions}
        onChange={onSelectChangeHandler}
      />
      <Radio.Group
        disabled={isLoading}
        defaultValue={requestSortState.sortDirection}
        onChange={onRadioChangeHandler}
      >
        <Radio.Button value='asc'>
          <i className='fa-solid fa-arrow-up-wide-short'></i>
        </Radio.Button>
        <Radio.Button value='desc'>
          <i className='fa-solid fa-arrow-down-wide-short'></i>
        </Radio.Button>
      </Radio.Group>
    </>
  )
}
