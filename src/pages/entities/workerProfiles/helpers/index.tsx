import { InputNumber } from 'antd'

import type { FormItem } from '@components/CustomForm'
import { CustomSimpleSelect } from '@components/CustomSimpleSelect'

export const getFormItems = () => {
  const formItems: FormItem[] = [
    {
      name: 'user_id',
      rules: [{ required: true }],
      component: <InputNumber min={1} style={{ width: '100%' }} />,
    },
    {
      name: 'base_rate',
      rules: [{ min: 0 }],
      component: <InputNumber min={0} style={{ width: '100%' }} />,
    },
    {
      name: 'salary_currency_id',
      rules: [{ required: true }],
      component: (
        <CustomSimpleSelect type='CURRENCY' name='salary_currency_id' />
      ),
    },
    {
      name: 'utc_offset',
      rules: [{ min: -12 }, { max: 14 }],
      component: <InputNumber min={-12} max={14} style={{ width: '100%' }} />,
    },
  ]

  return formItems
}

export const getIconType = () => 'WORKER_PROFILES'
