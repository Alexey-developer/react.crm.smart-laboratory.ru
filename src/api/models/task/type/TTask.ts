import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TTaskStatus } from '@api/models/taskStatus/type/TTaskStatus'
import { TProject } from '@api/models/project/type/TProject'
import { TDirection } from '@api/models/direction/type/TDirection'
import { TFinancialProjection } from '@api/models/financialProjection/type/TFinancialProjection'

export type TTaskRepeatMode =
  | 'interval_days'
  | 'monthly'
  | 'billing_period'

export type TTask = TEntityBaseModel & {
  name: string
  description: string | null
  comment: string | null
  customer_visible_comment: string | null
  code: string | null
  progress: number
  total_spent_time: number
  /** @deprecated payroll — use financial_projections (per-currency) */
  total_costs_auto: number
  total_costs: number
  total_costs_from_sales_percentage_auto: number
  total_costs_from_sales_percentage: number
  total_incomes: number
  /** @deprecated payroll — use financial_projections (per-currency) */
  total_penalty_funds: number
  allocated_time: number
  set_at: string | null
  deadline: string | null
  status_id: number
  direction_id: number
  project_id: number
  current_billing_period_id: number | null
  period_completed_at: string | null
  default_rate: number | null
  is_repeat_enabled: boolean
  repeat_mode: TTaskRepeatMode | null
  repeat_interval_days: number | null
  repeat_next_at: string | null
  repeat_source_task_id: number | null
  status: TTaskStatus
  project?: TProject
  direction?: TDirection
  financial_projections?: TFinancialProjection[]
}
