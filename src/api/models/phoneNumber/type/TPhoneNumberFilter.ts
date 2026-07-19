import { TFilter } from '@api/common/types/TFilter'

export type TPhoneNumberFilter = TFilter & {
  sortBy: 'e164' | 'label' | 'created_at' | 'updated_at'
}
