import type { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'

export type TFile = TEntityBaseModel & {
  original_name: string
  mime_type: string
  extension: string
  size_bytes: number
  scan_status: string
  owner_profile_type: string
  owner_profile_id: number
}
