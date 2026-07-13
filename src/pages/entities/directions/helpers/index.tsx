import { Input, InputNumber, DatePicker } from 'antd'

const { TextArea } = Input
import type { FormItem } from '@components/CustomForm'
import { CustomSimpleSelect } from '@components/CustomSimpleSelect'
import { CustomSelect } from '@components/CustomSelect'
import { EditableTextarea } from '@components/EditableTextarea'

import { getIcon } from '@utils/getIcon'
import { constants } from '@utils/constants/constants.json'

export const getFormItems = (defaultValue: number[]) => {
  const formItems: FormItem[] = [
    {
      name: 'project_id',
      rules: [{ required: true }],
      component: <CustomSelect type='PROJECT' name='project_id' />,
    },
    {
      name: 'status_id',
      rules: [{ required: true }],
      component: (
        <CustomSimpleSelect
          type='DIRECTION_STATUS'
          name='status_id'
          defaultValue={defaultValue[0]}
        />
      ),
    },
    {
      name: 'direction_family_id',
      rules: [{ required: true }],
      component: (
        <CustomSimpleSelect
          type='DIRECTION_FAMILY'
          name='direction_family_id'
          defaultValue={defaultValue[1]}
        />
      ),
    },
    {
      name: 'direction_type_id',
      rules: [{ required: true }],
      component: (
        <CustomSimpleSelect
          type='DIRECTION_TYPE'
          name='direction_type_id'
          defaultValue={defaultValue[2]}
        />
      ),
    },
    {
      name: 'payment_model_id',
      rules: [{ required: true }],
      component: (
        <CustomSimpleSelect
          type='PAYMENT_MODEL'
          name='payment_model_id'
          defaultValue={defaultValue[3]}
        />
      ),
    },
    {
      name: 'payment_period_id',
      rules: [],
      component: (
        <CustomSimpleSelect
          type='PAYMENT_PERIOD'
          name='payment_period_id'
          defaultValue={defaultValue[4]}
        />
      ),
    },
    {
      name: 'payment_period_interval_days',
      rules: [{ type: 'number', min: 1 }],
      component: <InputNumber min={1} style={{ width: '100%' }} />,
    },
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
      name: 'comment',
      rules: [{ max: constants.MAX_TEXT_INPUT_LENGTH }],
      component: <EditableTextarea name='comment' />,
    },
    {
      name: 'customer_visible_comment',
      rules: [{ max: constants.MAX_TEXT_INPUT_LENGTH }],
      component: <TextArea maxLength={constants.MAX_TEXT_INPUT_LENGTH} />,
    },
    {
      name: 'contract_amount',
      rules: [],
      component: <InputNumber min={0} style={{ width: '100%' }} />,
    },
    {
      name: 'billing_anchor_date',
      rules: [],
      component: <DatePicker style={{ width: '100%' }} />,
    },
  ]

  return formItems
}

export const getIconType = () => 'DIRECTIONS'
