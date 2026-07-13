import React from 'react'

import { ProjectGroup } from '@api/models/project/queryGroup'

import { EntityIndex } from '@components/EntityIndex'
import { CheckboxFilter } from '@components/Filter/CheckboxFilter'
import { SelectFilter } from '@components/Filter/SelectFilter'

import { FormContent } from './FormContent'

export const ProjectsPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.projects'
      groupClass={ProjectGroup}
      entityFilters={[
        CheckboxFilter('PROJECT_STATUS'),
        SelectFilter('CUSTOMER_COMPANY'),
      ]}
      FormContent={FormContent}
      actionIndexes={[0, 6, 4, 1, 2]}
    />
  )
}
