import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TBillingDocumentStatusResponse } from '../responseModels/TBillingDocumentStatusResponse'

export class BillingDocumentStatusGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/billing-document-statuses'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TBillingDocumentStatusResponse[]>> => {
    const result = await this.get<TBillingDocumentStatusResponse[]>(this._URI)
    return result
  }
}
