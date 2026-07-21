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
 * On permission change: refresh current-user (`common_permissions`).
 *
 * Do NOT invalidate every `Group/...` query — each new File triggers
 * SetPermissionsForNewEntityJob → burst of UserPermissionsUpdated events; a nuclear
 * invalidate storms telephony/softphone/account/entity show + files in parallel.
 * Entity list/show already refetch via their own actions (e.g. attachments reload).
 */
export const useUserPermissionsSocket = (userId: number | null | undefined) => {
  const queryClient = useQueryClient()
  const enabled = typeof userId === 'number' && userId > 0

  const invalidate = useCallback(() => {
    void queryClient.invalidateQueries({
      predicate: query =>
        String(query.queryKey[0] ?? '').startsWith('CurrentUserGroup/'),
    })
  }, [queryClient])

  useBroadcastListen({
    channel: enabled ? userPermissionsChannel(userId) : 'user.0',
    event: USER_PERMISSIONS_UPDATED_EVENT,
    enabled,
    // Coalesce permission jobs from multi-file finalize (many ChangeUserPermissionJob).
    debounceMs: 500,
    onEvent: invalidate,
    onReconnect: invalidate,
  })
}
