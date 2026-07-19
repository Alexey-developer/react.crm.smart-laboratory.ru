import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TEmploymentFormResponse } from '../responseModels/TEmploymentFormResponse'

export class EmploymentFormGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/employment-forms'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TEmploymentFormResponse[]>> => {
    const result = await this.get<TEmploymentFormResponse[]>(this._URI)
    return result
  }
}
