import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TDirectionStatusResponse } from '../responseModels/TDirectionStatusResponse'

export class DirectionStatusGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/direction-statuses'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TDirectionStatusResponse[]>> => {
    const result = await this.get<TDirectionStatusResponse[]>(this._URI)
    return result
  }
}
