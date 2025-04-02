import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TTaskResponse } from '../responseModels/TTaskResponse'
import { TTaskParams } from '../params/TTaskParams'

export class TaskGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/tasks'
  }

  index = async (
    params?: TTaskParams
  ): Promise<RequestResult<TTaskResponse[]>> => {
    const result = await this.get<TTaskResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({ id }: ID): Promise<RequestResult<TTaskResponse>> => {
    const result = await this.get<TTaskResponse>(`${this._URI}/${id}`)

    return result
  }
  store = async (): Promise<RequestResult<TTaskResponse>> => {
    const result = await this.post<TTaskResponse>(`${this._URI}`)

    return result
  }
  update = async (id: number): Promise<RequestResult<TTaskResponse>> => {
    const result = await this.put<TTaskResponse>(`${this._URI}/${id}`)

    return result
  }
  destroy = async (id: number): Promise<RequestResult<TTaskResponse>> => {
    const result = await this.delete<TTaskResponse>(`${this._URI}/${id}`)

    return result
  }
  restore = async (id: number): Promise<RequestResult<TTaskResponse>> => {
    const result = await this.post<TTaskResponse>(
      `${this._URI}/${id}/${this._restoreUri}`
    )

    return result
  }
}
