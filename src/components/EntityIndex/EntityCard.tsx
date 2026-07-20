import React from 'react'

import type { ViewType } from '@redux/TasksView/types'

import { FormCard } from './FormCard'
import { useFormActions } from './FormActions'
import type { EntityFormActionsConfig } from './types'

const SCRUM_GRID = { xs: 24, lg: 24, xl: 24, xxl: 24 } as const

type EntityCardProps = {
  entity: any
  isLoading: boolean
  FormContent: (entity: any) => React.ReactNode
  actionIndexes: number[]
  resolveActionIndexes?: (entity: any) => number[]
  formActions?: EntityFormActionsConfig
  viewType?: ViewType
  onDelete: (id: number) => Promise<unknown>
  onRestore: (id: number) => Promise<unknown>
}

/**
 * Module-scoped list card — must not be declared inside EntityIndex
 * (inner component types remount every parent render).
 */
export const EntityCard: React.FC<EntityCardProps> = ({
  entity,
  isLoading,
  FormContent,
  actionIndexes,
  resolveActionIndexes,
  formActions,
  viewType,
  onDelete,
  onRestore,
}) => {
  const parentEntity = formActions?.parentEntity?.(entity)
  const directionEntity = formActions?.directionEntity?.(entity)
  const taskEntity = formActions?.taskEntity?.(entity)

  const cardActions = useFormActions(
    entity.id,
    entity.deleted_at
      ? [3]
      : (resolveActionIndexes?.(entity) ?? actionIndexes),
    () => {
      if (entity.deleted_at) {
        void onRestore(entity.id)
      } else {
        void onDelete(entity.id)
      }
    },
    {
      tasksFilterKey: formActions?.tasksFilterKey,
      parentEntityId: parentEntity?.id,
      parentEntityTitle: parentEntity?.label,
      directionEntityId: directionEntity?.id,
      directionEntityTitle: directionEntity?.label,
      taskEntityId: taskEntity?.id,
      taskEntityTitle: taskEntity?.label,
      directionsCount: entity.directions_count,
      abilities: entity.can,
    }
  )

  return (
    <FormCard
      isLoading={isLoading}
      entity={entity}
      FormContent={FormContent}
      cardActions={cardActions}
      grid={!viewType || viewType === 'list' ? undefined : SCRUM_GRID}
    />
  )
}
