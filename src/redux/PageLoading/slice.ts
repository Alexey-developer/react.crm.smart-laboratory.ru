import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ILoadingProgressSliceState, PageIsLoaded } from './types'

const initialState: ILoadingProgressSliceState = {
	pageIsLoaded: false,
}

const pageLoadingSlice = createSlice({
	name: 'pageLoading',
	initialState,
	reducers: {
		setPageIsLoaded(state, action: PayloadAction<PageIsLoaded>) {
			state.pageIsLoaded = action.payload
		},
	},
})

export const { setPageIsLoaded } = pageLoadingSlice.actions

export default pageLoadingSlice.reducer
