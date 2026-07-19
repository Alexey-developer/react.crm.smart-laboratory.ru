import React from 'react'

import { CustomerCompanyGroup } from '@api/models/customerCompany/queryGroup'

import { EntityIndex } from '@components/EntityIndex'

import { FormContent } from './FormContent'

export const CustomerCompaniesPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.WorkingWithCustomers.companies'
      groupClass={CustomerCompanyGroup}
      entityFilters={[]}
      FormContent={FormContent}
      actionIndexes={[0, 1, 2]}
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
