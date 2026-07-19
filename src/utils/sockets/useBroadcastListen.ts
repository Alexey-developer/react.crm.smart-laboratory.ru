import { useEffect, useRef } from 'react'

import { useRealtime } from '@components/RealtimeProvider'

export type UseBroadcastListenOptions<TPayload> = {
  /** Private channel name without `private-` prefix. */
  channel: string
  /**
   * Echo event name. Custom `broadcastAs` → leading dot
   * (e.g. `.telephony.queue.updated`).
   */
  event: string
  enabled?: boolean
  onEvent: (payload: TPayload) => void
  /** Fired once after a reconnect (not on first connect). */
  onReconnect?: () => void
  /** Coalesce burst events; 0 = immediate. */
  debounceMs?: number
}

/**
 * Shared private-channel listener with ref-counted acquire/release.
 * Stable handler via ref (safe to pass inline `onEvent`).
 * Prefer this over calling Echo from feature components directly.
 */
export const useBroadcastListen = <TPayload = unknown>({
  channel,
  event,
  enabled = true,
  onEvent,
  onReconnect,
  debounceMs = 0,
}: UseBroadcastListenOptions<TPayload>): void => {
  const { echo, status, acquirePrivateChannel, releasePrivateChannel } =
    useRealtime()

  const onEventRef = useRef(onEvent)
  const onReconnectRef = useRef(onReconnect)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wasConnectedRef = useRef(false)

  onEventRef.current = onEvent
  onReconnectRef.current = onReconnect

  useEffect(() => {
    if (!enabled || !echo || status === 'disabled') {
      return undefined
    }

    const privateChannel = acquirePrivateChannel(channel)
    if (!privateChannel) {
      return undefined
    }

    const dispatch = (payload: TPayload) => {
      if (debounceMs <= 0) {
        onEventRef.current(payload)
        return
      }

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      debounceTimerRef.current = setTimeout(() => {
        onEventRef.current(payload)
      }, debounceMs)
    }

    privateChannel.listen(event, dispatch)

    return () => {
      privateChannel.stopListening(event, dispatch)
      releasePrivateChannel(channel)
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
        debounceTimerRef.current = null
      }
    }
  }, [
    enabled,
    echo,
    status,
    channel,
    event,
    debounceMs,
    acquirePrivateChannel,
    releasePrivateChannel,
  ])

  useEffect(() => {
    if (!enabled) {
      return
    }

    if (status === 'connected') {
      if (wasConnectedRef.current) {
        onReconnectRef.current?.()
      }
      wasConnectedRef.current = true
    }
  }, [enabled, status])
}
