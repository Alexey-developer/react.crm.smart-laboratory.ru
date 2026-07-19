import { Input, Select, Form, Checkbox } from 'antd'

import { useTranslation } from 'react-i18next'

import type { FormItem } from '@components/CustomForm'
import { CustomSelect } from '@components/CustomSelect'
import { PhoneInput } from '@components/PhoneInput'

import type { TPhoneableType } from '@api/models/phoneNumber/type/TPhoneNumber'

import { constants } from '@utils/constants/constants.json'

const PHONEABLE_TYPES: TPhoneableType[] = [
  'customer_company',
  'customer_profile',
  'worker_profile',
]

const PhoneableTypeSelect: React.FC = () => {
  const [translated_phrase] = useTranslation('global')

  return (
    <Select
      options={PHONEABLE_TYPES.map(type => ({
        value: type,
        label: translated_phrase(`Types.PhoneNumber.${type}`),
      }))}
    />
  )
}

const PhoneableIdSelect: React.FC = () => {
  const phoneableType = Form.useWatch('phoneable_type') as
    | TPhoneableType
    | undefined

  if (phoneableType === 'customer_profile') {
    return <CustomSelect type='CUSTOMER_PROFILE' name='phoneable_id' />
  }

  if (phoneableType === 'worker_profile') {
    return <CustomSelect type='WORKER_PROFILE' name='phoneable_id' />
  }

  return <CustomSelect type='CUSTOMER_COMPANY' name='phoneable_id' />
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
      name: 'phoneable_type',
      rules: [{ required: true }],
      component: (
        <Form.Item name='phoneable_type' noStyle>
          <PhoneableTypeSelect />
        </Form.Item>
      ),
    },
    {
      name: 'phoneable_id',
      rules: [{ required: true }],
      component: (
        <Form.Item name='phoneable_id' noStyle>
          <PhoneableIdSelect />
        </Form.Item>
      ),
    },
    {
      name: 'customer_company_id',
      rules: [],
      component: (
        <CustomSelect type='CUSTOMER_COMPANY' name='customer_company_id' />
      ),
    },
    {
      name: 'is_primary',
      rules: [],
      component: (
        <Form.Item name='is_primary' valuePropName='checked' noStyle>
          <Checkbox />
        </Form.Item>
      ),
    },
  ]

  return formItems
}

export const getIconType = () => 'PHONE_NUMBERS'
