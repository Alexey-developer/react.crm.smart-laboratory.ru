import React from 'react'

import { OperatorProfileGroup } from '@api/models/operatorProfile/queryGroup'

import { EntityIndex } from '@components/EntityIndex'
import { SelectFilter } from '@components/Filter/SelectFilter'

import { OperatorOnLineFilter } from '../helpers/filters'
import { FormContent } from './FormContent'

export const OperatorProfilesPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.Telephony.operator_profiles'
      groupClass={OperatorProfileGroup}
      entityFilters={[
        SelectFilter('WORKER_PROFILE'),
        OperatorOnLineFilter(),
      ]}
      FormContent={FormContent}
      actionIndexes={[1, 2]}
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
