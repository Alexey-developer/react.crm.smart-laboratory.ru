import { TWorkerProfile } from '@api/models/workerProfile/type/TWorkerProfile'

export type TUser = {
  id: number
  name: string
  email: string
  is_banned: boolean
  created_at: string
  updated_at: string
  worker_profile?: Pick<TWorkerProfile, 'id'> | null
  /** Granted common.* Spatie names — UI hints; policies remain the authority. */
  common_permissions?: string[]
  /**
   * Short action key (Laravel CommonPermissionActionsEnum value)
   * → full Spatie name. Source of truth for names; do not hardcode full strings.
   */
  common_permissions_catalog?: Record<string, string>
}
