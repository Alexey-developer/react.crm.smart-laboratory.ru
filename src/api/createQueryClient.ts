import {
  MutationCache,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query'

import { handleApiHttpError } from '@api/handleApiHttpError'
import {
  queryRetryDelay,
  shouldRetryQuery,
} from '@utils/queryRetry'

export const createQueryClient = (): QueryClient => {
  const queryClient: QueryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        handleApiHttpError(error, queryClient)
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        handleApiHttpError(error, queryClient)
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnReconnect: true,
        networkMode: 'online',
        retry: shouldRetryQuery,
        retryDelay: queryRetryDelay,
      },
      mutations: {
        // Mutations: no default retry — useAPIMutation keeps retry: 0.
        networkMode: 'online',
      },
    },
  })

  return queryClient
}
