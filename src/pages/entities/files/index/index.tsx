import React from 'react'

import { FileGroup } from '@api/models/file/queryGroup'

import { EntityIndex } from '@components/EntityIndex'

import { FormContent } from './FormContent'

export const FilesPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.files'
      groupClass={FileGroup}
      entityFilters={[]}
      FormContent={FormContent}
      actionIndexes={[2]}
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
