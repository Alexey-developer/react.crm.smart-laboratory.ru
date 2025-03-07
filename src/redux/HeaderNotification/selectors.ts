import { RootState } from '../store'

export const selectNotification = (state: RootState) =>
  state.HeaderNotification.notification
