import { TMetadata } from '@api/common/types/TMetadata'
import { TCallExtensionFilter } from '../type/TCallExtensionFilter'

export type TCallExtensionParams = {
  sort_by: TCallExtensionFilter['sortBy']
  sort_direction: TCallExtensionFilter['sortDirection']
  filters: {
    created_at?: TCallExtensionFilter['createdDates']
    updated_at?: TCallExtensionFilter['updatedDates']
    id: number
    deleted: TCallExtensionFilter['deleted']
  }
  query?: TCallExtensionFilter['query']
  page?: TMetadata['current_page']
  per_page?: TMetadata['per_page']
}
