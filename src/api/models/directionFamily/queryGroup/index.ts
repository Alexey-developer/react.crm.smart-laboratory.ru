import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TDirectionFamilyResponse } from '../responseModels/TDirectionFamilyResponse'

export class DirectionFamilyGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/direction-families'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TDirectionFamilyResponse[]>> => {
    const result = await this.get<TDirectionFamilyResponse[]>(this._URI)
    return result
  }
}
