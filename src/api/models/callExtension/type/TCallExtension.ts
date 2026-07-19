import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TOperatorProfile } from '@api/models/operatorProfile/type/TOperatorProfile'
import { TPhoneNumber } from '@api/models/phoneNumber/type/TPhoneNumber'

export type TCallExtensionTargetType = 'crm_user' | 'pstn'

export type TCallExtension = TEntityBaseModel & {
  code: string
  target_type: TCallExtensionTargetType
  operator_profile_id: number | null
  vox_username: string | null
  phone_number_id: number | null
  display_name: string | null
  is_active: boolean
  operator_profile?: TOperatorProfile
  phone_number?: TPhoneNumber
}
