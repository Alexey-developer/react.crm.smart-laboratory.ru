import type { TColorType } from '@api/common/types/TColorType'
import type { TTaskRepeatMode } from '@api/models/task/type/TTask'

type TTaskRecurrenceSource = {
  is_repeat_enabled?: boolean
  repeat_mode?: TTaskRepeatMode | null
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
  const isRecurring = Boolean(task.is_repeat_enabled)

  if (!isRecurring) {
    return {
      text: translate('Tasks.one_time'),
      className: 'transparent',
    }
  }

  const repeatMode = task.repeat_mode
  const text = repeatMode
    ? translate(`Tasks.repeat_mode_${repeatMode}`)
    : translate('Tasks.recurring')

  return {
    text,
    className: 'warning',
  }
}
