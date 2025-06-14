import { Checkbox } from 'antd'
import type { CheckboxOptionType, TableColumnsType } from 'antd'

import { useTranslation } from 'react-i18next'

import { useAPIQuery } from '@api/useAPIQuery'

// import { Skeleton } from '@components/Skeleton'

// import { formSkeleton } from './formSkeleton'
// import styles from './index.module.scss'

import { getMethod } from '@utils/getMethod'
import {
  CheckboxFilterTypeEnum,
  getCheckboxFilterType,
} from '@utils/getCheckboxFilterType'

export type CheckboxFilterType = keyof typeof CheckboxFilterTypeEnum

export const CheckboxFilter = (type: CheckboxFilterType) => {
  const [translated_phrase] = useTranslation('global')

  const { data, isLoading, isFetching } = useAPIQuery(
    getCheckboxFilterType(type).group,
    getMethod('INDEX')
  )

  //   const taskStatuses = getTaskStatuses()

  interface DataType {
    // key: React.Key
    // name: string
    [name: string]: any
  }

  const columns: TableColumnsType<DataType> = []

  data?.map(checkbox => {
    columns.push({
      title: translated_phrase(checkbox.lang_code),
      //   dataIndex: status.lang_code,
      key: checkbox.id,
    })
  })

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }))
  console.log(`options = `)
  console.log(options)

  return {
    groupName: translated_phrase(getCheckboxFilterType(type).lang_code),
    filedName: getCheckboxFilterType(type).type,
    content: (
      <Checkbox.Group
        options={options as CheckboxOptionType[]}
        // onChange={value => {
        // }}
      />
    ),
  }
}
