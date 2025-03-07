import { TProjectType } from '@api/models/projectType/type/TProjectType'
import { TProjectStatus } from '@api/models/projectStatus/type/TProjectStatus'

export type TProject = {
  id: number
  name: string
  description: string
  website_url?: string
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
  check_performance: boolean
  check_expirations: boolean
  created_at: string
  updated_at: string
  deleted_at: string
  type: TProjectType
  status: TProjectStatus
  //   customer_company: TCustomerCompany
}
