import { APIBase } from '@api/common/abstract/APIBase'
import { RequestResult } from '@api/common/responseModels/requestResult'

export type TTelephonyQueueCall = {
  id: number
  session_id: string | null
  queue_position: number | null
  preferred_operator_vox_username: string | null
  customer_name: string | null
  customer_phone: string | null
  is_answered: boolean
  started_at: string | null
  answered_at: string | null
}

export type TTelephonyQueues = {
  general_queue: TTelephonyQueueCall[]
  operator_queue: TTelephonyQueueCall[]
  active_calls: TTelephonyQueueCall[]
  can_join_any: boolean
}

export class TelephonyQueuesGroup extends APIBase {
  readonly _URI = '/telephony/queues'

  queues = async (): Promise<RequestResult<TTelephonyQueues>> => {
    return this.get<TTelephonyQueues>(this._URI)
  }

  claim = async (params: {
    call_id: number
  }): Promise<RequestResult<{ ok: boolean; session_id?: string }>> => {
    return this.post<{ ok: boolean; session_id?: string }>(
      `${this._URI}/claim`,
      params
    )
  }
}
