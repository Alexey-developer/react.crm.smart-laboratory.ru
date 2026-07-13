import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TDirectionResponse } from '../responseModels/TDirectionResponse'
import type { TDirectionParams } from '../params/TDirectionParams'
import type { TDirection } from '../type/TDirection'

export class DirectionGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/directions'
  }

  index = async (
    params?: TDirectionParams
  ): Promise<RequestResult<TDirectionResponse[]>> => {
    const result = await this.get<TDirectionResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({ id }: ID): Promise<RequestResult<TDirectionResponse>> => {
    const result = await this.get<TDirectionResponse>(`${this._URI}/${id}`)

    return result
  }

  store = async (
    direction: TDirection
  ): Promise<RequestResult<TDirectionResponse>> => {
    const result = await this.post<TDirectionResponse>(this._URI, direction)

    return result
  }

  update = async (
    direction: TDirection
  ): Promise<RequestResult<TDirectionResponse>> => {
    const result = await this.put<TDirectionResponse>(
      `${this._URI}/${direction.id}`,
      direction
    )

    return result
  }

  destroy = async (id: number): Promise<RequestResult<TDirectionResponse>> => {
    const result = await this.delete<TDirectionResponse>(`${this._URI}/${id}`)

    return result
  }

  restore = async (id: number): Promise<RequestResult<TDirectionResponse>> => {
    const result = await this.Restore<TDirectionResponse>(`${this._URI}/${id}`)

    return result
  }
}
