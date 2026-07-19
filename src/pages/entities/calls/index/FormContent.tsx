import { Tag, Tooltip } from 'antd'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import type { TCall } from '@api/models/call/type/TCall'

import { getIcon } from '@utils/getIcon'
import { CUSTOMER_COMPANIES } from '@utils/constants/routes'
import { formatE164Display } from '@utils/phoneE164'

export const FormContent = (call: TCall) => {
  const [translated_phrase] = useTranslation('global')

  const customerPhone = formatE164Display(call.customer_phone_number?.e164)
  const operatorName =
    call.operator_profile?.worker_profile?.user?.name ??
    call.operator_profile?.vox_username

  return (
    <>
      <h2>
        {customerPhone
          ? `${translated_phrase('Form.EntitiesFields.customer_phone_number_id')}: ${customerPhone}`
          : `#${call.id}`}
      </h2>
      <Tooltip title={translated_phrase('Form.EntitiesFields.source')}>
        <Tag className='success transparent'>
          {translated_phrase(call.source)}
        </Tag>
      </Tooltip>
      {operatorName && (
        <Tag className='transparent'>
          {`${translated_phrase('Form.EntitiesFields.operator_profile_id')}: ${operatorName}`}
        </Tag>
      )}
      {call.work_time_range_id != null && (
        <Tooltip title={translated_phrase('Form.EntitiesFields.work_time_range_id')}>
          <Tag className='transparent' icon={<i className={getIcon('TIME')}></i>}>
            {`#${call.work_time_range_id}`}
            {call.work_time_range?.start_at && call.work_time_range?.end_at
              ? ` ${call.work_time_range.start_at} — ${call.work_time_range.end_at}`
              : ''}
          </Tag>
        </Tooltip>
      )}
      {call.customer_company && (
        <Tag className='warning transparent'>
          <Link to={`/${CUSTOMER_COMPANIES}/${call.customer_company.id}`}>
            {call.customer_company.name}
          </Link>
        </Tag>
      )}
      {call.started_at && (
        <Tag
          className='transparent'
          icon={<i className={getIcon('CREATED_AT')}></i>}
        >
          {call.started_at}
        </Tag>
      )}
      {call.comment && <p>{call.comment}</p>}
    </>
  )
}
