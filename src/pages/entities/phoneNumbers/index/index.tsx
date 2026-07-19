import React from 'react'

import { PhoneNumberGroup } from '@api/models/phoneNumber/queryGroup'

import { EntityIndex } from '@components/EntityIndex'

import { FormContent } from './FormContent'

export const PhoneNumbersPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.Telephony.phone_numbers'
      groupClass={PhoneNumberGroup}
      entityFilters={[]}
      FormContent={FormContent}
      actionIndexes={[1, 2]}
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
