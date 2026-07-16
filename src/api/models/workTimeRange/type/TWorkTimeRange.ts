import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TCurrency } from '@api/models/currency/type/TCurrency'
import { TTask } from '@api/models/task/type/TTask'
import { TWorkerProfile } from '@api/models/workerProfile/type/TWorkerProfile'

export type TWorkTimeRangeTaskItem = {
  id: number
  name: string
}

export type TWorkTimeRange = TEntityBaseModel & {
  worker_profile_id: number
  task_id: number
  task_item_id: number
  start_at: string
  end_at: string
  total_time: number
  input_mode: string
  rate: number
  salary_currency_id: number
  money: number
  money_override: number | null
  rating: number | null
  rated_by_worker_profile_id: number | null
  rated_at: string | null
  leader_comment: string | null
  worker_profile?: TWorkerProfile
  task?: TTask
  task_item?: TWorkTimeRangeTaskItem
  salary_currency?: TCurrency
  rated_by_worker_profile?: TWorkerProfile
}
