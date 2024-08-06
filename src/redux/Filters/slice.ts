import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {
  IFiltersSliceState,
  SetFilters,
  FilterType,
  TFilter,
} from './types'
import { getMapFromString, getStringFromMap } from './helpers'

const initialState: IFiltersSliceState = {
  filters: localStorage.getItem('filters') ?? '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<SetFilters>) {
      const filtersMap: Map<FilterType, TFilter[]> = getMapFromString(
        state.filters
      )
      filtersMap.delete(action.payload.pageKey)
      filtersMap.set(action.payload.pageKey, action.payload.filters)

      state.filters = getStringFromMap(filtersMap)
      localStorage.setItem('filters', state.filters)

      //   if (!state.filters) state.filters = new Map<FilterType, TFilter[]>()
      //   else state.filters.delete(action.payload.pageKey)
      //   state.filters.set(action.payload.pageKey, action.payload.filters)

      //   localStorage.setItem('filters', getStringFromMap(state.filters))
    },
  },
})

export const { setFilters } = filtersSlice.actions

export default filtersSlice.reducer
