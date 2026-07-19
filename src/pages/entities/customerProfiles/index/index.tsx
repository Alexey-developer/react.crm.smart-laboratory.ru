import React from 'react'

import { CustomerProfileGroup } from '@api/models/customerProfile/queryGroup'

import { EntityIndex } from '@components/EntityIndex'

import { FormContent } from './FormContent'

export const CustomerProfilesPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.WorkingWithCustomers.customer_profiles'
      groupClass={CustomerProfileGroup}
      entityFilters={[]}
      FormContent={FormContent}
      actionIndexes={[0, 1, 2]}
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
