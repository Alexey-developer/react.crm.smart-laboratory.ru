import { RootState } from '../store'

export const selectViewType = (state: RootState) => state.TasksView.viewType
