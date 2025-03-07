import { TMetadata } from '@api/common/types/TMetadata'
import { TCustomerCompanyFilter } from '../type/TCustomerCompanyFilter'

export type TCustomerCompanyParams = {
  sort_by: TCustomerCompanyFilter['sortBy']
  sort_direction: TCustomerCompanyFilter['sortDirection']
  filters: {
    created_at?: TCustomerCompanyFilter['createdDates']
    updated_at?: TCustomerCompanyFilter['updatedDates']
    // price: TCustomerCompanyFilter['price']
    id: number
    deleted: TCustomerCompanyFilter['deleted']
  }
  query?: TCustomerCompanyFilter['query']
  page?: TMetadata['current_page']
  per_page?: TMetadata['per_page']
}
