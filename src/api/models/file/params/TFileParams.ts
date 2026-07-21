import type { TFileFilter } from '../type/TFileFilter'

export type TFileParams = TFileFilter & {
  page?: number
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}
