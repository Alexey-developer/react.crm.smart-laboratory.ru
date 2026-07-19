import type { TBlockedPhoneNumberFilter } from '../type/TBlockedPhoneNumberFilter'

export type TBlockedPhoneNumberParams = TBlockedPhoneNumberFilter & {
  sort_by?: TBlockedPhoneNumberFilter['sortBy']
  sort_direction?: 'asc' | 'desc'
  query?: string
  page?: number
  per_page?: number
}
