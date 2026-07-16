import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TWorkerProfileResponse } from '../responseModels/TWorkerProfileResponse'
import type { TWorkerProfileParams } from '../params/TWorkerProfileParams'
import type { TWorkerProfile } from '../type/TWorkerProfile'

export class WorkerProfileGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/worker-profiles'
  }

  index = async (
    params?: TWorkerProfileParams
  ): Promise<RequestResult<TWorkerProfileResponse[]>> => {
    const result = await this.get<TWorkerProfileResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({ id }: ID): Promise<RequestResult<TWorkerProfileResponse>> => {
    const result = await this.get<TWorkerProfileResponse>(`${this._URI}/${id}`)

    return result
  }

  store = async (
    entity: TWorkerProfile
  ): Promise<RequestResult<TWorkerProfileResponse>> => {
    const result = await this.post<TWorkerProfileResponse>(this._URI, entity)

    return result
  }

  update = async (
    entity: TWorkerProfile
  ): Promise<RequestResult<TWorkerProfileResponse>> => {
    const result = await this.put<TWorkerProfileResponse>(
      `${this._URI}/${entity.id}`,
      entity
    )

    return result
  }

  destroy = async (
    id: number
  ): Promise<RequestResult<TWorkerProfileResponse>> => {
    const result = await this.delete<TWorkerProfileResponse>(
      `${this._URI}/${id}`
    )

    return result
  }

  restore = async (
    id: number
  ): Promise<RequestResult<TWorkerProfileResponse>> => {
    const result = await this.Restore<TWorkerProfileResponse>(
      `${this._URI}/${id}`
    )

    return result
  }
}
