import { TMetadata } from '@api/common/types/TMetadata'
import { TProjectFilter } from '../type/TProjectFilter'

export type TProjectParams = {
  sort_by: TProjectFilter['sortBy']
  sort_direction: TProjectFilter['sortDirection']
  filters: {
    created_at?: TProjectFilter['createdDates']
    updated_at?: TProjectFilter['updatedDates']
    // price: TProjectFilter['price']
    id: number
    deleted: TProjectFilter['deleted']
  }
  query?: TProjectFilter['query']
  page?: TMetadata['current_page']
  per_page?: TMetadata['per_page']
}
