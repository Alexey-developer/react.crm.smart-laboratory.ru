import React from 'react'

import { WorkerProfileGroup } from '@api/models/workerProfile/queryGroup'

import { EntityIndex } from '@components/EntityIndex'

import { FormContent } from './FormContent'

export const WorkerProfilesPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.Employees.profiles'
      groupClass={WorkerProfileGroup}
      entityFilters={[]}
      FormContent={FormContent}
      actionIndexes={[0, 1, 2]}
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
