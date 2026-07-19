import { Tag } from 'antd'

import type { TOurCompany } from '@api/models/ourCompany/type/TOurCompany'

import { getIcon } from '@utils/getIcon'

export const FormContent = (ourCompany: TOurCompany) => {
  return (
    <>
      <h2>{ourCompany.name}</h2>
      {ourCompany.commercial_name && <p>{ourCompany.commercial_name}</p>}
      {ourCompany.INN && <p>INN: {ourCompany.INN}</p>}
      {ourCompany.country && <p>{ourCompany.country}</p>}
      <Tag
        className='transparent'
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {ourCompany.created_at}
      </Tag>
    </>
  )
}
