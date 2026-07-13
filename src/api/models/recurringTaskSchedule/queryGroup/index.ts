import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TRecurringTaskScheduleResponse } from '../responseModels/TRecurringTaskScheduleResponse'
import type { TRecurringTaskSchedule } from '../type/TRecurringTaskSchedule'

export class RecurringTaskScheduleGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/recurring-task-schedules'
  }

  index = async (): Promise<RequestResult<TRecurringTaskScheduleResponse[]>> =>
    this.get<TRecurringTaskScheduleResponse[]>(this._URI)

  show = async ({
    id,
  }: ID): Promise<RequestResult<TRecurringTaskScheduleResponse>> =>
    this.get<TRecurringTaskScheduleResponse>(`${this._URI}/${id}`)

  store = async (
    entity: TRecurringTaskSchedule
  ): Promise<RequestResult<TRecurringTaskScheduleResponse>> =>
    this.post<TRecurringTaskScheduleResponse>(this._URI, entity)

  update = async (
    entity: TRecurringTaskSchedule
  ): Promise<RequestResult<TRecurringTaskScheduleResponse>> =>
    this.put<TRecurringTaskScheduleResponse>(
      `${this._URI}/${entity.id}`,
      entity
    )

  destroy = async (
    id: number
  ): Promise<RequestResult<TRecurringTaskScheduleResponse>> =>
    this.delete<TRecurringTaskScheduleResponse>(`${this._URI}/${id}`)

  restore = async (
    id: number
  ): Promise<RequestResult<TRecurringTaskScheduleResponse>> =>
    this.Restore<TRecurringTaskScheduleResponse>(`${this._URI}/${id}`)
}
