import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TRecurrenceTypeResponse } from '../responseModels/TRecurrenceTypeResponse'

export class RecurrenceTypeGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/recurrence-types'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TRecurrenceTypeResponse[]>> => {
    const result = await this.get<TRecurrenceTypeResponse[]>(this._URI)
    return result
  }
}
