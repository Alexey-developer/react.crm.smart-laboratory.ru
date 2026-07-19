import { useCallback } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useBroadcastListen } from './useBroadcastListen'

/** Laravel PrivateChannel name without `private-` prefix. */
export const userPermissionsChannel = (userId: number) => `user.${userId}`

/**
 * Custom broadcastAs from UserPermissionsUpdated.
 * Echo `.listen` needs a leading dot for non-namespaced events.
 */
export const USER_PERMISSIONS_UPDATED_EVENT = '.user.permissions.updated'

/**
 * On permission change: refresh current-user (common_permissions) and entity
 * queries (lazy `can{}` hints). HTTP remains source of truth.
 */
export const useUserPermissionsSocket = (userId: number | null | undefined) => {
  const queryClient = useQueryClient()
  const enabled = typeof userId === 'number' && userId > 0

  const invalidate = useCallback(() => {
    void queryClient.invalidateQueries({
      predicate: query => {
        const key = String(query.queryKey[0] ?? '')
        return (
          key.startsWith('CurrentUserGroup/') ||
          (key.includes('/') && !key.startsWith('CurrentUserGroup/'))
        )
      },
    })
  }, [queryClient])

  useBroadcastListen({
    channel: enabled ? userPermissionsChannel(userId) : 'user.0',
    event: USER_PERMISSIONS_UPDATED_EVENT,
    enabled,
    debounceMs: 150,
    onEvent: invalidate,
    onReconnect: invalidate,
  })
}
