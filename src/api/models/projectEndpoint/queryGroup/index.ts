import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TProjectEndpointResponse } from '../responseModels/TProjectEndpointResponse'
import type { TProjectEndpoint } from '../type/TProjectEndpoint'

export class ProjectEndpointGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/project-endpoints'
  }

  index = async (): Promise<RequestResult<TProjectEndpointResponse[]>> =>
    this.get<TProjectEndpointResponse[]>(this._URI)

  show = async ({ id }: ID): Promise<RequestResult<TProjectEndpointResponse>> =>
    this.get<TProjectEndpointResponse>(`${this._URI}/${id}`)

  store = async (
    entity: TProjectEndpoint
  ): Promise<RequestResult<TProjectEndpointResponse>> =>
    this.post<TProjectEndpointResponse>(this._URI, entity)

  update = async (
    entity: TProjectEndpoint
  ): Promise<RequestResult<TProjectEndpointResponse>> =>
    this.put<TProjectEndpointResponse>(`${this._URI}/${entity.id}`, entity)

  destroy = async (id: number): Promise<RequestResult<TProjectEndpointResponse>> =>
    this.delete<TProjectEndpointResponse>(`${this._URI}/${id}`)

  restore = async (id: number): Promise<RequestResult<TProjectEndpointResponse>> =>
    this.Restore<TProjectEndpointResponse>(`${this._URI}/${id}`)
}
