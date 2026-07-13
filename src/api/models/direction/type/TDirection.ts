import { TDirectionFamily } from '@api/models/directionFamily/type/TDirectionFamily'
import { TDirectionStatus } from '@api/models/directionStatus/type/TDirectionStatus'
import { TDirectionType } from '@api/models/directionType/type/TDirectionType'
import { TPaymentModel } from '@api/models/paymentModel/type/TPaymentModel'
import { TPaymentPeriod } from '@api/models/paymentPeriod/type/TPaymentPeriod'
import { TProject } from '@api/models/project/type/TProject'

export type TDirection = {
  id: number
  project_id: number
  name: string
  description: string
  comment: string
  customer_visible_comment: string
  total_spent_time: number
  total_costs_auto: number
  total_costs: number
  total_costs_from_sales_percentage_auto: number
  total_costs_from_sales_percentage: number
  total_incomes: number
  total_penalty_funds: number
  common_task_progress: number
  contract_amount: number | null
  billing_anchor_date: string | null
  direction_family_id: number
  direction_type_id: number
  payment_model_id: number
  payment_period_id: number | null
  payment_period_interval_days: number | null
  status_id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  project?: TProject
  direction_family: TDirectionFamily
  direction_type: TDirectionType
  payment_model: TPaymentModel
  payment_period: TPaymentPeriod | null
  status: TDirectionStatus
}
