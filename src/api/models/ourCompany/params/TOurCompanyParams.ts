import { TMetadata } from '@api/common/types/TMetadata'
import { TOurCompanyFilter } from '../type/TOurCompanyFilter'

export type TOurCompanyParams = {
  sort_by: TOurCompanyFilter['sortBy']
  sort_direction: TOurCompanyFilter['sortDirection']
  filters: {
    created_at?: TOurCompanyFilter['createdDates']
    updated_at?: TOurCompanyFilter['updatedDates']
    id: number
    deleted: TOurCompanyFilter['deleted']
    status?: TOurCompanyFilter['status']
  }
  query?: TOurCompanyFilter['query']
  page?: TMetadata['current_page']
  per_page?: TMetadata['per_page']
}
