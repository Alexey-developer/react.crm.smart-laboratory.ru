import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TCurrency } from '@api/models/currency/type/TCurrency'

export type TFinancialProjection = TEntityBaseModel & {
  projectable_type: string
  projectable_id: number
  currency_id: number
  total_costs_auto: number
  total_penalty_funds: number
  total_incomes: number
  currency?: TCurrency
}
