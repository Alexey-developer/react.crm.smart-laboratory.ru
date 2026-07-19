import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TCustomerCompany } from '@api/models/customerCompany/type/TCustomerCompany'
import { TCustomerProfile } from '@api/models/customerProfile/type/TCustomerProfile'
import { TWorkerProfile } from '@api/models/workerProfile/type/TWorkerProfile'

export type TPhoneableType =
  | 'customer_company'
  | 'customer_profile'
  | 'worker_profile'

export type TPhoneNumber = TEntityBaseModel & {
  e164: string
  label: string | null
  phoneable_type: TPhoneableType
  phoneable_id: number
  customer_company_id: number | null
  is_primary: boolean
  phoneable?: TCustomerCompany | TCustomerProfile | TWorkerProfile
  customer_company?: TCustomerCompany
}
