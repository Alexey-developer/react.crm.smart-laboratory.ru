import { TFilter } from '@api/common/types/TFilter'

export type TCompanyDialNumberFilter = TFilter & {
  sortBy: 'e164' | 'label' | 'created_at' | 'updated_at'
}
