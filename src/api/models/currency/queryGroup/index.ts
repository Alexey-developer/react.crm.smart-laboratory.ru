import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TCurrencyResponse } from '../responseModels/TCurrencyResponse'

export class CurrencyGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/currencies'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TCurrencyResponse[]>> => {
    const result = await this.get<TCurrencyResponse[]>(this._URI)
    return result
  }
}
