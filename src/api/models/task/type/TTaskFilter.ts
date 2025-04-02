import { TFilter } from '@api/common/types/TFilter'

export type TTaskFilter = TFilter & {
  sortBy: 'name' | 'created_at' | 'updated_at' | 'price'
  //   price: [string, string]
}
