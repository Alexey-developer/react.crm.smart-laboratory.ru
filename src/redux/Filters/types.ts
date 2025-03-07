import { PROJECTS, TASKS } from '@utils/constants/routes'

import { FilterEnum } from 'utils/getFilter'

export type FilterType = typeof PROJECTS | typeof TASKS

export interface IFiltersSliceState {
  filters: string
}
// export interface IFiltersSliceState {
//   filters?: Map<FilterType, TFilter[]>
// }

// export type FilterFieldName =
export type FilterFieldName = keyof typeof FilterEnum //'id' | 'deleted' | 'created_at'...
export type FilterFieldValue = string | number | null

export type TFilter = {
  filedName: FilterFieldName
  filedValue: FilterFieldValue
}

export type SetFilters = {
  pageKey: FilterType
  filters: TFilter[]
}

// export type Filter = {
//   filedName: FilterFieldName
//   filedValue: string | number
// }

//   const phonePrefixes = new Map<Prefix, PhonePrefixDataType>([
//     [
//       7,
//       { length: 10, mask: '(000)-000-00-00', placeholder: '(___)-___-__-__' },
//     ],
//     [994, { length: 9, mask: '(00)-000-00-00', placeholder: '(__)-___-__-__' }],
//   ])
