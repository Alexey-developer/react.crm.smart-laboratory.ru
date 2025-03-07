import React from 'react'

import {
  Space,
  Input,
  type InputRef,
  Flex,
  Popover,
  Button,
  Checkbox,
  type GetProp,
  type CheckboxProps,
  Divider,
} from 'antd'
const { Search } = Input

import { useTranslation } from 'react-i18next'

import {
  setStatesValuesDebounce,
  type States,
  type Values,
} from '@utils/helpers'
import { useReactive } from 'ahooks'
import { AlertCard } from '@components/AlertCard'
import { getIcon } from '@utils/getIcon'

type CustomSearchProps = {
  requestQueryState: { value: string }
  requestQueryFieldsState: { value: string[] }
  isLoading: boolean
  searchAttributes: string[]
}

export const CustomSearch: React.FC<CustomSearchProps> = ({
  requestQueryState,
  requestQueryFieldsState,
  isLoading,
  searchAttributes,
}) => {
  const [translated_phrase] = useTranslation('global')

  const searchRef = React.useRef<InputRef>(null)

  const onSearchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setStatesValuesDebounce([requestQueryState], [value])

    // const reg = /^-?\d*(\.\d*)?$/
    // if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
    //   onChange(inputValue)
    // }
  }
  React.useEffect(() => {
    if (!isLoading && requestQueryState.value) {
      searchRef.current?.focus()
    }
  }, [isLoading])

  const searchCheckboxDefaultValues = searchAttributes
  const searchCheckboxOptions = searchAttributes?.map(attribute => ({
    label: translated_phrase(`Form.EntitiesFields.${attribute}`),
    value: attribute,
  }))

  const checkedListState = useReactive<{
    value: string[]
    got: boolean
  }>({
    value: [],
    got: false,
  })

  React.useEffect(() => {
    if (!searchAttributes || checkedListState.got) {
      return
    }
    checkedListState.value = searchAttributes
    checkedListState.got = true
  }, [searchAttributes])

  const allChecked =
    searchCheckboxOptions?.length === checkedListState.value?.length
  const indeterminate =
    checkedListState.value?.length > 0 &&
    checkedListState.value?.length < searchCheckboxOptions?.length

  const onCheckAllChange: CheckboxProps['onChange'] = async e => {
    const states: States = [requestQueryFieldsState]
    const values: Values = [searchCheckboxDefaultValues]
    if (e.target.checked) {
      checkedListState.value = searchCheckboxDefaultValues
      if (
        searchRef.current?.input?.value &&
        requestQueryState.value != searchRef.current.input.value
      ) {
        states.push(requestQueryState)
        values.push(searchRef.current.input.value)
      }
    } else {
      checkedListState.value = []
      states.push(requestQueryState)
      values.push('')
    }
    setStatesValuesDebounce(states, values)
  }

  const onSearchCheckboxChangeHandler /*: GetProp<
    typeof Checkbox.Group,
    'onChange'
  >*/ = (checkedValues: string[]) => {
    const states: States = [requestQueryFieldsState]
    const values: Values = [checkedValues]
    checkedListState.value = checkedValues
    if (checkedValues.length > 0 && searchRef.current?.input?.value) {
      states.push(requestQueryState)
      values.push(searchRef.current.input.value)
    } else {
      states.push(requestQueryState)
      values.push('')
    }
    setStatesValuesDebounce(states, values)
  }

  return (
    <Space>
      <Search
        placeholder={`${translated_phrase(`Search.self`)}...`}
        ref={searchRef}
        maxLength={50}
        //   loading={true}
        loading={requestQueryState.value !== '' && isLoading}
        disabled={isLoading || checkedListState.value?.length < 1}
        enterButton
        allowClear
        //   onChange={onChangeHandler}
        //   onChange={e => onChangeHandler(e)}
        onChange={onSearchChangeHandler}
        //   onSearch={onSearchHandler}
      />

      <Popover
        title={translated_phrase('Search.title')}
        trigger='click'
        //   open={open}
        placement='bottomRight'
        // onOpenChange={onPopoverOpenChangeHandler}
        content={
          <Space direction='vertical'>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={allChecked}
            >
              {translated_phrase('Search.check_all')}
            </Checkbox>
            {/* <Divider /> */}
            <Checkbox.Group
              //   checked
              // value={checkedList}
              // options={options as CheckboxOptionType[]}
              // onChange={value => {
              //   setCheckedList(value as string[])
              // }}
              value={checkedListState.value}
              // defaultValue={searchCheckboxDefaultValues}
              options={searchCheckboxOptions}
              onChange={onSearchCheckboxChangeHandler}
            />
            {!allChecked && !indeterminate && !isLoading && (
              <AlertCard
                message={`${translated_phrase(
                  `Search.self`
                )} ${translated_phrase(`Search.impossible`)}`}
                //   description={'Поиск осуществляется по всем полям'}
                col={false}
                icon={<i className={getIcon('INFO')}></i>}
                type='warning transparent'
              />
            )}
          </Space>
        }
      >
        <Button
          className={
            'smart-btn ' +
            (checkedListState.value?.length < 1 ? 'danger transparent' : '')
          }
          icon={<i className='fa-solid fa-gear'></i>}
        />
      </Popover>
    </Space>
  )
}

// export const CustomSearchMemo = React.memo(CustomSearch)
