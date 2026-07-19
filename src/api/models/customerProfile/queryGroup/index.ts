import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TCustomerProfileResponse } from '../responseModels/TCustomerProfileResponse'
import type { TCustomerProfileParams } from '../params/TCustomerProfileParams'
import type { TCustomerProfile } from '../type/TCustomerProfile'

export class CustomerProfileGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/customer-profiles'
  }

  index = async (
    params?: TCustomerProfileParams
  ): Promise<RequestResult<TCustomerProfileResponse[]>> => {
    const result = await this.get<TCustomerProfileResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({
    id,
  }: ID): Promise<RequestResult<TCustomerProfileResponse>> => {
    const result = await this.get<TCustomerProfileResponse>(
      `${this._URI}/${id}`
    )

    return result
  }

  store = async (
    customerProfile: TCustomerProfile
  ): Promise<RequestResult<TCustomerProfileResponse>> => {
    const result = await this.post<TCustomerProfileResponse>(
      this._URI,
      customerProfile
    )

    return result
  }

  update = async (
    customerProfile: TCustomerProfile
  ): Promise<RequestResult<TCustomerProfileResponse>> => {
    const result = await this.put<TCustomerProfileResponse>(
      `${this._URI}/${customerProfile.id}`,
      customerProfile
    )

    return result
  }

  destroy = async (
    id: number
  ): Promise<RequestResult<TCustomerProfileResponse>> => {
    const result = await this.delete<TCustomerProfileResponse>(
      `${this._URI}/${id}`
    )

    return result
  }

  restore = async (
    id: number
  ): Promise<RequestResult<TCustomerProfileResponse>> => {
    const result = await this.Restore<TCustomerProfileResponse>(
      `${this._URI}/${id}`
    )

    return result
  }
}
