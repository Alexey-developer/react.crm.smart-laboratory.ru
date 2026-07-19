import { Input, Select, Form, Typography } from 'antd'

const { TextArea } = Input

import { useTranslation } from 'react-i18next'

import type { FormItem } from '@components/CustomForm'
import { CustomSelect } from '@components/CustomSelect'

import type { TCallDirection } from '@api/models/call/type/TCall'

import { getIcon } from '@utils/getIcon'
import { constants } from '@utils/constants/constants.json'

const CALL_DIRECTIONS: TCallDirection[] = ['inbound', 'outbound']

const DirectionSelect: React.FC = () => {
  const [translated_phrase] = useTranslation('global')

  return (
    <Select
      allowClear
      options={CALL_DIRECTIONS.map(direction => ({
        value: direction,
        label: translated_phrase(`Types.Call.${direction}`),
      }))}
    />
  )
}

const RecordingUploadField: React.FC = () => {
  const [translated_phrase] = useTranslation('global')

  return (
    <>
      <Typography.Text type='secondary'>
        {translated_phrase('Calls.recording_upload_later')}
      </Typography.Text>
      <Input disabled />
    </>
  )
}

export const getFormItems = () => {
  const formItems: FormItem[] = [
    {
      name: 'customer_phone_number_id',
      rules: [{ required: true }],
      component: (
        <CustomSelect type='PHONE_NUMBER' name='customer_phone_number_id' />
      ),
    },
    {
      name: 'operator_phone_number_id',
      rules: [],
      component: (
        <CustomSelect type='PHONE_NUMBER' name='operator_phone_number_id' />
      ),
    },
    {
      name: 'operator_profile_id',
      rules: [],
      component: (
        <CustomSelect type='OPERATOR_PROFILE' name='operator_profile_id' />
      ),
    },
    {
      name: 'customer_company_id',
      rules: [],
      component: (
        <CustomSelect type='CUSTOMER_COMPANY' name='customer_company_id' />
      ),
    },
    {
      name: 'customer_profile_id',
      rules: [],
      component: (
        <CustomSelect type='CUSTOMER_PROFILE' name='customer_profile_id' />
      ),
    },
    {
      name: 'direction',
      rules: [{ required: true }],
      component: (
        <Form.Item name='direction' noStyle>
          <DirectionSelect />
        </Form.Item>
      ),
    },
    {
      name: 'comment',
      rules: [{ max: constants.MAX_TEXT_INPUT_LENGTH }],
      component: <TextArea maxLength={constants.MAX_TEXT_INPUT_LENGTH} />,
    },
    {
      name: 'call_record_transcription_text',
      rules: [],
      component: <TextArea rows={4} />,
    },
    {
      name: 'recording_upload',
      rules: [],
      component: <RecordingUploadField />,
    },
    {
      name: 'call_record_private_path',
      rules: [{ max: 500 }],
      component: (
        <Input
          maxLength={500}
          addonBefore={<i className={getIcon('PHONE')}></i>}
        />
      ),
    },
  ]

  return formItems
}

export const getIconType = () => 'CALLS'
