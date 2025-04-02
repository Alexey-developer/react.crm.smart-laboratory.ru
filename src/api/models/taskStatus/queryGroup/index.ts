import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TTaskStatusResponse } from '../responseModels/TTaskStatusResponse'

export class TaskStatusGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/task-statuses'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TTaskStatusResponse[]>> => {
    const result = await this.get<TTaskStatusResponse[]>(this._URI)
    return result
  }
}
