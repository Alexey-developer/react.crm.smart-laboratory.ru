import { useAPIQuery } from '@api/useAPIQuery'
import { CurrentUserGroup } from '@api/models/currentUser/queryGroup'
import { getMethod } from '@utils/getMethod'

/**
 * Resolve short catalog key or full Spatie name to the full common.* name.
 */
export const resolveCommonPermission = (
  actionOrFullName: string,
  catalog: Record<string, string> | undefined
): string => catalog?.[actionOrFullName] ?? actionOrFullName

/**
 * Whether the current user has a common permission.
 * Pass a catalog key (`horizon.view_dashboard`) or full Spatie name.
 * UI-only; never treat as server-side authorization.
 */
export const useCan = (actionOrFullName: string): boolean => {
  const { data } = useAPIQuery(
    CurrentUserGroup,
    getMethod('CURRENT_USER'),
    {},
    true
  )

  const granted = data?.data?.common_permissions ?? []
  const full = resolveCommonPermission(
    actionOrFullName,
    data?.data?.common_permissions_catalog
  )

  return granted.includes(full)
}
