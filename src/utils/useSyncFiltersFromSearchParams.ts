import { useLayoutEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { setFilters } from '@redux/Filters/slice'
import { selectFiltersMap } from '@redux/Filters/selectors'
import type { FilterType } from '@redux/Filters/types'

import {
  mergeUrlFiltersIntoStore,
  parseFiltersFromSearchParams,
  URL_FILTER_PARAMS,
} from './filtersFromSearchParams'

/** Сохраняет фильтры из URI в Redux/localStorage и убирает обработанные query-параметры. */
export const useSyncFiltersFromSearchParams = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { pathname, search } = location
  const pageKey = pathname.slice(1) as FilterType
  const filtersMap = useSelector(selectFiltersMap)

  useLayoutEffect(() => {
    const urlFilters = parseFiltersFromSearchParams(search)

    if (Object.keys(urlFilters).length === 0) {
      return
    }

    const existingFilters = filtersMap.get(pageKey) ?? []
    const mergedFilters = mergeUrlFiltersIntoStore(existingFilters, urlFilters)

    dispatch(
      setFilters({
        pageKey,
        filters: mergedFilters,
      })
    )

    const params = new URLSearchParams(search)
    for (const param of URL_FILTER_PARAMS) {
      params.delete(param)
    }

    const nextSearch = params.toString()

    navigate(
      {
        pathname,
        search: nextSearch ? `?${nextSearch}` : '',
      },
      { replace: true }
    )
    // filtersMap намеренно не в deps: эффект только на смену URI, не на обновление store после dispatch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, pageKey, pathname, search])
}
