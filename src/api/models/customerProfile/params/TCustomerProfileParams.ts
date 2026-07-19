import { TMetadata } from '@api/common/types/TMetadata'
import { TCustomerProfileFilter } from '../type/TCustomerProfileFilter'

export type TCustomerProfileParams = {
  sort_by: TCustomerProfileFilter['sortBy']
  sort_direction: TCustomerProfileFilter['sortDirection']
  filters: {
    created_at?: TCustomerProfileFilter['createdDates']
    updated_at?: TCustomerProfileFilter['updatedDates']
    id: number
    deleted: TCustomerProfileFilter['deleted']
  }
  query?: TCustomerProfileFilter['query']
  page?: TMetadata['current_page']
  per_page?: TMetadata['per_page']
}
