import { TFilter } from '@api/common/types/TFilter'

export type TCustomerProfileFilter = TFilter & {
  sortBy: 'created_at' | 'updated_at'
}
