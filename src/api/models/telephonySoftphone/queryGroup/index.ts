import { APIBase } from '@api/common/abstract/APIBase'
import { RequestResult } from '@api/common/responseModels/requestResult'

export type TSoftphoneCredentials = {
  available: boolean
  reason: string | null
  vox_username: string | null
  vox_password: string | null
  softphone_enabled: boolean
}

export type TSoftphonePreferences = {
  has_operator_profile: boolean
  is_active: boolean
  softphone_enabled: boolean
  mobile_dialer_enabled: boolean
  mobile_dialer_locked: boolean
  phone_number_id: number | null
  phone_e164: string | null
}

export class TelephonySoftphoneGroup extends APIBase {
  readonly _URI = '/telephony/softphone-credentials'
  readonly _prefsURI = '/telephony/softphone-preferences'

  credentials = async (): Promise<RequestResult<TSoftphoneCredentials>> => {
    return this.get<TSoftphoneCredentials>(this._URI)
  }

  preferences = async (): Promise<RequestResult<TSoftphonePreferences>> => {
    return this.get<TSoftphonePreferences>(this._prefsURI)
  }

  updatePreferences = async (params: {
    softphone_enabled?: boolean
    mobile_dialer_enabled?: boolean
  }): Promise<RequestResult<TSoftphonePreferences>> => {
    return this.patch<TSoftphonePreferences>(this._prefsURI, params)
  }
}
