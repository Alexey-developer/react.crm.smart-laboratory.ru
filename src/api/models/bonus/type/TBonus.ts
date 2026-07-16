import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TCurrency } from '@api/models/currency/type/TCurrency'
import { TWorkerProfile } from '@api/models/workerProfile/type/TWorkerProfile'

export type TBonusReasonType =
  | 'Reasons.Bonus.salary'
  | 'Reasons.Bonus.kpi_achievement'
  | 'Reasons.Bonus.special_merit'
  | 'Reasons.Bonus.other'

export type TBonus = TEntityBaseModel & {
  worker_profile_id: number
  amount: number
  // TODO(forms): default from WorkerProfile.salary_currency_id on Bonus create
  salary_currency_id: number
  reason_type: TBonusReasonType
  reason: string | null
  task_id: number | null
  task_item_id: number | null
  project_id: number | null
  direction_id: number | null
  worker_profile?: TWorkerProfile
  salary_currency?: TCurrency
}
