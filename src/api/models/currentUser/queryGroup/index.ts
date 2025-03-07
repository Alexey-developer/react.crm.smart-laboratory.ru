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
}
