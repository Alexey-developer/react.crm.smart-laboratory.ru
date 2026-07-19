import { TMetadata } from '@api/common/types/TMetadata'
import { TCallFilter } from '../type/TCallFilter'

export type TCallParams = {
  sort_by: TCallFilter['sortBy']
  sort_direction: TCallFilter['sortDirection']
  filters: {
    created_at?: TCallFilter['createdDates']
    updated_at?: TCallFilter['updatedDates']
    id: number
    deleted: TCallFilter['deleted']
    customerCompany?: number[]
    customerProfile?: number[]
    phoneNumber?: number[]
    direction?: string
    source?: string[]
    operatorProfile?: number[]
  }
  query?: TCallFilter['query']
  page?: TMetadata['current_page']
  per_page?: TMetadata['per_page']
}
