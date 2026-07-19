import { Input, Form, Checkbox } from 'antd'

import type { FormItem } from '@components/CustomForm'
import { CustomSelect } from '@components/CustomSelect'

import { getIcon } from '@utils/getIcon'

export const getFormItems = () => {
  const formItems: FormItem[] = [
    {
      name: 'worker_profile_id',
      rules: [{ required: true }],
      component: (
        <CustomSelect type='WORKER_PROFILE' name='worker_profile_id' />
      ),
    },
    {
      name: 'vox_username',
      rules: [{ required: true }, { max: 100 }],
      component: (
        <Input
          maxLength={100}
          addonBefore={<i className={getIcon('PHONE')}></i>}
        />
      ),
    },
    {
      name: 'softphone_enabled',
      rules: [],
      component: (
        <Form.Item name='softphone_enabled' valuePropName='checked' noStyle>
          <Checkbox />
        </Form.Item>
      ),
    },
    {
      name: 'mobile_dialer_enabled',
      rules: [],
      component: (
        <Form.Item
          name='mobile_dialer_enabled'
          valuePropName='checked'
          noStyle
        >
          <Checkbox />
        </Form.Item>
      ),
    },
    {
      name: 'is_active',
      rules: [],
      component: (
        <Form.Item name='is_active' valuePropName='checked' noStyle>
          <Checkbox />
        </Form.Item>
      ),
    },
  ]

  return formItems
}

export const getIconType = () => 'OPERATOR_PROFILES'
