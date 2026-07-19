import { Input, Select, Form } from 'antd'

const { TextArea } = Input

import { useTranslation } from 'react-i18next'

import type { FormItem } from '@components/CustomForm'
import { CustomSimpleSelect } from '@components/CustomSimpleSelect'

import { getIcon } from '@utils/getIcon'
import { constants } from '@utils/constants/constants.json'

const STATUSES = ['active', 'liquidated', 'reorganized'] as const

const StatusSelect: React.FC = () => {
  const [translated_phrase] = useTranslation('global')

  return (
    <Select
      options={STATUSES.map(status => ({
        value: status,
        label: translated_phrase(`OurCompanyStatuses.${status}`),
      }))}
    />
  )
}

export const getFormItems = () => {
  const formItems: FormItem[] = [
    {
      name: 'name',
      rules: [
        { required: true },
        { min: constants.MIN_STRING_INPUT_LENGTH },
        { max: constants.MAX_STRING_INPUT_LENGTH },
      ],
      component: (
        <Input
          maxLength={constants.MAX_STRING_INPUT_LENGTH}
          addonBefore={<i className={getIcon('PASSWORD')}></i>}
        />
      ),
    },
    {
      name: 'description',
      rules: [{ max: constants.MAX_TEXT_INPUT_LENGTH }],
      component: <TextArea maxLength={constants.MAX_TEXT_INPUT_LENGTH} />,
    },
    {
      name: 'commercial_name',
      rules: [{ max: constants.MAX_STRING_INPUT_LENGTH }],
      component: <Input maxLength={constants.MAX_STRING_INPUT_LENGTH} />,
    },
    {
      name: 'documents_email',
      rules: [{ type: 'email' }, { max: constants.MAX_STRING_INPUT_LENGTH }],
      component: <Input maxLength={constants.MAX_STRING_INPUT_LENGTH} />,
    },
    {
      name: 'status',
      rules: [{ required: true }],
      component: (
        <Form.Item name='status' noStyle>
          <StatusSelect />
        </Form.Item>
      ),
    },
    {
      name: 'INN',
      rules: [{ required: true }, { max: 13 }],
      component: <Input maxLength={13} />,
    },
    {
      name: 'OGRN',
      rules: [{ max: 15 }],
      component: <Input maxLength={15} />,
    },
    {
      name: 'KPP',
      rules: [{ max: 9 }],
      component: <Input maxLength={9} />,
    },
    {
      name: 'bank',
      rules: [{ max: constants.MAX_STRING_INPUT_LENGTH }],
      component: <Input maxLength={constants.MAX_STRING_INPUT_LENGTH} />,
    },
    {
      name: 'checking_account',
      rules: [{ max: 20 }],
      component: <Input maxLength={20} />,
    },
    {
      name: 'correspondent_account',
      rules: [{ max: 20 }],
      component: <Input maxLength={20} />,
    },
    {
      name: 'BIK',
      rules: [{ max: 9 }],
      component: <Input maxLength={9} />,
    },
    {
      name: 'country',
      rules: [{ required: true }, { max: 100 }],
      component: <Input maxLength={100} />,
    },
    {
      name: 'city',
      rules: [{ max: 100 }],
      component: <Input maxLength={100} />,
    },
    {
      name: 'street',
      rules: [{ max: 150 }],
      component: <Input maxLength={150} />,
    },
    {
      name: 'house_number',
      rules: [{ max: 10 }],
      component: <Input maxLength={10} />,
    },
    {
      name: 'office_number',
      rules: [{ max: 10 }],
      component: <Input maxLength={10} />,
    },
    {
      name: 'index',
      rules: [{ max: 10 }],
      component: <Input maxLength={10} />,
    },
    {
      name: 'organizational_legal_form_id',
      rules: [{ required: true }],
      component: (
        <CustomSimpleSelect
          type='ORGANIZATIONAL_LEGAL_FORM'
          name='organizational_legal_form_id'
        />
      ),
    },
    {
      name: 'currency_id',
      rules: [{ required: true }],
      component: <CustomSimpleSelect type='CURRENCY' name='currency_id' />,
    },
  ]

  return formItems
}

export const getIconType = () => 'OUR_COMPANIES'
