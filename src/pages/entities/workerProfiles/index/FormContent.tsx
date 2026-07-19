import { Tag } from 'antd'

import type { TWorkerProfile } from '@api/models/workerProfile/type/TWorkerProfile'

import { getIcon } from '@utils/getIcon'

export const FormContent = (workerProfile: TWorkerProfile) => {
  return (
    <>
      <h2>{workerProfile.user?.name ?? `#${workerProfile.user_id}`}</h2>
      {workerProfile.base_rate != null && (
        <p>
          {workerProfile.base_rate}{' '}
          {workerProfile.salary_currency?.symbol ?? ''}
        </p>
      )}
      <Tag
        className='transparent'
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {workerProfile.created_at}
      </Tag>
    </>
  )
}
