import type { TColorType } from '@api/common/types/TColorType'

type TTaskRecurrenceSource = {
  is_recurring?: boolean
  recurring_task_schedule_id?: number | null
}

export const isTaskEntity = (entity: {
  progress?: number
  direction_type?: unknown
}): boolean =>
  typeof entity.progress === 'number' && entity.direction_type === undefined

export const getTaskRecurrenceRibbon = (
  task: TTaskRecurrenceSource,
  translate: (key: string) => string
): { text: string; className: TColorType } => {
  const isRecurring =
    task.is_recurring ?? Boolean(task.recurring_task_schedule_id)

  return {
    text: translate(isRecurring ? 'Tasks.recurring' : 'Tasks.one_time'),
    className: isRecurring ? 'warning' : 'transparent',
  }
}
