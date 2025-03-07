import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TCustomerCompanyResponse } from '../responseModels/TCustomerCompanyResponse'
import { TCustomerCompanyParams } from '../params/TCustomerCompanyParams'

export class CustomerCompanyGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/customer-companies'
  }
  //   select = data => data.data
  index = async (
    params?: TCustomerCompanyParams
  ): Promise<RequestResult<TCustomerCompanyResponse[]>> => {
    const result = await this.get<TCustomerCompanyResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async (
    id: number
  ): Promise<RequestResult<TCustomerCompanyResponse>> => {
    const result = await this.get<TCustomerCompanyResponse>(
      `${this._URI}/${id}`
    )

    return result
  }
  store = async (): Promise<RequestResult<TCustomerCompanyResponse>> => {
    const result = await this.post<TCustomerCompanyResponse>(`${this._URI}`)

    return result
  }
  update = async (
    id: number
  ): Promise<RequestResult<TCustomerCompanyResponse>> => {
    const result = await this.put<TCustomerCompanyResponse>(
      `${this._URI}/${id}`
    )

    return result
  }
  destroy = async (
    id: number
  ): Promise<RequestResult<TCustomerCompanyResponse>> => {
    const result = await this.delete<TCustomerCompanyResponse>(
      `${this._URI}/${id}`
    )

    return result
  }
  restore = async (
    id: number
  ): Promise<RequestResult<TCustomerCompanyResponse>> => {
    const result = await this.post<TCustomerCompanyResponse>(
      `${this._URI}/${id}/${this._restoreUri}`
    )

    return result
  }
}
