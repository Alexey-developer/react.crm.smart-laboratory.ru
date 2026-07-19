import { Input, Form, Checkbox, Select } from 'antd'

import { useTranslation } from 'react-i18next'

import type { FormItem } from '@components/CustomForm'
import { PhoneInput } from '@components/PhoneInput'

import { constants } from '@utils/constants/constants.json'

const INBOUND_MODES = ['full', 'fast'] as const

const InboundModeSelect: React.FC = () => {
  const [translated_phrase] = useTranslation('global')

  return (
    <Select
      options={INBOUND_MODES.map(mode => ({
        value: mode,
        label: translated_phrase(`Types.CompanyDialNumber.${mode}`),
      }))}
    />
  )
}

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
      name: 'label',
      rules: [{ max: constants.MAX_REFERENCE_INPUT_LENGTH }],
      component: <Input maxLength={constants.MAX_REFERENCE_INPUT_LENGTH} />,
    },
    {
      name: 'inbound_mode',
      rules: [{ required: true }],
      component: (
        <Form.Item name='inbound_mode' noStyle>
          <InboundModeSelect />
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

export const getIconType = () => 'COMPANY_DIAL_NUMBERS'
