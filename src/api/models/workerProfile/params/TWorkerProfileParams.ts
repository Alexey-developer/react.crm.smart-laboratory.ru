import { TMetadata } from '@api/common/types/TMetadata'
import { TWorkerProfileFilter } from '../type/TWorkerProfileFilter'

export type TWorkerProfileParams = {
  sort_by: TWorkerProfileFilter['sortBy']
  sort_direction: TWorkerProfileFilter['sortDirection']
  filters: {
    created_at?: TWorkerProfileFilter['createdDates']
    updated_at?: TWorkerProfileFilter['updatedDates']
    id: number
    deleted: TWorkerProfileFilter['deleted']
  }
  query?: TWorkerProfileFilter['query']
  page?: TMetadata['current_page']
  per_page?: TMetadata['per_page']
}
