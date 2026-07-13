import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TDirectionTypeResponse } from '../responseModels/TDirectionTypeResponse'

export class DirectionTypeGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/direction-types'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TDirectionTypeResponse[]>> => {
    const result = await this.get<TDirectionTypeResponse[]>(this._URI)
    return result
  }
}
