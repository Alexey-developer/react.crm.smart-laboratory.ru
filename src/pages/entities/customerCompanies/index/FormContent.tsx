import { Tag } from 'antd'

import type { TCustomerCompany } from '@api/models/customerCompany/type/TCustomerCompany'

import { getIcon } from '@utils/getIcon'

export const FormContent = (customerCompany: TCustomerCompany) => {
  return (
    <>
      <h2>{customerCompany.name}</h2>
      {customerCompany.INN && <p>INN: {customerCompany.INN}</p>}
      {customerCompany.country && <p>{customerCompany.country}</p>}
      <Tag
        className='transparent'
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {customerCompany.created_at}
      </Tag>
    </>
  )
}
