import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TDirectionBillingPeriodResponse } from '../responseModels/TDirectionBillingPeriodResponse'
import type { TDirectionBillingPeriod } from '../type/TDirectionBillingPeriod'

export class DirectionBillingPeriodGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/direction-billing-periods'
  }

  index = async (): Promise<RequestResult<TDirectionBillingPeriodResponse[]>> =>
    this.get<TDirectionBillingPeriodResponse[]>(this._URI)

  show = async ({
    id,
  }: ID): Promise<RequestResult<TDirectionBillingPeriodResponse>> =>
    this.get<TDirectionBillingPeriodResponse>(`${this._URI}/${id}`)

  store = async (
    entity: TDirectionBillingPeriod
  ): Promise<RequestResult<TDirectionBillingPeriodResponse>> =>
    this.post<TDirectionBillingPeriodResponse>(this._URI, entity)

  update = async (
    entity: TDirectionBillingPeriod
  ): Promise<RequestResult<TDirectionBillingPeriodResponse>> =>
    this.put<TDirectionBillingPeriodResponse>(
      `${this._URI}/${entity.id}`,
      entity
    )

  destroy = async (
    id: number
  ): Promise<RequestResult<TDirectionBillingPeriodResponse>> =>
    this.delete<TDirectionBillingPeriodResponse>(`${this._URI}/${id}`)

  restore = async (
    id: number
  ): Promise<RequestResult<TDirectionBillingPeriodResponse>> =>
    this.Restore<TDirectionBillingPeriodResponse>(`${this._URI}/${id}`)
}
