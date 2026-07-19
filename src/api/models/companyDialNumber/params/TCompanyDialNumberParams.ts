import { TMetadata } from '@api/common/types/TMetadata'
import { TCompanyDialNumberFilter } from '../type/TCompanyDialNumberFilter'

export type TCompanyDialNumberParams = {
  sort_by: TCompanyDialNumberFilter['sortBy']
  sort_direction: TCompanyDialNumberFilter['sortDirection']
  filters: {
    created_at?: TCompanyDialNumberFilter['createdDates']
    updated_at?: TCompanyDialNumberFilter['updatedDates']
    id: number
    deleted: TCompanyDialNumberFilter['deleted']
  }
  query?: TCompanyDialNumberFilter['query']
  page?: TMetadata['current_page']
  per_page?: TMetadata['per_page']
}
