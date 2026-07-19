import React from 'react'

import { CallExtensionGroup } from '@api/models/callExtension/queryGroup'

import { EntityIndex } from '@components/EntityIndex'

import { FormContent } from './FormContent'

export const CallExtensionsPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.Telephony.call_extensions'
      groupClass={CallExtensionGroup}
      entityFilters={[]}
      FormContent={FormContent}
      actionIndexes={[1, 2]}
      skeletonEmployeeCount={0}
      skeletonShowProgress={false}
    />
  )
}
