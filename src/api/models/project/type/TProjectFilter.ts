import { TFilter } from '@api/common/types/TFilter'

export type TProjectFilter = TFilter & {
  sortBy: 'name' | 'created_at' | 'updated_at' | 'price'
  //   price: [string, string]
}
