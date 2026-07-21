import type { TFileFilter } from '@api/models/file/type/TFileFilter'

export const FILEABLE_TYPES = {
  PROJECT: 'project',
  DIRECTION: 'direction',
  TASK: 'task',
  TASK_ITEM: 'task_item',
} as const

export type TFileableType = (typeof FILEABLE_TYPES)[keyof typeof FILEABLE_TYPES]

/** Hierarchy scope for file index on an entity show page. */
export const fileListFilterForContext = (
  fileableType: TFileableType,
  fileableId: number
): Pick<TFileFilter, 'projectId' | 'directionId' | 'taskId' | 'taskItemId'> => {
  switch (fileableType) {
    case FILEABLE_TYPES.PROJECT:
      return { projectId: fileableId }
    case FILEABLE_TYPES.DIRECTION:
      return { directionId: fileableId }
    case FILEABLE_TYPES.TASK:
      return { taskId: fileableId }
    case FILEABLE_TYPES.TASK_ITEM:
      return { taskItemId: fileableId }
    default:
      return {}
  }
}
