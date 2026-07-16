import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TCurrency } from '@api/models/currency/type/TCurrency'
import { TWorkerProfile } from '@api/models/workerProfile/type/TWorkerProfile'

export type TPenaltyReasonType =
  | 'Reasons.Penalty.lateness'
  | 'Reasons.Penalty.absence'
  | 'Reasons.Penalty.error'
  | 'Reasons.Penalty.resource_outage'
  | 'Reasons.Penalty.rudeness_to_customer'
  | 'Reasons.Penalty.customer_misinform'
  | 'Reasons.Penalty.other'

export type TPenalty = TEntityBaseModel & {
  worker_profile_id: number
  amount: number
  // TODO(forms): default from WorkerProfile.salary_currency_id on Penalty create
  salary_currency_id: number
  reason_type: TPenaltyReasonType
  reason: string | null
  task_id: number | null
  task_item_id: number | null
  project_id: number | null
  direction_id: number | null
  worker_profile?: TWorkerProfile
  salary_currency?: TCurrency
}
