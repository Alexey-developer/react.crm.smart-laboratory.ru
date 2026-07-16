import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TWorkTimeRangeResponse } from '../responseModels/TWorkTimeRangeResponse'
import type { TWorkTimeRangeParams } from '../params/TWorkTimeRangeParams'
import type { TWorkTimeRange } from '../type/TWorkTimeRange'

export class WorkTimeRangeGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/work-time-ranges'
  }

  index = async (
    params?: TWorkTimeRangeParams
  ): Promise<RequestResult<TWorkTimeRangeResponse[]>> => {
    const result = await this.get<TWorkTimeRangeResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({ id }: ID): Promise<RequestResult<TWorkTimeRangeResponse>> => {
    const result = await this.get<TWorkTimeRangeResponse>(`${this._URI}/${id}`)

    return result
  }

  store = async (
    entity: TWorkTimeRange
  ): Promise<RequestResult<TWorkTimeRangeResponse>> => {
    const result = await this.post<TWorkTimeRangeResponse>(this._URI, entity)

    return result
  }

  update = async (
    entity: TWorkTimeRange
  ): Promise<RequestResult<TWorkTimeRangeResponse>> => {
    const result = await this.put<TWorkTimeRangeResponse>(
      `${this._URI}/${entity.id}`,
      entity
    )

    return result
  }

  destroy = async (
    id: number
  ): Promise<RequestResult<TWorkTimeRangeResponse>> => {
    const result = await this.delete<TWorkTimeRangeResponse>(
      `${this._URI}/${id}`
    )

    return result
  }

  restore = async (
    id: number
  ): Promise<RequestResult<TWorkTimeRangeResponse>> => {
    const result = await this.Restore<TWorkTimeRangeResponse>(
      `${this._URI}/${id}`
    )

    return result
  }
}
