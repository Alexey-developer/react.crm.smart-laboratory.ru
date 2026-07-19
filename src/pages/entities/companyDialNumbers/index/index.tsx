import React from 'react'

import { CompanyDialNumberGroup } from '@api/models/companyDialNumber/queryGroup'

import { EntityIndex } from '@components/EntityIndex'

import { FormContent } from './FormContent'

export const CompanyDialNumbersPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.Telephony.company_dial_numbers'
      groupClass={CompanyDialNumberGroup}
      entityFilters={[]}
      FormContent={FormContent}
      actionIndexes={[1, 2]}
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
