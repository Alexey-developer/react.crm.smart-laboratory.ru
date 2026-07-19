import React from 'react'

import { OurCompanyGroup } from '@api/models/ourCompany/queryGroup'

import { EntityIndex } from '@components/EntityIndex'

import { FormContent } from './FormContent'

export const OurCompaniesPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.Studio.our_companies'
      groupClass={OurCompanyGroup}
      entityFilters={[]}
      FormContent={FormContent}
      actionIndexes={[0, 1, 2]}
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
