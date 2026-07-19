import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'

export type TCompanyDialNumber = TEntityBaseModel & {
  our_company_id: number
  e164: string
  label: string | null
  inbound_mode: string
  is_active: boolean
}
