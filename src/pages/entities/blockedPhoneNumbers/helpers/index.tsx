import { Input, Form, Checkbox } from 'antd'

import type { FormItem } from '@components/CustomForm'
import { PhoneInput } from '@components/PhoneInput'

export const getFormItems = () => {
  const formItems: FormItem[] = [
    {
      name: 'e164',
      rules: [
        { required: true },
        { pattern: /^\+[1-9]\d{7,14}$/ },
      ],
      component: <PhoneInput mode='e164' />,
    },
    {
      name: 'comment',
      rules: [{ max: 65535 }],
      component: <Input.TextArea rows={3} />,
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

export const getIconType = () => 'BLOCKED_PHONE_NUMBERS'
