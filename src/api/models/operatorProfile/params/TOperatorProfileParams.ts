import { SortDirection } from '@api/common/types/TSortDirection'
import { TOperatorProfileFilter } from '../type/TOperatorProfileFilter'

export type TOperatorProfileParams = {
  sort_by?: TOperatorProfileFilter['sortBy']
  sort_direction?: SortDirection
  filters?: object
  query?: string
  page?: number
  per_page?: number
}
