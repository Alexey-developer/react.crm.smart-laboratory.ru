import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TProjectTypeResponse } from '../responseModels/TProjectTypeResponse'

export class ProjectTypeGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/project-types'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TProjectTypeResponse[]>> => {
    const result = await this.get<TProjectTypeResponse[]>(this._URI)
    return result
  }
}
