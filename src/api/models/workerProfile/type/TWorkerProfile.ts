import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TCurrency } from '@api/models/currency/type/TCurrency'

export type TWorkerProfileUser = {
  id: number
  name: string
}

export type TWorkerProfile = TEntityBaseModel & {
  user_id: number
  base_rate: number | null
  salary_currency_id: number
  utc_offset?: number
  user?: TWorkerProfileUser
  salary_currency?: TCurrency
}
