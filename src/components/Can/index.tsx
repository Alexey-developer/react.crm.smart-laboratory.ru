import React from 'react'

import { useCan } from '@utils/useCan'

type CanProps = {
  /**
   * Catalog key (`horizon.view_dashboard`) or full Spatie name
   * (`common.horizon.view_dashboard`). Prefer catalog keys from API.
   */
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Conditionally render children when current-user has a common permission.
 * UX gate only — API policies remain authoritative.
 */
export const Can: React.FC<CanProps> = ({
  permission,
  children,
  fallback = null,
}) => {
  const allowed = useCan(permission)

  return allowed ? <>{children}</> : <>{fallback}</>
}
