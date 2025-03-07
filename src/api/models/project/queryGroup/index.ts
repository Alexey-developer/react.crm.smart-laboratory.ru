import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TProjectResponse } from '../responseModels/TProjectResponse'
import { TProjectParams } from '../params/TProjectParams'

export class ProjectGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/projects'
  }

  index = async (
    params?: TProjectParams
  ): Promise<RequestResult<TProjectResponse[]>> => {
    const result = await this.get<TProjectResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({ id }: ID): Promise<RequestResult<TProjectResponse>> => {
    const result = await this.get<TProjectResponse>(`${this._URI}/${id}`)

    return result
  }
  store = async (): Promise<RequestResult<TProjectResponse>> => {
    const result = await this.post<TProjectResponse>(`${this._URI}`)

    return result
  }
  update = async (id: number): Promise<RequestResult<TProjectResponse>> => {
    const result = await this.put<TProjectResponse>(`${this._URI}/${id}`)

    return result
  }
  destroy = async (id: number): Promise<RequestResult<TProjectResponse>> => {
    const result = await this.delete<TProjectResponse>(`${this._URI}/${id}`)

    return result
  }
  restore = async (id: number): Promise<RequestResult<TProjectResponse>> => {
    const result = await this.post<TProjectResponse>(
      `${this._URI}/${id}/${this._restoreUri}`
    )

    return result
  }
  //   show(id: number): Promise<RequestResult<ProjectResponse>> {
  //     return this.get<ProjectResponse>(`${this._URI}/${id}`)
  //   }
}

// interface ProjectGroup extends CRMAPI {}

// export const projectGroup = new ProjectGroup()
//   'Bearer 1|wcKsc30IAcEAC76Clqlnf9RiNx6lLEtS3oJbuQf2bd8e7f3d'
