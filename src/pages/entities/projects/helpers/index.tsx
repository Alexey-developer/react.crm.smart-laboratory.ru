import { Input } from 'antd'

const { TextArea } = Input

import type { FormItem } from '@components/CustomForm'
import { CustomSelect } from '@components/CustomSelect'

import { getIcon } from '@utils/getIcon'
import { constants } from '@utils/constants/constants.json'

export const getFormItems = () => {
  const formItems: FormItem[] = [
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
  ]

  return formItems
}

export const getIconType = () => 'PROJECTS'
