import React from 'react'

import { CallGroup } from '@api/models/call/queryGroup'

import { EntityIndex } from '@components/EntityIndex'
import { SelectFilter } from '@components/Filter/SelectFilter'

import { FormContent } from './FormContent'
import {
  CallDirectionFilter,
  CallSourceFilter,
  WithoutWorkTimeRangeFilter,
} from '../helpers/filters'
import { isManualCall } from '@utils/entityFormActions/isManualCall'

export const CallsPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.Telephony.calls'
      groupClass={CallGroup}
      entityFilters={[
        SelectFilter('CUSTOMER_COMPANY'),
        SelectFilter('CUSTOMER_PROFILE'),
        SelectFilter('PHONE_NUMBER'),
        CallDirectionFilter(),
        CallSourceFilter(),
        SelectFilter('OPERATOR_PROFILE'),
        SelectFilter('WORK_TIME_RANGE'),
        WithoutWorkTimeRangeFilter(),
      ]}
      FormContent={FormContent}
      actionIndexes={[1, 2]}
      resolveActionIndexes={entity =>
        isManualCall(entity) ? [1, 2] : [2]
      }
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
