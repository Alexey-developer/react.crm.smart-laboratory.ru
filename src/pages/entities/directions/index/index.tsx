import React from 'react'

import { DirectionGroup } from '@api/models/direction/queryGroup'

import { EntityIndex } from '@components/EntityIndex'
import { CheckboxFilter } from '@components/Filter/CheckboxFilter'
import { SelectFilter } from '@components/Filter/SelectFilter'

import { directionParentEntity } from '@utils/entityFormActions/directionParentEntity'

import { FormContent } from './FormContent'

export const DirectionsPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.directions'
      groupClass={DirectionGroup}
      entityFilters={[
        CheckboxFilter('DIRECTION_STATUS'),
        CheckboxFilter('DIRECTION_TYPE'),
        CheckboxFilter('DIRECTION_FAMILY'),
        CheckboxFilter('PAYMENT_MODEL'),
        SelectFilter('PROJECT'),
      ]}
      FormContent={FormContent}
      actionIndexes={[0, 4, 5, 1, 2]}
      formActions={{
        tasksFilterKey: 'direction_id',
        parentEntity: directionParentEntity,
      }}
    />
  )
}
