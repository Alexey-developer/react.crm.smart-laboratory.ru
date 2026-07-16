import { TMetadata } from '@api/common/types/TMetadata'
import { TWorkTimeRangeFilter } from '../type/TWorkTimeRangeFilter'

export type TWorkTimeRangeParams = {
  sort_by: TWorkTimeRangeFilter['sortBy']
  sort_direction: TWorkTimeRangeFilter['sortDirection']
  filters: {
    created_at?: TWorkTimeRangeFilter['createdDates']
    updated_at?: TWorkTimeRangeFilter['updatedDates']
    id: number
    deleted: TWorkTimeRangeFilter['deleted']
  }
  query?: TWorkTimeRangeFilter['query']
  page?: TMetadata['current_page']
  per_page?: TMetadata['per_page']
}
