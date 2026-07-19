import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TPhoneNumber } from '@api/models/phoneNumber/type/TPhoneNumber'
import { TOperatorProfile } from '@api/models/operatorProfile/type/TOperatorProfile'
import { TCustomerCompany } from '@api/models/customerCompany/type/TCustomerCompany'
import { TCustomerProfile } from '@api/models/customerProfile/type/TCustomerProfile'
import { TWorkTimeRange } from '@api/models/workTimeRange/type/TWorkTimeRange'

export type TCallDirection = 'inbound' | 'outbound'

export type TCallSource =
  | 'Types.Call.telephony_inbound'
  | 'Types.Call.telephony_outbound'
  | 'Types.Call.mobile_dialer'
  | 'Types.Call.website_online'
  | 'Types.Call.manual'

export type TCall = TEntityBaseModel & {
  session_id: string | null
  source: TCallSource
  direction: TCallDirection
  is_answered: boolean
  is_missed: boolean
  customer_phone_number_id: number
  operator_phone_number_id: number | null
  operator_profile_id: number | null
  customer_company_id: number | null
  customer_profile_id: number | null
  work_time_range_id: number | null
  dialed_company_number: string | null
  call_record_transcription_text: string | null
  call_record_private_path: string | null
  call_record_url: string | null
  call_record_expiration_date: string | null
  log_file_url: string | null
  csat_quality: number | null
  csat_recommend: number | null
  csat_resolved: number | null
  csat_speed: number | null
  call_duration_seconds: number
  call_total_duration_seconds: number
  started_at: string | null
  answered_at: string | null
  ended_at: string | null
  comment: string | null
  customer_phone_number?: TPhoneNumber
  operator_phone_number?: TPhoneNumber
  operator_profile?: TOperatorProfile
  customer_company?: TCustomerCompany
  customer_profile?: TCustomerProfile
  work_time_range?: TWorkTimeRange
}
