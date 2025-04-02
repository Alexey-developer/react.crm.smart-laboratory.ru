import { TMetadata } from '@api/common/types/TMetadata'
import { TTaskFilter } from '../type/TTaskFilter'

export type TTaskParams = {
  sort_by: TTaskFilter['sortBy']
  sort_direction: TTaskFilter['sortDirection']
  filters: {
    created_at?: TTaskFilter['createdDates']
    updated_at?: TTaskFilter['updatedDates']
    // price: TProjectFilter['price']
    id: number
    deleted: TTaskFilter['deleted']
  }
  query?: TTaskFilter['query']
  page?: TMetadata['current_page']
  per_page?: TMetadata['per_page']
}
