import React from 'react'

import { useSelector } from 'react-redux'
import { selectAuthToken } from '@redux/CurrentUser/selectors'

import { useAPIQuery } from '@api/useAPIQuery'
import { CurrentUserGroup } from '@api/models/currentUser/queryGroup'
import { getMethod } from '@utils/getMethod'
import { useUserPermissionsSocket } from '@utils/sockets/useUserPermissionsSocket'

/**
 * Subscribe to private user.{id} for permission changes while authenticated.
 * Mount under RealtimeProvider.
 */
export const UserPermissionsRealtime: React.FC = () => {
  const authToken = useSelector(selectAuthToken)
  const { data } = useAPIQuery(
    CurrentUserGroup,
    getMethod('CURRENT_USER'),
    {},
    Boolean(authToken)
  )

  useUserPermissionsSocket(data?.data?.id)

  return null
}
