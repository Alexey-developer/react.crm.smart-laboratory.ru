import { TCustomerCompany } from '@api/models/customerCompany/type/TCustomerCompany'
import { TProjectStatus } from '@api/models/projectStatus/type/TProjectStatus'

export type TProject = {
  id: number
  name: string
  description: string
  customer_company_id: number
  status_id: number
  monitoring_enabled: boolean
  directions_count: number
  total_spent_time: number
  total_costs_auto: number
  total_costs: number
  total_costs_from_sales_percentage_auto: number
  total_costs_from_sales_percentage: number
  total_incomes: number
  total_penalty_funds: number
  common_task_progress: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  customer_company?: TCustomerCompany
  status?: TProjectStatus
}
