import { RootState } from '../store'

export const selectPageIsLoaded = (state: RootState) =>
	state.PageLoading.pageIsLoaded
