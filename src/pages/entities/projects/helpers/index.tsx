import { Input, Checkbox } from 'antd'

const { TextArea } = Input

import type { FormItem } from '@components/CustomForm'
import { CustomSimpleSelect } from '@components/CustomSimpleSelect'

import { getIcon } from '@utils/getIcon'
import { constants } from '@utils/constants/constants.json'
import { CustomSelect } from '@components/CustomSelect'
import { EditableTextarea } from '@components/EditableTextarea'

export const getFormItems = (
  defaultValue: number[] /*, form: FormInstance*/
) => {
  const formItems: FormItem[] = [
    {
      name: 'status_id',
      rules: [{ required: true }],
      component: (
        <CustomSimpleSelect
          type='PROJECT_STATUS'
          name='status_id'
          defaultValue={defaultValue[0]}
        />
      ),
    },
    {
      name: 'type_id',
      rules: [{ required: true }],
      component: (
        <CustomSimpleSelect
          type='PROJECT_TYPE'
          name='type_id'
          defaultValue={defaultValue[1]}
          //   mode='multiple'
        />
      ),
    },
    {
      name: 'customer_company_id',
      rules: [{ required: true }],
      component: (
        <CustomSelect type='CUSTOMER_COMPANY' name='customer_company_id' />
      ),
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
      name: 'website_url',
      rules: [{ type: 'url' }],
      component: (
        <Input
          maxLength={constants.MAX_STRING_INPUT_LENGTH}
          addonBefore={<i className={getIcon('PASSWORD')}></i>}
        />
      ),
    },
    {
      name: 'comment',
      rules: [{ max: constants.MAX_TEXT_INPUT_LENGTH }],
      //   component: <TextArea maxLength={constants.MAX_TEXT_INPUT_LENGTH} />,
      component: <EditableTextarea name='comment' />,
    },
    {
      name: 'customer_visible_comment',
      rules: [{ max: constants.MAX_TEXT_INPUT_LENGTH }],
      component: <TextArea maxLength={constants.MAX_TEXT_INPUT_LENGTH} />,
    },
    {
      name: 'check_performance',
      rules: [],
      component: <Checkbox></Checkbox>,
    },
    {
      name: 'check_expirations',
      rules: [],
      component: <Checkbox></Checkbox>,
    },
  ]

  return formItems
}

export const getIconType = () => 'PROJECTS'
