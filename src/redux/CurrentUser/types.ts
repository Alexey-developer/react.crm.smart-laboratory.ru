export interface ICurrentUserSliceState {
  authToken: AuthToken
  perPage: PerPage
}
export type AuthToken = string

export const PerPageOptions = [16, 32, 64] as const
export type PerPage = (typeof PerPageOptions)[number]
