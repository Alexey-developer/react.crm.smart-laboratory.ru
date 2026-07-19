import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TCompanyDialNumberResponse } from '../responseModels/TCompanyDialNumberResponse'
import type { TCompanyDialNumberParams } from '../params/TCompanyDialNumberParams'
import type { TCompanyDialNumber } from '../type/TCompanyDialNumber'

export class CompanyDialNumberGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/company-dial-numbers'
  }

  index = async (
    params?: TCompanyDialNumberParams
  ): Promise<RequestResult<TCompanyDialNumberResponse[]>> => {
    const result = await this.get<TCompanyDialNumberResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({
    id,
  }: ID): Promise<RequestResult<TCompanyDialNumberResponse>> => {
    const result = await this.get<TCompanyDialNumberResponse>(
      `${this._URI}/${id}`
    )

    return result
  }

  store = async (
    companyDialNumber: TCompanyDialNumber
  ): Promise<RequestResult<TCompanyDialNumberResponse>> => {
    const result = await this.post<TCompanyDialNumberResponse>(
      this._URI,
      companyDialNumber
    )

    return result
  }

  update = async (
    companyDialNumber: TCompanyDialNumber
  ): Promise<RequestResult<TCompanyDialNumberResponse>> => {
    const result = await this.put<TCompanyDialNumberResponse>(
      `${this._URI}/${companyDialNumber.id}`,
      companyDialNumber
    )

    return result
  }

  destroy = async (
    id: number
  ): Promise<RequestResult<TCompanyDialNumberResponse>> => {
    const result = await this.delete<TCompanyDialNumberResponse>(
      `${this._URI}/${id}`
    )

    return result
  }

  restore = async (
    id: number
  ): Promise<RequestResult<TCompanyDialNumberResponse>> => {
    const result = await this.Restore<TCompanyDialNumberResponse>(
      `${this._URI}/${id}`
    )

    return result
  }
}
