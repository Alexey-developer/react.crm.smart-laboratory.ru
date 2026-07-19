import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TPhoneNumberResponse } from '../responseModels/TPhoneNumberResponse'
import type { TPhoneNumberParams } from '../params/TPhoneNumberParams'
import type { TPhoneNumber } from '../type/TPhoneNumber'

export class PhoneNumberGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/phone-numbers'
  }

  index = async (
    params?: TPhoneNumberParams
  ): Promise<RequestResult<TPhoneNumberResponse[]>> => {
    const result = await this.get<TPhoneNumberResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({ id }: ID): Promise<RequestResult<TPhoneNumberResponse>> => {
    const result = await this.get<TPhoneNumberResponse>(`${this._URI}/${id}`)

    return result
  }

  store = async (
    phoneNumber: TPhoneNumber
  ): Promise<RequestResult<TPhoneNumberResponse>> => {
    const result = await this.post<TPhoneNumberResponse>(this._URI, phoneNumber)

    return result
  }

  update = async (
    phoneNumber: TPhoneNumber
  ): Promise<RequestResult<TPhoneNumberResponse>> => {
    const result = await this.put<TPhoneNumberResponse>(
      `${this._URI}/${phoneNumber.id}`,
      phoneNumber
    )

    return result
  }

  destroy = async (
    id: number
  ): Promise<RequestResult<TPhoneNumberResponse>> => {
    const result = await this.delete<TPhoneNumberResponse>(`${this._URI}/${id}`)

    return result
  }

  restore = async (
    id: number
  ): Promise<RequestResult<TPhoneNumberResponse>> => {
    const result = await this.Restore<TPhoneNumberResponse>(`${this._URI}/${id}`)

    return result
  }
}
