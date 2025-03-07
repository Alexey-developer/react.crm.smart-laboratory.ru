import { useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectFiltersMap } from '@redux/Filters/selectors'

import type { FilterType, TFilter } from '@redux/Filters/types'

import type { Store } from 'antd/lib/form/interface'

export const useGetStateCurrentPageFilters = () => {
  const location = useLocation()
  const { pathname } = location

  const stateCurrentPageFilters: Store = { deleted: 'only_existing' }

  const filtersMap: Map<FilterType, TFilter[]> = useSelector(selectFiltersMap)

  const currentPageFilters = filtersMap?.get(pathname.slice(1) as FilterType)

  currentPageFilters?.map(currentPageFilter => {
    stateCurrentPageFilters[currentPageFilter['filedName']] =
      currentPageFilter['filedValue']
  })

  return stateCurrentPageFilters
}
