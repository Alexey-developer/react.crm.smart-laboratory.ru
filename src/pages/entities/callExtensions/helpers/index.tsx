import { Input, Form, Checkbox, Select } from 'antd'

import { useTranslation } from 'react-i18next'

import type { FormItem } from '@components/CustomForm'
import { CustomSelect } from '@components/CustomSelect'

import type { TCallExtensionTargetType } from '@api/models/callExtension/type/TCallExtension'

import { getIcon } from '@utils/getIcon'

const TARGET_TYPES: TCallExtensionTargetType[] = ['crm_user', 'pstn']

const TargetTypeSelect: React.FC = () => {
  const [translated_phrase] = useTranslation('global')

  return (
    <Select
      options={TARGET_TYPES.map(type => ({
        value: type,
        label: translated_phrase(`Types.CallExtension.${type}`),
      }))}
    />
  )
}

const OperatorProfileSelect: React.FC = () => {
  const targetType = Form.useWatch('target_type') as
    | TCallExtensionTargetType
    | undefined

  if (targetType === 'pstn') {
    return null
  }

  return <CustomSelect type='OPERATOR_PROFILE' name='operator_profile_id' />
}

const PhoneNumberSelect: React.FC = () => {
  const targetType = Form.useWatch('target_type') as
    | TCallExtensionTargetType
    | undefined

  if (targetType !== 'pstn') {
    return null
  }

  return <CustomSelect type='PHONE_NUMBER' name='phone_number_id' />
}

export const getFormItems = () => {
  const formItems: FormItem[] = [
    {
      name: 'code',
      rules: [{ required: true }, { max: 10 }],
      component: (
        <Input
          maxLength={10}
          addonBefore={<i className={getIcon('ID')}></i>}
        />
      ),
    },
    {
      name: 'target_type',
      rules: [{ required: true }],
      component: (
        <Form.Item name='target_type' noStyle>
          <TargetTypeSelect />
        </Form.Item>
      ),
    },
    {
      name: 'operator_profile_id',
      rules: [
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (getFieldValue('target_type') !== 'crm_user') {
              return Promise.resolve()
            }

            if (value) {
              return Promise.resolve()
            }

            return Promise.reject(new Error('required'))
          },
        }),
      ],
      component: (
        <Form.Item name='operator_profile_id' noStyle>
          <OperatorProfileSelect />
        </Form.Item>
      ),
    },
    {
      name: 'phone_number_id',
      rules: [
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (getFieldValue('target_type') !== 'pstn') {
              return Promise.resolve()
            }

            if (value) {
              return Promise.resolve()
            }

            return Promise.reject(new Error('required'))
          },
        }),
      ],
      component: (
        <Form.Item name='phone_number_id' noStyle>
          <PhoneNumberSelect />
        </Form.Item>
      ),
    },
    {
      name: 'display_name',
      rules: [{ max: 100 }],
      component: <Input maxLength={100} />,
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

export const getIconType = () => 'CALL_EXTENSIONS'
