import React from 'react'

import { WorkerProfileGroup } from '@api/models/workerProfile/queryGroup'

import { EntityIndex } from '@components/EntityIndex'
import { SelectFilter } from '@components/Filter/SelectFilter'
import { CheckboxFilter } from '@components/Filter/CheckboxFilter'

import { FormContent } from './FormContent'

export const WorkerProfilesPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.Employees.profiles'
      groupClass={WorkerProfileGroup}
      entityFilters={[
        SelectFilter('OUR_COMPANY'),
        CheckboxFilter('EMPLOYMENT_FORM'),
      ]}
      FormContent={FormContent}
      actionIndexes={[0, 1, 2]}
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
