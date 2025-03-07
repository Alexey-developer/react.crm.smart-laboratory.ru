import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ICurrentUserSliceState, AuthToken, PerPage } from './types'

const initialState: ICurrentUserSliceState = {
  authToken: localStorage.getItem('authToken') ?? '',
  perPage: parseInt(localStorage.getItem('perPage') ?? '15') as PerPage,
}

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setAuthToken(state, action: PayloadAction<AuthToken>) {
      state.authToken = action.payload

      localStorage.setItem('authToken', state.authToken)
    },
    setPerPage(state, action: PayloadAction<PerPage>) {
      state.perPage = action.payload

      localStorage.setItem('perPage', `${state.perPage}`)
    },
  },
})

export const { setAuthToken, setPerPage } = currentUserSlice.actions

export default currentUserSlice.reducer
