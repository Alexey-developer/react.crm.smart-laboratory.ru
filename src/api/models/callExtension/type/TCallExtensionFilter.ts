import { TFilter } from '@api/common/types/TFilter'

export type TCallExtensionFilter = TFilter & {
  sortBy: 'code' | 'created_at' | 'updated_at'
}
