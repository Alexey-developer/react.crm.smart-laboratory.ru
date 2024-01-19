import { RootState } from '../store'

export const selectIsCollapsed = (state: RootState) =>
	state.CollapseSider.isCollapsed
