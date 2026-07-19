import { APIBase } from '@api/common/abstract/APIBase'

import { RequestResult } from '@api/common/responseModels/requestResult'

import { TCurrentUserParams } from '../params/TCurrentUserParams'
import { TCurrentUserResponse } from '../responseModels/TCurrentUserResponse'

export class CurrentUserGroup extends APIBase {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/'
  }

  login = (
    params: TCurrentUserParams
  ): Promise<RequestResult<TCurrentUserResponse>> => {
    return this.post<TCurrentUserResponse>(`${this._URI}login`, params)
  }

  currentUser = (): Promise<RequestResult<TCurrentUserResponse>> => {
    return this.get<TCurrentUserResponse>(`${this._URI}current-user`)
  }

  /**
   * Exchange Bearer auth for a web session cookie, then open Horizon.
   * Requires `withCredentials` so Set-Cookie is accepted (see CORS_ALLOWED_ORIGINS).
   */
  enterHorizon = (): Promise<RequestResult<{ url: string }>> => {
    return this._httpClient.request<{ url: string }>({
      method: 'POST',
      url: `${this._URI}horizon/enter`,
      withCredentials: true,
    })
  }
}
