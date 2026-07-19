import { Tag } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TPhoneNumber } from '@api/models/phoneNumber/type/TPhoneNumber'

import { getIcon } from '@utils/getIcon'
import { formatE164Display } from '@utils/phoneE164'

export const FormContent = (phoneNumber: TPhoneNumber) => {
  const [translated_phrase] = useTranslation('global')

  const phoneableName =
    phoneNumber.phoneable && 'name' in phoneNumber.phoneable
      ? phoneNumber.phoneable.name
      : phoneNumber.phoneable && 'user' in phoneNumber.phoneable
        ? phoneNumber.phoneable.user?.name
        : undefined

  return (
    <>
      <h2>{formatE164Display(phoneNumber.e164)}</h2>
      {phoneNumber.label && <p>{phoneNumber.label}</p>}
      {phoneableName && (
        <Tag className='success transparent'>{phoneableName}</Tag>
      )}
      <Tag
        className='transparent'
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {phoneNumber.created_at}
      </Tag>
    </>
  )
}
