import { APIBase } from '@api/common/abstract/APIBase'
import { RequestResult } from '@api/common/responseModels/requestResult'

export type TVoximplantAccountOverview = {
  configured: boolean
  account: {
    balance: number | null
    currency: string | null
    account_name: string | null
    low_balance: boolean
    low_balance_threshold_rub: number
    low_balance_threshold_usd: number
    low_balance_threshold: number | null
  } | null
  phone_numbers: Array<Record<string, unknown>>
}

export class TelephonyAccountGroup extends APIBase {
  readonly _URI = '/telephony/account-overview'

  overview = async (): Promise<RequestResult<TVoximplantAccountOverview>> => {
    return this.get<TVoximplantAccountOverview>(this._URI)
  }
}
