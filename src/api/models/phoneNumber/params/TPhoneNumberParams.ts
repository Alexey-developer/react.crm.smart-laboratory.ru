import { TMetadata } from '@api/common/types/TMetadata'
import { TPhoneNumberFilter } from '../type/TPhoneNumberFilter'

export type TPhoneNumberParams = {
  sort_by: TPhoneNumberFilter['sortBy']
  sort_direction: TPhoneNumberFilter['sortDirection']
  filters: {
    created_at?: TPhoneNumberFilter['createdDates']
    updated_at?: TPhoneNumberFilter['updatedDates']
    id: number
    deleted: TPhoneNumberFilter['deleted']
  }
  query?: TPhoneNumberFilter['query']
  page?: TMetadata['current_page']
  per_page?: TMetadata['per_page']
}
