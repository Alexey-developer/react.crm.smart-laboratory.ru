import React from 'react'

import { Checkbox, Form, InputNumber, Select } from 'antd'

import { useTranslation } from 'react-i18next'

import type { FormItem } from '@components/CustomForm'
import type { TTaskRepeatMode } from '@api/models/task/type/TTask'

import { getIcon } from '@utils/getIcon'

const REPEAT_MODES: TTaskRepeatMode[] = [
  'interval_days',
  'monthly',
  'billing_period',
]

const RepeatIntervalDaysField: React.FC = () => {
  const repeatMode = Form.useWatch('repeat_mode')
  const isRepeatEnabled = Form.useWatch('is_repeat_enabled')

  if (!isRepeatEnabled || repeatMode !== 'interval_days') {
    return null
  }

  return <InputNumber min={1} style={{ width: '100%' }} />
}

const RepeatModeSelect: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  const isRepeatEnabled = Form.useWatch('is_repeat_enabled')

  return (
    <Select
      disabled={!isRepeatEnabled}
      allowClear
      options={REPEAT_MODES.map(mode => ({
        value: mode,
        label: translated_phrase(`Tasks.repeat_mode_${mode}`),
      }))}
    />
  )
}

export const getFormItems = () => {
  const formItems: FormItem[] = [
    {
      name: 'is_repeat_enabled',
      rules: [],
      component: (
        <Form.Item name='is_repeat_enabled' valuePropName='checked' noStyle>
          <Checkbox />
        </Form.Item>
      ),
    },
    {
      name: 'repeat_mode',
      rules: [],
      component: (
        <Form.Item name='repeat_mode' noStyle>
          <RepeatModeSelect />
        </Form.Item>
      ),
    },
    {
      name: 'repeat_interval_days',
      rules: [{ type: 'number', min: 1 }],
      component: (
        <Form.Item name='repeat_interval_days' noStyle>
          <RepeatIntervalDaysField />
        </Form.Item>
      ),
    },
    {
      name: 'default_rate',
      rules: [{ type: 'number', min: 0 }],
      component: (
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          addonBefore={<i className={getIcon('RUBLE')}></i>}
        />
      ),
    },
  ]

  return formItems
}

export const getIconType = () => 'TASKS'
