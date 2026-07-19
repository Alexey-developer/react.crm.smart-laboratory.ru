import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TCallResponse } from '../responseModels/TCallResponse'
import type { TCallParams } from '../params/TCallParams'
import type { TCall } from '../type/TCall'

export class CallGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/calls'
  }

  index = async (
    params?: TCallParams
  ): Promise<RequestResult<TCallResponse[]>> => {
    const result = await this.get<TCallResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({ id }: ID): Promise<RequestResult<TCallResponse>> => {
    const result = await this.get<TCallResponse>(`${this._URI}/${id}`)

    return result
  }

  store = async (call: TCall): Promise<RequestResult<TCallResponse>> => {
    const result = await this.post<TCallResponse>(this._URI, call)

    return result
  }

  update = async (call: TCall): Promise<RequestResult<TCallResponse>> => {
    const result = await this.put<TCallResponse>(
      `${this._URI}/${call.id}`,
      call
    )

    return result
  }

  destroy = async (id: number): Promise<RequestResult<TCallResponse>> => {
    const result = await this.delete<TCallResponse>(`${this._URI}/${id}`)

    return result
  }

  restore = async (id: number): Promise<RequestResult<TCallResponse>> => {
    const result = await this.Restore<TCallResponse>(`${this._URI}/${id}`)

    return result
  }
}
