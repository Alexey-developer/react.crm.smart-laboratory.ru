import { useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectFiltersMap } from '@redux/Filters/selectors'

import type { FilterType, TFilter } from '@redux/Filters/types'

// Локальный тип взамен legacy `antd/lib/form/interface` (несовместим с antd v6).
// Эквивалентен antd internal Store: ассоциативный массив имя_поля → значение.
type FormStore = Record<string, any>

export const useGetStateCurrentPageFilters = () => {
  const location = useLocation()
  const { pathname } = location

  const stateCurrentPageFilters: FormStore = { deleted: 'only_existing' }

  const filtersMap: Map<FilterType, TFilter[]> = useSelector(selectFiltersMap)

  const currentPageFilters = filtersMap?.get(pathname.slice(1) as FilterType)

  currentPageFilters?.map(currentPageFilter => {
    stateCurrentPageFilters[currentPageFilter['filedName']] =
      currentPageFilter['filedValue']
  })

  return stateCurrentPageFilters
}
