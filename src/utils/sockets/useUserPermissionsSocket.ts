import { useCallback } from 'react'

import { useQueryClient, type QueryClient } from '@tanstack/react-query'

import { useBroadcastListen } from './useBroadcastListen'

/** Laravel PrivateChannel name without `private-` prefix. */
export const userPermissionsChannel = (userId: number) => `user.${userId}`

/**
 * Custom broadcastAs from UserPermissionsUpdated.
 * Echo `.listen` needs a leading dot for non-namespaced events.
 */
export const USER_PERMISSIONS_UPDATED_EVENT = '.user.permissions.updated'

const CURRENT_USER_DEBOUNCE_MS = 800

let invalidateTimer: ReturnType<typeof setTimeout> | null = null

const scheduleCurrentUserInvalidate = (queryClient: QueryClient) => {
  if (invalidateTimer) {
    clearTimeout(invalidateTimer)
  }

  invalidateTimer = setTimeout(() => {
    invalidateTimer = null
    void queryClient.invalidateQueries({
      predicate: query =>
        String(query.queryKey[0] ?? '').startsWith('CurrentUserGroup/'),
    })
  }, CURRENT_USER_DEBOUNCE_MS)
}

/**
 * On permission change: refresh current-user (`common_permissions`).
 *
 * Do NOT invalidate every `Group/...` query — each new File triggers
 * SetPermissionsForNewEntityJob → UserPermissionsUpdated; a nuclear
 * invalidate storms telephony/softphone/account/entity show + files.
 * Entity list/show already refetch via their own actions (e.g. attachments reload).
 *
 * Backend coalesces grants into one broadcast per user; module-level debounce
 * still merges reconnect + late events into a single current-user refetch.
 */
export const useUserPermissionsSocket = (userId: number | null | undefined) => {
  const queryClient = useQueryClient()
  const enabled = typeof userId === 'number' && userId > 0

  const invalidate = useCallback(() => {
    scheduleCurrentUserInvalidate(queryClient)
  }, [queryClient])

  useBroadcastListen({
    channel: enabled ? userPermissionsChannel(userId) : 'user.0',
    event: USER_PERMISSIONS_UPDATED_EVENT,
    enabled,
    // Event path also debounced inside useBroadcastListen; module timer is source of truth.
    debounceMs: 0,
    onEvent: invalidate,
    onReconnect: invalidate,
  })
}