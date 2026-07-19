import { useCallback } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useBroadcastListen } from './useBroadcastListen'

export type UseInvalidateOnBroadcastOptions = {
  channel: string
  event: string
  /** Matches `useAPIQuery` key prefix, e.g. `TelephonyQueuesGroup/`. */
  queryKeyPrefix: string
  enabled?: boolean
  debounceMs?: number
  /** Also invalidate once after WS reconnect (default true). */
  invalidateOnReconnect?: boolean
}

/**
 * Broadcast → React Query invalidate (API remains source of truth).
 */
export const useInvalidateOnBroadcast = ({
  channel,
  event,
  queryKeyPrefix,
  enabled = true,
  debounceMs = 150,
  invalidateOnReconnect = true,
}: UseInvalidateOnBroadcastOptions): void => {
  const queryClient = useQueryClient()

  const invalidate = useCallback(() => {
    void queryClient.invalidateQueries({
      predicate: query =>
        String(query.queryKey[0] ?? '').startsWith(queryKeyPrefix),
    })
  }, [queryClient, queryKeyPrefix])

  useBroadcastListen({
    channel,
    event,
    enabled,
    debounceMs,
    onEvent: invalidate,
    onReconnect: invalidateOnReconnect ? invalidate : undefined,
  })
}
