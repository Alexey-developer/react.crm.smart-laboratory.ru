export interface IHeaderNotificationSliceState {
  notification: Notification
}
export type Notification = {
  title: string
  text: string
  type: 'INFO' | 'SUCCESS' | 'ERROR'
  duration?: number
}
