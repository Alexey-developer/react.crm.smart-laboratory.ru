import type { AxiosError } from 'axios'

/** Max automatic retries for GET/index/show (attempt after the first failure). */
export const QUERY_RETRY_COUNT = 2

/**
 * Retry only transient failures: network (no HTTP response) or 5xx.
 * Never retry 4xx (401/403/404/422) — those need user action or logout, not spam.
 */
export const shouldRetryQuery = (failureCount: number, error: unknown): boolean => {
  if (failureCount >= QUERY_RETRY_COUNT) {
    return false
  }

  const status = (error as AxiosError | undefined)?.response?.status
  if (status != null && status >= 400 && status < 500) {
    return false
  }

  return true
}

export const queryRetryDelay = (attemptIndex: number): number =>
  Math.min(1000 * 2 ** attemptIndex, 8000)
