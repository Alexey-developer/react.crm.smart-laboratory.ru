import { TFilter } from '@api/common/types/TFilter'

export type TWorkTimeRangeFilter = TFilter & {
  sortBy:
    | 'start_at'
    | 'end_at'
    | 'total_time'
    | 'money'
    | 'created_at'
    | 'updated_at'
}
