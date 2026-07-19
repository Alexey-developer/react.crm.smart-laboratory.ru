import { InputNumber } from 'antd'

import type { FormItem } from '@components/CustomForm'
import { CustomSelect } from '@components/CustomSelect'

export const getFormItems = () => {
  const formItems: FormItem[] = [
    {
      name: 'user_id',
      rules: [{ required: true }],
      component: <InputNumber min={1} style={{ width: '100%' }} />,
    },
    {
      name: 'utc_offset',
      rules: [{ min: -12 }, { max: 14 }],
      component: <InputNumber min={-12} max={14} style={{ width: '100%' }} />,
    },
    {
      name: 'customer_company_ids',
      rules: [],
      component: (
        <CustomSelect
          type='CUSTOMER_COMPANY'
          name='customer_company_ids'
          mode='multiple'
        />
      ),
    },
    {
      name: 'project_ids',
      rules: [],
      component: (
        <CustomSelect type='PROJECT' name='project_ids' mode='multiple' />
      ),
    },
  ]

  return formItems
}

export const getIconType = () => 'CUSTOMER_PROFILES'
