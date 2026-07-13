import { TTaskStatus } from '@api/models/taskStatus/type/TTaskStatus'
import { TProject } from '@api/models/project/type/TProject'
import { TDirection } from '@api/models/direction/type/TDirection'

export type TTask = {
  id: number
  name: string
  description: string | null
  comment: string | null
  customer_visible_comment: string | null
  code: string | null
  progress: number
  total_spent_time: number
  total_costs_auto: number
  total_costs: number
  total_costs_from_sales_percentage_auto: number
  total_costs_from_sales_percentage: number
  total_incomes: number
  total_penalty_funds: number
  allocated_time: number
  set_at: string | null
  deadline: string | null
  status_id: number
  direction_id: number
  project_id: number
  recurring_task_schedule_id: number | null
  current_billing_period_id: number | null
  period_completed_at: string | null
  is_recurring: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
  status: TTaskStatus
  project?: TProject
  direction?: TDirection
}
