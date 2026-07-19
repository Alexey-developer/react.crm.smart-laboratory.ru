import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TBlockedPhoneNumberResponse } from '../responseModels/TBlockedPhoneNumberResponse'
import type { TBlockedPhoneNumberParams } from '../params/TBlockedPhoneNumberParams'
import type { TBlockedPhoneNumber } from '../type/TBlockedPhoneNumber'

export class BlockedPhoneNumberGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/blocked-phone-numbers'
  }

  index = async (
    params?: TBlockedPhoneNumberParams
  ): Promise<RequestResult<TBlockedPhoneNumberResponse[]>> => {
    const result = await this.get<TBlockedPhoneNumberResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({
    id,
  }: ID): Promise<RequestResult<TBlockedPhoneNumberResponse>> => {
    const result = await this.get<TBlockedPhoneNumberResponse>(
      `${this._URI}/${id}`
    )

    return result
  }

  store = async (
    blockedPhoneNumber: TBlockedPhoneNumber
  ): Promise<RequestResult<TBlockedPhoneNumberResponse>> => {
    const result = await this.post<TBlockedPhoneNumberResponse>(
      this._URI,
      blockedPhoneNumber
    )

    return result
  }

  update = async (
    blockedPhoneNumber: TBlockedPhoneNumber
  ): Promise<RequestResult<TBlockedPhoneNumberResponse>> => {
    const result = await this.put<TBlockedPhoneNumberResponse>(
      `${this._URI}/${blockedPhoneNumber.id}`,
      blockedPhoneNumber
    )

    return result
  }

  destroy = async (
    id: number
  ): Promise<RequestResult<TBlockedPhoneNumberResponse>> => {
    const result = await this.delete<TBlockedPhoneNumberResponse>(
      `${this._URI}/${id}`
    )

    return result
  }

  restore = async (
    id: number
  ): Promise<RequestResult<TBlockedPhoneNumberResponse>> => {
    const result = await this.Restore<TBlockedPhoneNumberResponse>(
      `${this._URI}/${id}`
    )

    return result
  }
}
