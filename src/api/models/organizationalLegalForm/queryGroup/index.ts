import { APIBase } from '@api/common/abstract/APIBase'
import { IBaseModel } from '@api/common/interfaces/IBaseModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import { TOrganizationalLegalFormResponse } from '../responseModels/TOrganizationalLegalFormResponse'

export class OrganizationalLegalFormGroup
  extends APIBase
  implements IBaseModel
{
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/organizational-legal-forms'
  }

  select = (data: { data: unknown }) => data.data

  index = async (): Promise<
    RequestResult<TOrganizationalLegalFormResponse[]>
  > => {
    const result = await this.get<TOrganizationalLegalFormResponse[]>(
      this._URI
    )
    return result
  }
}
