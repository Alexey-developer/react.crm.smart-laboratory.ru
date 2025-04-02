import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TProjectResponse } from '../responseModels/TProjectResponse'
import type { TProjectParams } from '../params/TProjectParams'
import type { TProject } from '../type/TProject'

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

  store = async (
    project: TProject
  ): Promise<RequestResult<TProjectResponse>> => {
    const result = await this.post<TProjectResponse>(`${this._URI}`, project)

    return result
  }

  update = async (
    project: TProject
  ): Promise<RequestResult<TProjectResponse>> => {
    const result = await this.put<TProjectResponse>(
      `${this._URI}/${project.id}`,
      project
    )

    return result
  }

  destroy = async (id: number): Promise<RequestResult<TProjectResponse>> => {
    const result = await this.delete<TProjectResponse>(`${this._URI}/${id}`)

    return result
  }

  restore = async (id: number): Promise<RequestResult<TProjectResponse>> => {
    const result = await this.Restore<TProjectResponse>(`${this._URI}/${id}`)

    return result
  }
  //   show(id: number): Promise<RequestResult<ProjectResponse>> {
  //     return this.get<ProjectResponse>(`${this._URI}/${id}`)
  //   }
}

// interface ProjectGroup extends CRMAPI {}

// export const projectGroup = new ProjectGroup()
//   'Bearer 1|wcKsc30IAcEAC76Clqlnf9RiNx6lLEtS3oJbuQf2bd8e7f3d'
