import { Tag } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TOperatorProfile } from '@api/models/operatorProfile/type/TOperatorProfile'

import { getIcon } from '@utils/getIcon'

export const FormContent = (operatorProfile: TOperatorProfile) => {
  const [translated_phrase] = useTranslation('global')

  const workerName = operatorProfile.worker_profile?.user?.name

  return (
    <>
      <h2>{operatorProfile.vox_username}</h2>
      {workerName && <p>{workerName}</p>}
      {operatorProfile.mobile_dialer_enabled === true && (
        <Tag className='warning transparent'>
          {translated_phrase('Form.EntitiesFields.mobile_dialer_enabled')}
        </Tag>
      )}
      <Tag
        className='transparent'
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {operatorProfile.created_at}
      </Tag>
    </>
  )
}
