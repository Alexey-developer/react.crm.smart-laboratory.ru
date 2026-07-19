import { useInvalidateOnBroadcast } from './useInvalidateOnBroadcast'

/** Laravel PrivateChannel name (without `private-` prefix). */
export const TELEPHONY_QUEUE_CHANNEL = 'telephony.queue'

/**
 * Custom broadcastAs from TelephonyQueueUpdated.
 * Echo `.listen` needs a leading dot for non-namespaced events.
 */
export const TELEPHONY_QUEUE_EVENT = '.telephony.queue.updated'

export type TelephonyQueueUpdatedPayload = {
  reason: string
  call_id: number | null
}

/**
 * Queue board realtime via shared broadcast abstractions.
 * No refetchInterval.
 */
export const useTelephonyQueueSocket = (enabled = true) => {
  useInvalidateOnBroadcast({
    channel: TELEPHONY_QUEUE_CHANNEL,
    event: TELEPHONY_QUEUE_EVENT,
    queryKeyPrefix: 'TelephonyQueuesGroup/',
    enabled,
    debounceMs: 150,
    invalidateOnReconnect: true,
  })
}
