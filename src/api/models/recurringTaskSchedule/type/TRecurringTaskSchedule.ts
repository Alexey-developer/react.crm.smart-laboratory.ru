import { TTask } from '@api/models/task/type/TTask'
import { TDirection } from '@api/models/direction/type/TDirection'
import { TProject } from '@api/models/project/type/TProject'
import { TRecurrenceType } from '@api/models/recurrenceType/type/TRecurrenceType'

export type TRecurringTaskSchedule = {
  id: number
  direction_id: number
  project_id: number
  recurrence_type_id: number
  recurrence_weekday: number | null
  recurrence_interval_days: number | null
  is_active: boolean
  task_ids?: number[]
  created_at: string
  updated_at: string
  deleted_at: string | null
  direction?: TDirection
  project?: TProject
  tasks?: TTask[]
  recurrence_type?: TRecurrenceType
}
