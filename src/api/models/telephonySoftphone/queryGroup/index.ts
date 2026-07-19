import { APIBase } from '@api/common/abstract/APIBase'
import { RequestResult } from '@api/common/responseModels/requestResult'

export type TSoftphoneCredentials = {
  available: boolean
  reason: string | null
  vox_username: string | null
  vox_password: string | null
  softphone_enabled: boolean
}

export class TelephonySoftphoneGroup extends APIBase {
  readonly _URI = '/telephony/softphone-credentials'

  credentials = async (): Promise<RequestResult<TSoftphoneCredentials>> => {
    return this.get<TSoftphoneCredentials>(this._URI)
  }
}
