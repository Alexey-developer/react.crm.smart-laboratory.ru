import { TFilter } from '@api/common/types/TFilter'

export type TOperatorProfileFilter = TFilter & {
  sortBy: 'vox_username' | 'created_at' | 'updated_at'
}
