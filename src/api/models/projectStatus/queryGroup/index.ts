import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TProjectStatusResponse } from '../responseModels/TProjectStatusResponse'

export class ProjectStatusGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/project-statuses'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TProjectStatusResponse[]>> => {
    const result = await this.get<TProjectStatusResponse[]>(this._URI)
    return result
  }
}
