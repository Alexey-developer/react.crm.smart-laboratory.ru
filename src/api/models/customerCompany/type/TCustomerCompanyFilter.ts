import { TFilter } from '@api/common/types/TFilter'

export type TCustomerCompanyFilter = TFilter & {
  sortBy: 'name' | 'created_at' | 'updated_at' | 'price'
  //   price: [string, string]
}
