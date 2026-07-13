import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TEndpointEnvironmentResponse } from '../responseModels/TEndpointEnvironmentResponse'

export class EndpointEnvironmentGroup extends APIBase implements IBaseModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/endpoint-environments'
  }

  select = data => data.data

  index = async (): Promise<RequestResult<TEndpointEnvironmentResponse[]>> => {
    const result = await this.get<TEndpointEnvironmentResponse[]>(this._URI)
    return result
  }
}
