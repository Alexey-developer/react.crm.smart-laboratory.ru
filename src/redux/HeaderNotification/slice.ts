import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { IHeaderNotificationSliceState, Notification } from './types'

const initialState: IHeaderNotificationSliceState = {
  notification: { title: '', text: '', type: 'INFO' },
}

const headerNotificationSlice = createSlice({
  name: 'headerNotification',
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<Notification>) {
      state.notification = action.payload
    },
  },
})

export const { setNotification } = headerNotificationSlice.actions

export default headerNotificationSlice.reducer
