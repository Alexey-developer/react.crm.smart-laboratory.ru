import { TFilter } from '@api/common/types/TFilter'

export type TCallFilter = TFilter & {
  sortBy:
    | 'created_at'
    | 'updated_at'
    | 'started_at'
    | 'answered_at'
    | 'ended_at'
    | 'session_id'
}
