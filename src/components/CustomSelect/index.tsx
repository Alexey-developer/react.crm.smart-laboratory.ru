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

type CustomSelectProps = {
  type: keyof typeof SelectFilterTypeEnum
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ type }) => {
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
        ...data.data.map((select: { id: number; name: string }) => {
          return { value: select.id, label: `${select.id} ${select.name}` }
        }),
      ]
      console.log('state.searchValue')
    } else {
      state.options = [
        ...state.options,
        ...data.data.map((select: { id: number; name: string }) => {
          return { value: select.id, label: `${select.id} ${select.name}` }
        }),
      ]
      console.log('!state.searchValue')
    }
  }, [data])

  const onPopupScrollHandler = async (
    event: React.UIEvent<HTMLDivElement, UIEvent>
  ) => {
    state.requestPage = state.searchValue
      ? state.searchedOptionsPage /* + 1*/
      : state.optionsPage
    console.log('state.requestPage: ', state.requestPage)
    if (
      ((event.currentTarget.scrollTop + event.currentTarget.clientHeight) /
        event.currentTarget.scrollHeight) *
        100 >
        80 &&
      state.requestPage <= data.meta.last_page
    ) {
      if (state.isRequesting || isLoading || isFetching) return
      console.log(state.requestPage)

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
    <Form.Item name={getSelectFilterType(type).type} noStyle>
      <Select
        mode='multiple'
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
