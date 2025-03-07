import { RootState } from '../store'

export const selectAuthToken = (state: RootState) => state.CurrentUser.authToken
export const selectPerPage = (state: RootState) => state.CurrentUser.perPage
