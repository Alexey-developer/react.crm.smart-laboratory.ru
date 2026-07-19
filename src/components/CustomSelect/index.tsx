import React from 'react'
import { Form, Select, Spin } from 'antd'

import { useReactive } from 'ahooks'

import debounce from 'lodash.debounce'

import { useAPIQuery } from '@api/useAPIQuery'

import {
  SelectFilterTypeEnum,
  getSelectFilterType,
} from '@utils/getSelectFilterType'
import { getMethod } from '@utils/getMethod'
import { constants } from '@utils/constants/constants.json'
import { formatE164Display } from '@utils/phoneE164'

type SelectOptionSource = {
  id: number
  name?: string
  e164?: string
  label?: string | null
  vox_username?: string
  start_at?: string
  end_at?: string
  user?: { name?: string }
  worker_profile?: { user?: { name?: string } }
}

const getSelectOptionLabel = (
  select: SelectOptionSource,
  type: keyof typeof SelectFilterTypeEnum
) => {
  if (type === 'WORKER_PROFILE') {
    const workerName = select.user?.name ?? ''
    return `${select.id} ${workerName}`.trim()
  }

  if (type === 'OPERATOR_PROFILE') {
    const operatorName = select.worker_profile?.user?.name ?? ''
    const vox = select.vox_username ? ` (${select.vox_username})` : ''
    return `${select.id} ${operatorName}${vox}`.trim()
  }

  if (type === 'PHONE_NUMBER') {
    const phoneLabel = select.label ? ` (${select.label})` : ''
    const e164 = select.e164 ? formatE164Display(select.e164) : ''
    return `${select.id} ${e164}${phoneLabel}`.trim()
  }

  if (type === 'CUSTOMER_PROFILE') {
    const profileName = select.user?.name ?? ''
    return `${select.id} ${profileName}`.trim()
  }

  if (type === 'WORK_TIME_RANGE') {
    const workerName = select.worker_profile?.user?.name ?? ''
    const range =
      select.start_at && select.end_at
        ? `${select.start_at} — ${select.end_at}`
        : ''
    return `${select.id} ${workerName} ${range}`.trim()
  }

  return `${select.id} ${select.name ?? ''}`.trim()
}

type CustomSelectProps = {
  type: keyof typeof SelectFilterTypeEnum
  mode?: 'multiple'
  name?: string
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  type,
  mode,
  name,
}) => {
  const state = useReactive<{
    requestPage: number
    options: { label: string; value: number }[]
    optionsPage: number
    searchedOptions: { label: string; value: number }[]
    searchedOptionsPage: number
    searchValue: string
    isRequesting: boolean
  }>({
    requestPage: 1,
    options: [],
    optionsPage: 2,
    searchedOptions: [],
    searchedOptionsPage: 1,
    searchValue: '',
    isRequesting: false,
  })
  const { data, isLoading, isFetching, refetch } = useAPIQuery(
    getSelectFilterType(type).group,
    getMethod('INDEX'),
    { page: state.requestPage, query: state.searchValue }
  )

  React.useEffect(() => {
    //   console.log(data)
    if (!data?.data) {
      return
    }
    if (state.searchValue) {
      state.searchedOptions = [
        ...state.searchedOptions,
        ...data.data.map((select: SelectOptionSource) => {
          return {
            value: select.id,
            label: getSelectOptionLabel(select, type),
          }
        }),
      ]
    } else {
      state.options = [
        ...state.options,
        ...data.data.map((select: SelectOptionSource) => {
          return {
            value: select.id,
            label: getSelectOptionLabel(select, type),
          }
        }),
      ]
    }
  }, [data])

  const onPopupScrollHandler = async (
    event: React.UIEvent<HTMLDivElement, UIEvent>
  ) => {
    if (!data) return
    state.requestPage = state.searchValue
      ? state.searchedOptionsPage /* + 1*/
      : state.optionsPage
    if (
      ((event.currentTarget.scrollTop + event.currentTarget.clientHeight) /
        event.currentTarget.scrollHeight) *
        100 >
        80 &&
      state.requestPage <= data.meta.last_page
    ) {
      if (state.isRequesting || isLoading || isFetching) return

      //   state.currentPage++
      if (state.searchValue) state.searchedOptionsPage++
      else state.optionsPage++

      state.isRequesting = true
      //   state.requestPage = state.currentPage
      //   event.currentTarget.

      await new Promise(resolve =>
        setTimeout(() => {
          resolve
          refetch()
          state.isRequesting = false
        }, 1)
      )
    }
  }

  const setQuery = React.useCallback(
    debounce((value: string) => {
      state.requestPage = state.searchedOptionsPage = 1
      state.searchedOptions = []
      state.searchValue = value
    }, constants.SEARCH_TIMEOUT),
    []
  )

  React.useEffect(() => {
    refetch()
  }, [state.searchValue])

  const onSearchHandler = async (event: string) => {
    if (isLoading || isFetching) return
    setQuery(event)
  }

  return (
    <Form.Item name={name ?? getSelectFilterType(type).type} noStyle>
      <Select
        mode={mode}
        //   value={1}
        loading={isLoading || isFetching}
        showSearch
        filterOption={false}
        onPopupScroll={event => onPopupScrollHandler(event)}
        //   placeholder=''
        dropdownRender={originNode => (
          <Spin spinning={isLoading || isFetching}>{originNode}</Spin>
        )}
        onSearch={event => onSearchHandler(event)}
        allowClear
        onClear={() => (state.searchValue = '')}
        options={state.searchValue ? state.searchedOptions : state.options}
      />
    </Form.Item>
  )
}
