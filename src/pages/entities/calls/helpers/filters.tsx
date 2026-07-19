import { Checkbox, Radio, Space } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TCallDirection, TCallSource } from '@api/models/call/type/TCall'

const CALL_DIRECTIONS: TCallDirection[] = ['inbound', 'outbound']

const CALL_SOURCES: TCallSource[] = [
  'Types.Call.telephony_inbound',
  'Types.Call.telephony_outbound',
  'Types.Call.mobile_dialer',
  'Types.Call.website_online',
  'Types.Call.manual',
]

export const CallDirectionFilter = () => {
  const [translated_phrase] = useTranslation('global')

  return {
    groupName: translated_phrase('Form.EntitiesFields.direction'),
    filedName: 'direction',
    content: (
      <Radio.Group>
        <Space direction='vertical'>
          {CALL_DIRECTIONS.map(direction => (
            <Radio key={direction} value={direction}>
              {translated_phrase(`Types.Call.${direction}`)}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    ),
  }
}

export const CallSourceFilter = () => {
  const [translated_phrase] = useTranslation('global')

  return {
    groupName: translated_phrase('Form.EntitiesFields.source'),
    filedName: 'source',
    content: (
      <Checkbox.Group>
        <Space direction='vertical'>
          {CALL_SOURCES.map(source => (
            <Checkbox key={source} value={source}>
              {translated_phrase(source)}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    ),
  }
}

export const WithoutWorkTimeRangeFilter = () => {
  const [translated_phrase] = useTranslation('global')

  return {
    groupName: translated_phrase('Filters.WorkTimeRange.self'),
    filedName: 'withoutWorkTimeRange',
    content: (
      <Checkbox.Group>
        <Checkbox value='1'>
          {translated_phrase('Filters.WorkTimeRange.without')}
        </Checkbox>
      </Checkbox.Group>
    ),
  }
}
