import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TCustomerCompanyResponse } from '../responseModels/TCustomerCompanyResponse'
import type { TCustomerCompanyParams } from '../params/TCustomerCompanyParams'
import type { TCustomerCompany } from '../type/TCustomerCompany'

export class CustomerCompanyGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/customer-companies'
  }

  index = async (
    params?: TCustomerCompanyParams
  ): Promise<RequestResult<TCustomerCompanyResponse[]>> => {
    const result = await this.get<TCustomerCompanyResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({
    id,
  }: ID): Promise<RequestResult<TCustomerCompanyResponse>> => {
    const result = await this.get<TCustomerCompanyResponse>(
      `${this._URI}/${id}`
    )

    return result
  }

  store = async (
    entity: TCustomerCompany
  ): Promise<RequestResult<TCustomerCompanyResponse>> => {
    const result = await this.post<TCustomerCompanyResponse>(
      this._URI,
      entity
    )

    return result
  }

  update = async (
    entity: TCustomerCompany
  ): Promise<RequestResult<TCustomerCompanyResponse>> => {
    const result = await this.put<TCustomerCompanyResponse>(
      `${this._URI}/${entity.id}`,
      entity
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
    const result = await this.Restore<TCustomerCompanyResponse>(
      `${this._URI}/${id}`
    )

    return result
  }
}
