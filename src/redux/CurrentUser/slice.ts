import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ICurrentUserSliceState, AuthToken } from './types'

const initialState: ICurrentUserSliceState = {
  //   authToken:
  //     localStorage.getItem('authToken') ??
  //     'Bearer 1|wcKsc30IAcEAC76Clqlnf9RiNx6lLEtS3oJbuQf2bd8e7f3d',
  authToken: localStorage.getItem('authToken') ?? '',
}

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setAuthToken(state, action: PayloadAction<AuthToken>) {
      state.authToken = action.payload

      localStorage.setItem('authToken', state.authToken)
    },
  },
})

export const { setAuthToken } = currentUserSlice.actions

export default currentUserSlice.reducer
