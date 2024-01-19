import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { IThemeSliceState, CurrentTheme } from './types'

const initialState: IThemeSliceState = {
	currentTheme:
		(localStorage.getItem('currentTheme') as CurrentTheme) ?? 'dark',
}

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setCurrentTheme(state, action: PayloadAction<CurrentTheme>) {
			state.currentTheme = action.payload

			localStorage.setItem('currentTheme', action.payload)
		},
	},
})

export const { setCurrentTheme } = themeSlice.actions

export default themeSlice.reducer
