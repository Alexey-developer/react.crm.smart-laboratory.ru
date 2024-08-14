import React from 'react'
import { Select, Spin } from 'antd'

import { useTranslation } from 'react-i18next'

import { useReactive } from 'ahooks'

import { useAPIQuery } from '@api/useAPIQuery'

import {
  SelectFilterTypeEnum,
  getSelectFilterType,
} from '@utils/getSelectFilterType'
import { getMethod } from '@utils/getMethod'
import type { Groups } from '@utils/getSelectFilterType'

export const SelectFilter = (type: keyof typeof SelectFilterTypeEnum) => {
  const [translated_phrase] = useTranslation('global')

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

  //   console.log(data)
  //   data

  //   console.log(data)

  //   const options: object[] = []

  //   data?.data?.map(select => {
  //     state.options.push({
  //       value: select.id as number,
  //       label: `${select.id} ${select.name}`,
  //     })
  //   })

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

    // data?.data?.map(select => {
    //   // console.log(select)

    //   state.options.push({
    //     value: select.id,
    //     label: `${select.id} ${select.name}`,
    //   })

    //   //   forceUpdateFunction()
    // })
  }, [data])

  const onPopupScrollHandler = async (
    event: React.UIEvent<HTMLDivElement, UIEvent>
  ) => {
    // console.log('LP: ' + data.meta.last_page)
    // console.log('state.searchValue: ', state.searchValue)
    // console.log(state.options.length)
    // console.log(state.searchedOptions.length)

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

  const onSearchHandler = async (event: string) => {
    if (isLoading || isFetching) return
    state.searchValue = event
    // console.log(state.searchValue)

    state.requestPage = state.searchedOptionsPage = 1
    state.searchedOptions = []
    console.log(state.searchValue)

    await new Promise(resolve =>
      setTimeout(() => {
        resolve
        refetch()
      }, 10)
    )
  }

  return {
    // groupName: translated_phrase('MenuItems.projects').substring(
    //   0,
    //   translated_phrase('MenuItems.projects').length - 1
    // ),
    groupName: translated_phrase(getSelectFilterType(type).lang_code),
    filedName: getSelectFilterType(type).type,
    content: (
      <Select
        mode='multiple'
        //   value={1}
        //   labelInValue
        loading={isLoading || isFetching}
        showSearch
        filterOption={false}
        onPopupScroll={event => onPopupScrollHandler(event)}
        //   placeholder=''
        dropdownRender={originNode => (
          <Spin spinning={isLoading || isFetching}>{originNode}</Spin>
        )}
        onSearch={event => onSearchHandler(event)}
        // optionFilterProp='children'
        // onChange={onChange}
        allowClear
        onClear={() => (state.searchValue = '')}
        options={state.searchValue ? state.searchedOptions : state.options}
      />
    ),
  }
}
