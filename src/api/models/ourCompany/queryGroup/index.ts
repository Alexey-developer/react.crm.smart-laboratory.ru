import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TOurCompanyResponse } from '../responseModels/TOurCompanyResponse'
import type { TOurCompanyParams } from '../params/TOurCompanyParams'
import type { TOurCompany } from '../type/TOurCompany'

export class OurCompanyGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/our-companies'
  }

  index = async (
    params?: TOurCompanyParams
  ): Promise<RequestResult<TOurCompanyResponse[]>> => {
    const result = await this.get<TOurCompanyResponse[]>(this._URI, {
      ...params,
    })

    return result
  }

  show = async ({ id }: ID): Promise<RequestResult<TOurCompanyResponse>> => {
    const result = await this.get<TOurCompanyResponse>(`${this._URI}/${id}`)

    return result
  }

  store = async (
    entity: TOurCompany
  ): Promise<RequestResult<TOurCompanyResponse>> => {
    const result = await this.post<TOurCompanyResponse>(this._URI, entity)

    return result
  }

  update = async (
    entity: TOurCompany
  ): Promise<RequestResult<TOurCompanyResponse>> => {
    const result = await this.put<TOurCompanyResponse>(
      `${this._URI}/${entity.id}`,
      entity
    )

    return result
  }

  destroy = async (
    id: number
  ): Promise<RequestResult<TOurCompanyResponse>> => {
    const result = await this.delete<TOurCompanyResponse>(`${this._URI}/${id}`)

    return result
  }

  restore = async (
    id: number
  ): Promise<RequestResult<TOurCompanyResponse>> => {
    const result = await this.Restore<TOurCompanyResponse>(`${this._URI}/${id}`)

    return result
  }
}
