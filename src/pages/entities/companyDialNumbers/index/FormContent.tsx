import { Tag } from 'antd'

import type { TCompanyDialNumber } from '@api/models/companyDialNumber/type/TCompanyDialNumber'

import { getIcon } from '@utils/getIcon'
import { formatE164Display } from '@utils/phoneE164'

export const FormContent = (companyDialNumber: TCompanyDialNumber) => {
  return (
    <>
      <h2>{formatE164Display(companyDialNumber.e164)}</h2>
      {companyDialNumber.label && <p>{companyDialNumber.label}</p>}
      <Tag
        className='transparent'
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {companyDialNumber.created_at}
      </Tag>
    </>
  )
}
