import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getMapFromString } from './helpers'

export const selectFilters = (state: RootState) => state.Filters.filters

export const selectFiltersMap = createSelector([selectFilters], filters => {
  return getMapFromString(filters)
})
