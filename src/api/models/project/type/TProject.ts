import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TCustomerCompany } from '@api/models/customerCompany/type/TCustomerCompany'
import { TCurrency } from '@api/models/currency/type/TCurrency'
import { TProjectStatus } from '@api/models/projectStatus/type/TProjectStatus'
import { TFinancialProjection } from '@api/models/financialProjection/type/TFinancialProjection'

export type TProject = TEntityBaseModel & {
  name: string
  description: string
  customer_company_id: number
  currency_id: number
  status_id: number
  monitoring_enabled: boolean
  directions_count: number
  total_spent_time: number
  /** @deprecated payroll — use financial_projections (per-currency) */
  total_costs_auto: number
  total_costs: number
  total_costs_from_sales_percentage_auto: number
  total_costs_from_sales_percentage: number
  total_incomes: number
  /** @deprecated payroll — use financial_projections (per-currency) */
  total_penalty_funds: number
  common_task_progress: number
  customer_company?: TCustomerCompany
  currency?: TCurrency
  status?: TProjectStatus
  financial_projections?: TFinancialProjection[]
}
