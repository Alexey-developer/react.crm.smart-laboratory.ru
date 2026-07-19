import type { QueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import i18next from 'i18next'

import { store } from '@redux/store'
import { setAuthToken } from '@redux/CurrentUser/slice'
import { setNotification } from '@redux/HeaderNotification/slice'

const handledErrors = new WeakSet<object>()

const getHttpStatus = (error: unknown): number | undefined => {
  const axiosError = error as AxiosError | undefined
  return axiosError?.response?.status
}

const markHandled = (error: unknown): void => {
  if (typeof error === 'object' && error !== null) {
    handledErrors.add(error)
  }
}

/** True when Query/Mutation cache already handled this error (skip hook toast). */
export const isApiHttpErrorHandled = (error: unknown): boolean =>
  typeof error === 'object' && error !== null && handledErrors.has(error)

/**
 * Central HTTP auth/authorization handling for React Query caches.
 * 401 with session → logout + clear cache.
 * 403 → «нет доступа» notification (no logout).
 * 401 without session (e.g. failed login) → leave for hook toast.
 */
export const handleApiHttpError = (
  error: unknown,
  queryClient: QueryClient
): void => {
  const status = getHttpStatus(error)

  if (status === 401) {
    const hadToken = Boolean(store.getState().CurrentUser.authToken)
    if (!hadToken) {
      return
    }

    store.dispatch(setAuthToken(''))
    queryClient.clear()
    markHandled(error)
    return
  }

  if (status === 403) {
    store.dispatch(
      setNotification({
        title: i18next.t('Messages.Errors.forbidden_title', { ns: 'global' }),
        text: i18next.t('Messages.Errors.forbidden_text', { ns: 'global' }),
        type: 'ERROR',
      })
    )
    markHandled(error)
  }
}
