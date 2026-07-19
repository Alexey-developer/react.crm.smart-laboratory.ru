import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TWorkerProfile } from '@api/models/workerProfile/type/TWorkerProfile'

export type TOperatorProfile = TEntityBaseModel & {
  worker_profile_id: number
  vox_username: string
  softphone_enabled: boolean
  mobile_dialer_enabled: boolean
  mobile_dialer_restore_after_softphone?: boolean
  phone_number_id?: number | null
  is_active: boolean
  worker_profile?: TWorkerProfile
}
