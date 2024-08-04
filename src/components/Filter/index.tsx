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
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>

import styles from './index.module.scss'

import { useTranslation } from 'react-i18next'

import { getDateTimeFormat } from '@utils/helpers'
import { getIcon } from '@utils/getIcon'

type Filters = { groupName: string; content: React.ReactNode }[]

type FilterProps = {
  filters: Filters
}

export const Filter: React.FC<FilterProps> = ({ filters }) => {
  const [translated_phrase] = useTranslation('global')

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day')
  }

  const constFilters: Filters = [
    {
      groupName: translated_phrase('Filters.id'),
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
      content: (
        <Radio.Group defaultValue={1}>
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

  React.useEffect(() => {
    console.log(1, values)
  }, [form, values])

  return (
    <Popover
      content={
        // <>
        <Form
          form={form}
          name='filters'
          //   onFieldsChange
          //   onValuesChange

          //   layout='horizontal'
          //   initialValues={initialValues}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          //   autoComplete='off'

          //   size='large'
          //   scrollToFirstError
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          //   style={{ maxWidth: 600 }}
          // initialValues={{ remember: true }}
        >
          <Space direction='vertical'>
            {filters.map((filter, index) => (
              <Popover
                key={index}
                content={
                  <Form.Item /*<FieldType>*/
                    //   hasFeedback
                    //   validateStatus={isPending ? 'validating' : undefined}
                    key={index}
                    noStyle
                    // label={translated_phrase(`Form.${formItem.name}`)}
                    //   label={'test'}
                    name={`name-${index}`}
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
