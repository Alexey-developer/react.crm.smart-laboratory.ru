import React, { useEffect } from 'react'

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

import styles from './index.module.scss'

import { useTranslation } from 'react-i18next'

import { useLocation } from 'react-router-dom'

import { getDateTimeFormat } from '@utils/helpers'
import { getIcon } from '@utils/getIcon'

import { useDispatch, useSelector } from 'react-redux'
import { selectFilters } from '@redux/Filters/selectors'
import { setFilters } from '@redux/Filters/slice'
import type {
  FilterFieldName,
  FilterFieldValue,
  FilterType,
  TFilter,
} from '@redux/Filters/types'

type Filters = {
  groupName: string
  filedName: string
  content: React.ReactNode
}[]

type FilterProps = {
  filters: Filters
  isLoading: boolean
}

export const Filter: React.FC<FilterProps> = ({ filters, isLoading }) => {
  const [translated_phrase] = useTranslation('global')
  const dispatch = useDispatch()

  const location = useLocation()
  const { pathname } = location

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day')
  }
  //   console.log(constants.routes.basic.projects)

  //   type FilterType = typeof PROJECTS | 'tasks'
  //   type Filter = {
  //     filedName: 'id' | 'deleted' | 'created_at'
  //     filedValue: string | number
  //   }
  //   const newfilters = new Map<FilterType, Filter[]>()

  //   console.log(111, newfilters)
  //   console.log(16, Object.fromEntries(newfilters))
  //   console.log(17, JSON.stringify(newfilters).replace(':', ' => '))
  //   console.log(18, Object.fromEntries(newfilters).JSON.stringify(newfilters))

  //   const state = useReactive({
  //     str: '',
  //   })

  React.useEffect(() => {
    // newfilters.set('projects', [
    //   { filedName: 'id', filedValue: 4 },
    //   { filedName: 'deleted', filedValue: 2 },
    // ])
    // newfilters.set('tasks', [
    //   { filedName: 'id', filedValue: 51 },
    //   { filedName: 'deleted', filedValue: 1 },
    // ])
    // newfilters.forEach(function (value, key) {
    //   state.str += `${key}::${JSON.stringify(value)}|`
    //   console.log('test4', state.str)
    //   // console.log(
    //   //   151,
    //   //   Object.keys(value)
    //   //     .map(x => {
    //   //       return value[x]
    //   //     })
    //   //     .join(',')
    //   // )
    // })
    // for (const entry of newfilters) {
    //   // то же самое, что и recipeMap.entries()
    //   //   alert() // огурец,500 (и так далее)
    //   console.log(555, entry[1])
    //   // огурец,500 (и так далее)
    // }
    // const str =
    //   'projects::[{"filedName":"id","filedValue":4},{"filedName":"deleted","filedValue":2}]|tasks::[{"filedName":"id","filedValue":51},{"filedName":"deleted","filedValue":1}]'
    // console.log('111-1', newfilters)
    // console.log('222-2', str)
    // console.log('333-3', getMapFromString(str))
    // console.log('444-4', getStringFromMap(newfilters))
  }, [])

  //   console.log(str)
  //   const split = str.split('|')
  //   const pr = split[0]?.split('::')
  //   console.log(split)
  //   console.log(pr)
  //   console.log(JSON.parse(pr[1]))

  //   React.useEffect(() => {
  //     console.log(222, str)
  //   }, [str])

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
      groupName: translated_phrase('Filters.Deleted.self'),
      filedName: 'deleted',
      content: (
        <Radio.Group>
          <Space direction='vertical'>
            <Radio value={1}>
              {translated_phrase('Filters.Deleted.only_existing')}
            </Radio>
            <Radio value={2}>
              {/* <i className='fa-regular fa-table-list'></i>{' '} */}
              {translated_phrase('Filters.Deleted.only_deleted')}
            </Radio>
          </Space>
        </Radio.Group>
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
  ]

  filters = filters.concat(constFilters)

  //
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const stateFilters = useSelector(selectFilters)?.get(
    pathname.slice(1) as FilterType
  )

  const initialValues: Store = { deleted: 1 }
  useEffect(() => {
    console.log(stateFilters)

    stateFilters?.map(stateFilter => {
      //   console.log(`filedName: ${stateFilter['filedName']}`)
      //   console.log(`value: ${stateFilter['filedValue']}`)
      //   initialValues = {stateFilter['filedName']: stateFilter['filedValue']}
      //   initialValues[stateFilter['filedName']] = stateFilter['filedValue']
      //   initialValues = stateFilter['filedName']
      initialValues[stateFilter['filedName']] = stateFilter['filedValue']
    })
    // console.log(777, initialValues)
  }, [stateFilters])

  React.useEffect(() => {
    console.log('11-1', values)

    if (values && Object.entries(values).length) {
      //   console.log(Object.entries(values))
      const filters: TFilter[] = []
      for (const [key, value] of Object.entries(values)) {
        // console.log(key, value)
        filters.push({
          filedName: key as FilterFieldName,
          filedValue: value as FilterFieldValue,
        })
      }
      dispatch(
        setFilters({
          pageKey: pathname.slice(1) as FilterType,
          filters: filters,
        })
      )
    }

    // console.log(values['id'])
    // values.map((value, key) => {
    //   console.log(value)
    //   console.log(key)
    // })
    // newfilters.set('projects', [
    //   { filedName: 'id', filedValue: 4 },
    //   { filedName: 'deleted', filedValue: 2 },
    // ])
    // newfilters.set('tasks', [
    //   { filedName: 'id', filedValue: 51 },
    //   { filedName: 'deleted', filedValue: 1 },
    // ])

    // form
    //   .validateFields(['phone'])
    //   .then(e => e && form.getFieldInstance('password').focus())
  }, [values])

  return (
    <Popover
      content={
        // <>
        <Form
          form={form}
          name='filters'
          autoComplete='off'
          disabled={isLoading}
          //   onFieldsChange
          // onValuesChange={()=>{}}

          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}

          //   size='large'
          initialValues={initialValues}
        >
          <Space direction='vertical'>
            {filters.map((filter, index) => (
              <Popover
                key={index}
                content={
                  <Form.Item
                    //   hasFeedback
                    //   validateStatus={isPending ? 'validating' : undefined}
                    key={index}
                    noStyle
                    // label={translated_phrase(`Form.${formItem.name}`)}
                    //   label={'test'}
                    name={filter.filedName}
                    //   rules={formItem.rules}
                  >
                    {filter.content}
                  </Form.Item>
                }
                trigger='click'
                placement='right'
                // arrow
              >
                <Button className={'smart-btn transparent ' + styles.btn}>
                  {filter.groupName}
                  <span className='ant-btn-icon'>
                    <i className='fa-solid fa-arrow-right-long'></i>
                  </span>
                </Button>
              </Popover>
            ))}
            <Button
              className='smart-btn danger transparent'
              icon={<i className={getIcon('DELETE')}></i>}
              onClick={() => form.resetFields()}
            >
              {translated_phrase('Filters.clear')}
            </Button>
          </Space>
        </Form>

        // </>
      }
      //   title='Title'
      trigger='click'
      //   open={open}
      //   onOpenChange={handleOpenChange}
      placement='bottomLeft'
    >
      <Button
        className='smart-btn'
        icon={<i className='fa-solid fa-filter'></i>}
      >
        {translated_phrase('Filters.self')}
      </Button>
    </Popover>
  )
}

// <Button className='smart-btn transparent'>
//   <Space>
//     {filter.groupName}
//     <span className='ant-btn-icon'>
//       <i className='fa-solid fa-arrow-right-long'></i>
//     </span>
//   </Space>
// </Button>
