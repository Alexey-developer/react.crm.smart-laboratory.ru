import { TTaskStatus } from '@api/models/taskStatus/type/TTaskStatus'

export type TTask = {
  id: number
  name: string
  description: string
  progress: number
  comment: string
  total_spent_time: number
  total_costs_auto: number
  total_costs: number
  total_costs_from_sales_percentage_auto: number
  total_costs_from_sales_percentage: number
  total_incomes: number
  total_penalty_funds: number
  created_at: string
  updated_at: string
  deleted_at: string
  status: TTaskStatus
}
