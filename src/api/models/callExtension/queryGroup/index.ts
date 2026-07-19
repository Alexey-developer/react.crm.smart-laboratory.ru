import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TCallExtensionResponse } from '../responseModels/TCallExtensionResponse'
import type { TCallExtensionParams } from '../params/TCallExtensionParams'
import type { TCallExtension } from '../type/TCallExtension'

export class CallExtensionGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/call-extensions'
  }

  index = async (
    params?: TCallExtensionParams
  ): Promise<RequestResult<TCallExtensionResponse[]>> => {
    const result = await this.get<TCallExtensionResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({ id }: ID): Promise<RequestResult<TCallExtensionResponse>> => {
    const result = await this.get<TCallExtensionResponse>(`${this._URI}/${id}`)

    return result
  }

  store = async (
    callExtension: TCallExtension
  ): Promise<RequestResult<TCallExtensionResponse>> => {
    const result = await this.post<TCallExtensionResponse>(
      this._URI,
      callExtension
    )

    return result
  }

  update = async (
    callExtension: TCallExtension
  ): Promise<RequestResult<TCallExtensionResponse>> => {
    const result = await this.put<TCallExtensionResponse>(
      `${this._URI}/${callExtension.id}`,
      callExtension
    )

    return result
  }

  destroy = async (
    id: number
  ): Promise<RequestResult<TCallExtensionResponse>> => {
    const result = await this.delete<TCallExtensionResponse>(`${this._URI}/${id}`)

    return result
  }

  restore = async (
    id: number
  ): Promise<RequestResult<TCallExtensionResponse>> => {
    const result = await this.Restore<TCallExtensionResponse>(
      `${this._URI}/${id}`
    )

    return result
  }
}
