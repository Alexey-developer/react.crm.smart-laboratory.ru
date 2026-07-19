import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'

export type TCompanyDialNumber = TEntityBaseModel & {
  e164: string
  label: string | null
  inbound_mode: string
  is_active: boolean
}
