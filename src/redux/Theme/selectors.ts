import { RootState } from '../store'

export const selectCurrentTheme = (state: RootState) => state.Theme.currentTheme
