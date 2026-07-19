import { Tag } from 'antd'

import type { TBlockedPhoneNumber } from '@api/models/blockedPhoneNumber/type/TBlockedPhoneNumber'

import { getIcon } from '@utils/getIcon'
import { formatE164Display } from '@utils/phoneE164'

export const FormContent = (blockedPhoneNumber: TBlockedPhoneNumber) => {
  return (
    <>
      <h2>{formatE164Display(blockedPhoneNumber.e164)}</h2>
      {blockedPhoneNumber.comment && <p>{blockedPhoneNumber.comment}</p>}
      <Tag
        className='transparent'
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {blockedPhoneNumber.created_at}
      </Tag>
    </>
  )
}
