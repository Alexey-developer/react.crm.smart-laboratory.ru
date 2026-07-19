import { useQuery } from '@tanstack/react-query'

import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectAuthToken } from '@redux/CurrentUser/selectors'
import { selectPerPage } from '@redux/CurrentUser/selectors'
import { setNotification } from '@redux/HeaderNotification/slice'
import { setAuthToken } from '@redux/CurrentUser/slice'

import type { GroupClass, GroupMethod } from './common/types/TGroups'
import {
  queryRetryDelay,
  shouldRetryQuery,
} from '@utils/queryRetry'

export const useAPIQuery = (
  groupClass: GroupClass,
  groupMethod: GroupMethod,
  params = {},
  enabled = true
) => {
  const dispatch = useDispatch()

  const group = new groupClass(useSelector(selectAuthToken))

  if (!(groupMethod in group)) {
    throw new Error('groupMethod is undefined!')
  }

  const perPage = useSelector(selectPerPage)

  let queryKey = `${group.constructor.name}/${String(groupMethod)}`

  if (String(groupMethod) === 'index') {
    params = {
      per_page: perPage,
      ...params,
    }
    queryKey += `/perPage=${params.per_page}`
  }
  if (params.page) {
    queryKey += `/page=${params.page}`
  }
  if (params.filters) {
    const statusKey = Object.keys(params.filters).find(key =>
      key.includes('_status')
    )
    if (statusKey) {
      params.filters['status'] = params.filters[statusKey]
      delete params.filters[statusKey]
    }

    queryKey += `/filters=${JSON.stringify(params.filters)}`
  }
  if (params.sort_by && params.sort_direction) {
    queryKey += `/sortBy=${params.sort_by}/sortDirection=${params.sort_direction}`
  }
  if (params.query) {
    queryKey += `/query=${params.query}/queryFields=${params.query_fields}`
  }
  if (params.id) {
    queryKey += `/id=${params.id}`
  }

  const {
    data,
    error,
    isError,
    isFetching,
    isLoading,
    isPending,
    isRefetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () => group[groupMethod](params),
    select: group['select'],
    enabled: enabled,
    staleTime: 5000,
    retry: shouldRetryQuery,
    retryDelay: queryRetryDelay,
    refetchOnReconnect: true,
    networkMode: 'online',
  })

  useEffect(() => {
    if (isError) {
      const axiosError = error as { response?: { status?: number; statusText?: string } }

      if (axiosError.response?.status === 401) {
        dispatch(setAuthToken(''))
        return
      }

      dispatch(
        setNotification({
          title: axiosError.response?.statusText ?? 'Error',
          text: error instanceof Error ? error.message : String(error),
          type: 'ERROR',
        })
      )
    }
  }, [dispatch, error, isError])

  return {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    refetch,
    isRefetching,
    isPending,
    error,
  }
}
