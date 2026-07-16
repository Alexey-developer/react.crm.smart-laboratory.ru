import { TFilter } from '@api/common/types/TFilter'

export type TWorkerProfileFilter = TFilter & {
  sortBy: 'base_rate' | 'created_at' | 'updated_at'
}
