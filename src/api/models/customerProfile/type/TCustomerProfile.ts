import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TCustomerCompany } from '@api/models/customerCompany/type/TCustomerCompany'

export type TCustomerProfileUser = {
  id: number
  name: string
}

export type TCustomerProfile = TEntityBaseModel & {
  user_id: number
  utc_offset?: number
  customer_company_ids?: number[]
  project_ids?: number[]
  user?: TCustomerProfileUser
  customer_companies?: TCustomerCompany[]
  projects?: { id: number; name: string }[]
}
