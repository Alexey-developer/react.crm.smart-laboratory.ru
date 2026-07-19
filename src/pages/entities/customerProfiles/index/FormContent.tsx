import { Tag } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TCustomerProfile } from '@api/models/customerProfile/type/TCustomerProfile'

import { getIcon } from '@utils/getIcon'

export const FormContent = (customerProfile: TCustomerProfile) => {
  const [translated_phrase] = useTranslation('global')
  const companiesCount = customerProfile.customer_companies?.length ?? 0
  const projectsCount = customerProfile.projects?.length ?? 0

  return (
    <>
      <h2>{customerProfile.user?.name ?? `#${customerProfile.user_id}`}</h2>
      {(companiesCount > 0 || projectsCount > 0) && (
        <p>
          {companiesCount > 0 &&
            `${companiesCount} ${translated_phrase(
              'Form.EntitiesFields.customer_company_ids'
            )}`}
          {companiesCount > 0 && projectsCount > 0 && ' · '}
          {projectsCount > 0 &&
            `${projectsCount} ${translated_phrase(
              'Form.EntitiesFields.project_ids'
            )}`}
        </p>
      )}
      <Tag
        className='transparent'
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {customerProfile.created_at}
      </Tag>
    </>
  )
}
