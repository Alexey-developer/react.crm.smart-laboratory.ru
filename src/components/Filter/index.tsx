import React from 'react'

import {
  Button,
  Popover,
  Space,
  DatePicker,
  Radio,
  InputNumber,
  Form,
} from 'antd'

const { RangePicker } = DatePicker

import dayjs from 'dayjs'

import type { GetProps } from 'antd'
import type { Store } from 'antd/lib/form/interface'
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>

import { useTranslation } from 'react-i18next'

import { useLocation } from 'react-router-dom'

import { useReactive } from 'ahooks'

import { getDateTimeFormat } from '@utils/helpers'
import { getFilter } from '@utils/getFilter'
import { getIcon } from '@utils/getIcon'
import { useGetStateCurrentPageFilters } from '@utils/useGetStateCurrentPageFilters'

import { useDispatch } from 'react-redux'
import { setFilters } from '@redux/Filters/slice'
import type {
  FilterFieldName,
  FilterFieldValue,
  FilterType,
  TFilter,
} from '@redux/Filters/types'

import styles from './index.module.scss'

export type Filters = {
  groupName: string
  filedName: string
  content: React.ReactNode
}[]

type FilterProps = {
  filters: Filters
  isLoading: boolean
  total?: number
}

export const Filter: React.FC<FilterProps> = ({
  filters,
  isLoading,
  total,
}) => {
  const [translated_phrase] = useTranslation('global')
  const dispatch = useDispatch()

  const stateFilters = useGetStateCurrentPageFilters()

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day')
  }

  const constFilters: Filters = [
    {
      groupName: translated_phrase('Filters.id'),
      filedName: 'id',
      content: (
        <InputNumber
          type='number'
          className={styles.test}
          //   parser={value => value!.replace('+', '')}
          //   formatter={value => value!.replace('+', '')}
          //   min={1}
          //   max={10}
          //   defaultValue={0}
          controls={false}
          addonBefore={<i className={getIcon('ID')}></i>}
          placeholder='input search text'
          //   onChange={() => {
          //     console.log(123)
          //   }}
          //   variant='filled'
          //   allowClear
        />
      ),
    },
    {
      groupName: translated_phrase('Filters.created_at'),
      filedName: 'created_at',
      content: (
        <RangePicker
          format={getDateTimeFormat()}
          showTime={{ format: 'HH:mm' }}
          disabledDate={disabledDate}
        />
      ),
    },
    {
      groupName: translated_phrase('Filters.Deleted.self'),
      filedName: 'deleted',
      content: (
        <Radio.Group>
          <Space direction='vertical'>
            <Radio value={'only_existing'}>
              {translated_phrase('Filters.Deleted.only_existing')}
            </Radio>
            <Radio value={'only_deleted'}>
              {/* <i className='fa-regular fa-table-list'></i>{' '} */}
              {translated_phrase('Filters.Deleted.only_deleted')}
            </Radio>
            <Radio value={'all'}>
              {translated_phrase('Filters.Deleted.all')}
            </Radio>
          </Space>
        </Radio.Group>
      ),
    },
  ]

  filters = filters.concat(constFilters)

  //
  const location = useLocation()
  const { pathname } = location

  const [form] = Form.useForm()
  const values = Form.useWatch([], form)

  const state = useReactive<{
    initialValues: Store
    filterPopoverIsOpened: boolean
    filterValueChanged: boolean
    firstEachFilterOpen: boolean //#1
  }>({
    initialValues: stateFilters,
    filterPopoverIsOpened: false,
    filterValueChanged: false,
    firstEachFilterOpen: true, //#1
  })

  const clearFilters = async () => {
    state.initialValues = { deleted: 'only_existing' }
    state.filterValueChanged = true

    await new Promise(resolve =>
      setTimeout(() => {
        resolve
        form.resetFields()
      }, 10)
    )
  }

  //   useEffect(() => {
  //     stateFilters?.map(stateFilter => {
  //       state.initialValues[stateFilter['filedName']] = stateFilter['filedValue']
  //     })
  //   }, [stateFilters])

  const onPopoverOpenChangeHandler = async (isOpened: boolean) => {
    //#1
    if (state.firstEachFilterOpen) {
      await new Promise(resolve =>
        setTimeout(() => {
          resolve
          state.firstEachFilterOpen = false
        }, 1)
      )
    }

    if (isOpened) return
    if (values && Object.entries(values).length) {
      const filters: TFilter[] = []
      console.log('values: ', values)

      for (const [key, value] of Object.entries(values)) {
        if (key === getFilter('CREATED_AT') || value === undefined) {
          //   console.log('==========')
          //   console.log('continue')
          //   console.log(key)
          //   console.log(value)

          continue
        }
        filters.push({
          filedName: key as FilterFieldName,
          filedValue: value as FilterFieldValue,
        })
      }
      if (state.filterValueChanged) {
        state.filterValueChanged = false
        setFiltersAfterChange(filters)
      }
    }
  }
  const setFiltersAfterChange = (filters: TFilter[]) => {
    // console.log(1, state.initialValues)
    // console.log(2, filters)

    dispatch(
      setFilters({
        pageKey: pathname.slice(1) as FilterType,
        filters: filters,
      })
    )
  }

  const isFilterUsed = (filedName: string): string => {
    if (stateFilters[filedName]) {
      if (Array.isArray(stateFilters[filedName])) {
        if (stateFilters[filedName].length > 0) {
          return ''
        }
      } else {
        return ''
      }
    }
    return 'transparent'
  }

  return (
    <Popover
      //   title='Title'
      trigger='click'
      //   open={open}
      placement='bottomLeft'
      onOpenChange={onPopoverOpenChangeHandler}
      content={
        <Form
          form={form}
          name='filters'
          autoComplete='off'
          disabled={isLoading}
          //   onFieldsChange
          onValuesChange={() => (state.filterValueChanged = true)}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}

          //   size='large'
          initialValues={state.initialValues}
        >
          <Space direction='vertical'>
            {filters.map((filter, index) => (
              <Popover
                open={
                  //#1
                  state.firstEachFilterOpen
                    ? state.firstEachFilterOpen
                    : undefined
                }
                key={index}
                content={
                  <Form.Item
                    key={index}
                    noStyle
                    // label={translated_phrase(`Form.${formItem.name}`)}
                    //   label={'test'}
                    name={filter.filedName}
                    //   rules={formItem.rules}
                    hasFeedback
                    validateStatus={isLoading ? 'validating' : undefined}
                  >
                    {filter.content}
                  </Form.Item>
                }
                trigger='click'
                placement='right'
              >
                <Button
                  className={`smart-btn ${isFilterUsed(filter.filedName)} ${
                    styles.btn
                  }`}
                >
                  {filter.groupName}
                  <span className='ant-btn-icon'>
                    <i className='fa-solid fa-arrow-right-long'></i>
                  </span>
                </Button>
              </Popover>
            ))}
            <Button
              className='smart-btn success transparent'
              icon={<i className={getIcon('SUCCESS')}></i>}
              onClick={() => onPopoverOpenChangeHandler(false)}
            >
              {translated_phrase('Filters.apply')}
            </Button>
            <Button
              className='smart-btn danger transparent'
              icon={<i className={getIcon('DELETE')}></i>}
              onClick={() => clearFilters()}
            >
              {translated_phrase('Filters.clear')}
            </Button>
          </Space>
        </Form>
      }
    >
      <Button
        className='smart-btn'
        icon={<i className='fa-solid fa-filter-list'></i>}
      >
        {`${translated_phrase('Filters.self')}${
          total !== undefined
            ? ` - (${total}) ${translated_phrase('Items.short_pieces')}`
            : ''
        }`}
      </Button>
    </Popover>
  )
}

//#1
//console.log(values) = empty без первой отрисовки всех Popover и не работает очистка, если ещё не открывали Popover
