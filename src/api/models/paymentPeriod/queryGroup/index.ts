import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TPaymentPeriodResponse } from '../responseModels/TPaymentPeriodResponse'

export class PaymentPeriodGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/payment-periods'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TPaymentPeriodResponse[]>> => {
    const result = await this.get<TPaymentPeriodResponse[]>(this._URI)
    return result
  }
}
