import React from 'react'

import { CompanyDialNumberGroup } from '@api/models/companyDialNumber/queryGroup'

import { EntityIndex } from '@components/EntityIndex'
import { SelectFilter } from '@components/Filter/SelectFilter'

import { FormContent } from './FormContent'

export const CompanyDialNumbersPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.Telephony.company_dial_numbers'
      groupClass={CompanyDialNumberGroup}
      entityFilters={[SelectFilter('OUR_COMPANY')]}
      FormContent={FormContent}
      actionIndexes={[1, 2]}
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
