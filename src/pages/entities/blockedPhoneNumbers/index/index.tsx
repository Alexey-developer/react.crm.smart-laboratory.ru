import React from 'react'

import { BlockedPhoneNumberGroup } from '@api/models/blockedPhoneNumber/queryGroup'

import { EntityIndex } from '@components/EntityIndex'

import { FormContent } from './FormContent'

export const BlockedPhoneNumbersPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.Telephony.blocked_phone_numbers'
      groupClass={BlockedPhoneNumberGroup}
      entityFilters={[]}
      FormContent={FormContent}
      actionIndexes={[1, 2]}
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
