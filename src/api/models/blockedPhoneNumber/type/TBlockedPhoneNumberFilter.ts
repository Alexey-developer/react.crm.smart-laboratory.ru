import type { TFilter } from '@api/common/types/TFilter'

export type TBlockedPhoneNumberFilter = TFilter & {
  sortBy: 'e164' | 'created_at'
}
