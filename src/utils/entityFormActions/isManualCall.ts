import type { TCallSource } from '@api/models/call/type/TCall'

export const CALL_SOURCE_MANUAL: TCallSource = 'Types.Call.manual'

export const isManualCall = (call: { source?: string | null }): boolean =>
  call.source === CALL_SOURCE_MANUAL
