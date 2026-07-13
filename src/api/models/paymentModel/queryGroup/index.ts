import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TPaymentModelResponse } from '../responseModels/TPaymentModelResponse'

export class PaymentModelGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/payment-models'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TPaymentModelResponse[]>> => {
    const result = await this.get<TPaymentModelResponse[]>(this._URI)
    return result
  }
}
