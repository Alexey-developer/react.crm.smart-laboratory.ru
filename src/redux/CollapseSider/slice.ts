import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ICollapseSiderSliceState, IsCollapsed } from './types'

const initialState: ICollapseSiderSliceState = {
	isCollapsed: localStorage.getItem('isCollapsed') === 'true' ?? false,
}

const collapseSiderSlice = createSlice({
	name: 'collapseSider',
	initialState,
	reducers: {
		setIsCollapsed(state, action: PayloadAction<IsCollapsed>) {
			state.isCollapsed = action.payload

			localStorage.setItem('isCollapsed', action.payload.toString())
		},
	},
})

export const { setIsCollapsed } = collapseSiderSlice.actions

export default collapseSiderSlice.reducer
