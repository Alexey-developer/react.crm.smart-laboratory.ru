import { Input, Checkbox } from 'antd'
const { TextArea } = Input

import type { FormItem } from '@components/CustomForm'

import { getIcon } from '@utils/getIcon'
import { constants } from '@utils/constants/constants.json'

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
      rules: [],
      component: <TextArea maxLength={constants.MAX_TEXT_INPUT_LENGTH} />,
    },
    {
      name: 'website_url',
      rules: [{ required: true }], //URL
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
