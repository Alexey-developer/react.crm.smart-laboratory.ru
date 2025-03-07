import { TUser } from '@api/models/user/type/TUser'

export type TCurrentUser = {
  user: TUser
  access_token: string
}
