import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TOperatorProfileResponse } from '../responseModels/TOperatorProfileResponse'
import type { TOperatorProfileParams } from '../params/TOperatorProfileParams'
import type { TOperatorProfile } from '../type/TOperatorProfile'

export class OperatorProfileGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/operator-profiles'
  }

  index = async (
    params?: TOperatorProfileParams
  ): Promise<RequestResult<TOperatorProfileResponse[]>> => {
    const result = await this.get<TOperatorProfileResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({
    id,
  }: ID): Promise<RequestResult<TOperatorProfileResponse>> => {
    const result = await this.get<TOperatorProfileResponse>(`${this._URI}/${id}`)

    return result
  }

  store = async (
    entity: TOperatorProfile
  ): Promise<RequestResult<TOperatorProfileResponse>> => {
    const result = await this.post<TOperatorProfileResponse>(this._URI, entity)

    return result
  }

  update = async (
    entity: TOperatorProfile
  ): Promise<RequestResult<TOperatorProfileResponse>> => {
    const result = await this.put<TOperatorProfileResponse>(
      `${this._URI}/${entity.id}`,
      entity
    )

    return result
  }

  destroy = async (
    id: number
  ): Promise<RequestResult<TOperatorProfileResponse>> => {
    const result = await this.delete<TOperatorProfileResponse>(
      `${this._URI}/${id}`
    )

    return result
  }

  restore = async (
    id: number
  ): Promise<RequestResult<TOperatorProfileResponse>> => {
    const result = await this.Restore<TOperatorProfileResponse>(
      `${this._URI}/${id}`
    )

    return result
  }
}
