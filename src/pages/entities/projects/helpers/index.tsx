import { Input, Checkbox } from 'antd'
import type { FormInstance } from 'antd/lib'
const { TextArea } = Input

import type { FormItem } from '@components/CustomForm'
import { CustomSimpleSelect } from '@components/CustomSelect'

import { getIcon } from '@utils/getIcon'
import { constants } from '@utils/constants/constants.json'

export const getFormItems = (
  defaultValue: number[] /*, form: FormInstance*/
) => {
  const formItems: FormItem[] = [
    {
      name: 'status_id',
      rules: [
        // { required: true }
      ],
      component: (
        <CustomSimpleSelect
          type='PROJECT_STATUS'
          name='status_id'
          //   onChange={(value: number) => {
          //     form.setFieldsValue({ status_id: value })
          //   }}
          defaultValue={defaultValue[0]}
        />
      ),
    },
    {
      name: 'type_id',
      rules: [
        // { required: true }
      ],
      component: (
        <CustomSimpleSelect
          type='PROJECT_TYPE'
          name='type_id'
          //   onChange={(value: number) => {
          //     form.setFieldsValue({ type_id: value })
          //   }}
          defaultValue={defaultValue[1]}
        />
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
      rules: [],
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
      rules: [],
      component: <TextArea maxLength={constants.MAX_TEXT_INPUT_LENGTH} />,
    },
    {
      name: 'customer_visible_comment',
      rules: [],
      component: <TextArea maxLength={constants.MAX_TEXT_INPUT_LENGTH} />,
    },
    {
      name: 'check_performance',
      rules: [],
      component: <Checkbox>check_performance</Checkbox>,
    },
    {
      name: 'check_expirations',
      rules: [],
      component: <Checkbox>check_expirations</Checkbox>,
    },
  ]

  return formItems
}

export const getIconType = () => 'PROJECTS'
