import { TMetadata } from '@api/common/types/TMetadata'
import { TDirectionFilter } from '../type/TDirectionFilter'

export type TDirectionParams = {
  sort_by: TDirectionFilter['sortBy']
  sort_direction: TDirectionFilter['sortDirection']
  filters: {
    created_at?: TDirectionFilter['createdDates']
    updated_at?: TDirectionFilter['updatedDates']
    id: number
    deleted: TDirectionFilter['deleted']
  }
  query?: TDirectionFilter['query']
  page?: TMetadata['current_page']
  per_page?: TMetadata['per_page']
}
