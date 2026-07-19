import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import axios from 'axios'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export type RealtimeStatus =
  | 'disabled'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'unavailable'

type PrivateChannel = ReturnType<Echo<'pusher'>['private']>

type RealtimeContextValue = {
  echo: Echo<'pusher'> | null
  status: RealtimeStatus
  /**
   * Subscribe / bump ref-count for a private channel (name without `private-`).
   * Prefer `useBroadcastListen` — call this only for advanced cases.
   */
  acquirePrivateChannel: (name: string) => PrivateChannel | null
  /** Drop ref-count; leaves Echo channel when count hits 0. */
  releasePrivateChannel: (name: string) => void
}

const RealtimeContext = createContext<RealtimeContextValue>({
  echo: null,
  status: 'disabled',
  acquirePrivateChannel: () => null,
  releasePrivateChannel: () => undefined,
})

type RealtimeProviderProps = {
  children: React.ReactNode
  token: string | null
}

type EchoEnv = {
  key: string
  apiUrl: string
  wsHost: string
  wsPort: number
  forceTLS: boolean
  cluster: string
}

const readEchoEnv = (): EchoEnv | null => {
  const key = import.meta.env.VITE_PUSHER_APP_KEY as string | undefined
  const apiUrl = (import.meta.env.VITE_API_URL as string | undefined)?.replace(
    /\/$/,
    ''
  )

  if (!key || !apiUrl) {
    return null
  }

  return {
    key,
    apiUrl,
    wsHost: (import.meta.env.VITE_PUSHER_HOST as string | undefined) ?? '127.0.0.1',
    wsPort: Number(import.meta.env.VITE_PUSHER_PORT ?? 6001),
    forceTLS:
      ((import.meta.env.VITE_PUSHER_SCHEME as string | undefined) ?? 'http') ===
      'https',
    cluster:
      (import.meta.env.VITE_PUSHER_APP_CLUSTER as string | undefined) ?? 'mt1',
  }
}

/**
 * CRM realtime bus: one Echo → Soketi connection for the whole app.
 * Channel leave is ref-counted so multiple hooks can share a channel safely.
 */
export const RealtimeProvider: React.FC<RealtimeProviderProps> = ({
  children,
  token,
}) => {
  const [echo, setEcho] = useState<Echo<'pusher'> | null>(null)
  const [status, setStatus] = useState<RealtimeStatus>('disabled')
  const channelRefs = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    if (!token) {
      setEcho(null)
      setStatus('disabled')
      channelRefs.current.clear()
      return undefined
    }

    const env = readEchoEnv()
    if (!env) {
      setEcho(null)
      setStatus('disabled')
      return undefined
    }

    setStatus('connecting')
    channelRefs.current.clear()

    const instance = new Echo({
      broadcaster: 'pusher',
      key: env.key,
      cluster: env.cluster,
      wsHost: env.wsHost,
      wsPort: env.wsPort,
      wssPort: env.wsPort,
      forceTLS: env.forceTLS,
      enabledTransports: ['ws', 'wss'],
      disableStats: true,
      authEndpoint: `${env.apiUrl}/api/v1/broadcasting/auth`,
      Pusher,
      authorizer: channel => ({
        authorize: (socketId, callback) => {
          axios
            .post(
              `${env.apiUrl}/api/v1/broadcasting/auth`,
              {
                socket_id: socketId,
                channel_name: channel.name,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/json',
                },
              }
            )
            .then(response => callback(null, response.data))
            .catch(error => callback(error, null))
        },
      }),
    } as ConstructorParameters<typeof Echo<'pusher'>>[0])

    const connection = instance.connector.pusher.connection

    const onConnected = () => setStatus('connected')
    const onConnecting = () => setStatus('connecting')
    const onDisconnected = () => setStatus('disconnected')
    const onUnavailable = () => setStatus('unavailable')
    const onFailed = () => setStatus('unavailable')

    connection.bind('connected', onConnected)
    connection.bind('connecting', onConnecting)
    connection.bind('disconnected', onDisconnected)
    connection.bind('unavailable', onUnavailable)
    connection.bind('failed', onFailed)

    if (connection.state === 'connected') {
      setStatus('connected')
    }

    setEcho(instance)

    return () => {
      connection.unbind('connected', onConnected)
      connection.unbind('connecting', onConnecting)
      connection.unbind('disconnected', onDisconnected)
      connection.unbind('unavailable', onUnavailable)
      connection.unbind('failed', onFailed)
      channelRefs.current.clear()
      instance.disconnect()
      setEcho(null)
      setStatus('disabled')
    }
  }, [token])

  const acquirePrivateChannel = useCallback(
    (name: string) => {
      if (!echo) {
        return null
      }

      const next = (channelRefs.current.get(name) ?? 0) + 1
      channelRefs.current.set(name, next)

      return echo.private(name)
    },
    [echo]
  )

  const releasePrivateChannel = useCallback(
    (name: string) => {
      if (!echo) {
        return
      }

      const current = channelRefs.current.get(name) ?? 0
      const next = current - 1

      if (next <= 0) {
        channelRefs.current.delete(name)
        echo.leave(name)
        return
      }

      channelRefs.current.set(name, next)
    },
    [echo]
  )

  const value = useMemo(
    () => ({
      echo,
      status,
      acquirePrivateChannel,
      releasePrivateChannel,
    }),
    [echo, status, acquirePrivateChannel, releasePrivateChannel]
  )

  return (
    <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>
  )
}

export const useRealtime = () => useContext(RealtimeContext)
