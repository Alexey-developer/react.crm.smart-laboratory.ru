import { Checkbox, Space } from 'antd'

import { useTranslation } from 'react-i18next'

const ON_LINE_VALUES = ['crm', 'mobile', 'none'] as const

export const OperatorOnLineFilter = () => {
  const [translated_phrase] = useTranslation('global')

  return {
    groupName: translated_phrase('Filters.OnLine.self'),
    filedName: 'onLine',
    content: (
      <Checkbox.Group>
        <Space direction='vertical'>
          {ON_LINE_VALUES.map(value => (
            <Checkbox key={value} value={value}>
              {translated_phrase(`Filters.OnLine.${value}`)}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    ),
  }
}
