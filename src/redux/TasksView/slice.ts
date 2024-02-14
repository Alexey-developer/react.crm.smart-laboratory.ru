import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ITasksViewSliceState, ViewType } from './types'

const initialState: ITasksViewSliceState = {
  viewType: (localStorage.getItem('viewType') as ViewType) ?? 'list',
}

const tasksViewSlice = createSlice({
  name: 'tasksView',
  initialState,
  reducers: {
    setViewType(state, action: PayloadAction<ViewType>) {
      state.viewType = action.payload

      localStorage.setItem('viewType', action.payload)
    },
  },
})

export const { setViewType } = tasksViewSlice.actions

export default tasksViewSlice.reducer
