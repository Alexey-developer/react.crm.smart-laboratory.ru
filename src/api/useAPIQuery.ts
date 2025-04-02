import { useQuery } from '@tanstack/react-query'

import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectAuthToken } from '@redux/CurrentUser/selectors'
import { selectPerPage } from '@redux/CurrentUser/selectors'
import { setNotification } from '@redux/HeaderNotification/slice'
import { setAuthToken } from '@redux/CurrentUser/slice'

import type { GroupClass, GroupMethod } from './common/types/TGroups'

// import { RequestResult } from '@api/common/responseModels/requestResult'

// type useAPIQueryProps = {
//   groupClass: GroupClass
//   groupMethod: GroupMethod
//   enabled?: boolean
//   props: any
// }

export const useAPIQuery = (
  groupClass: GroupClass,
  groupMethod: GroupMethod,
  params = {},
  enabled = true
) => {
  //   console.log('requery')
  //   console.log('rrr', params)

  const dispatch = useDispatch()

  const group = new groupClass(useSelector(selectAuthToken))
  //   const group = new groupClass(
  //     'Bearer 1|wcKsc30IAcEAC76Clqlnf9RiNx6lLEtS3oJbuQf2bd8e7f3d'
  //   )

  if (!(groupMethod in group)) {
    const error = 'groupMethod is undefined!'

    console.log(error)
    throw error
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
  console.log(`queryKey = ${queryKey}`)

  const {
    data,
    // dataUpdatedAt,
    error,
    // errorUpdatedAt,
    // failureCount,
    // failureReason,
    // fetchStatus,
    isError,
    // isFetched,
    // isFetchedAfterMount,
    isFetching,
    isLoading,
    // isLoadingError,
    // isPaused,
    isPending,
    // isPlaceholderData,
    // isRefetchError,
    isRefetching,
    // isStale,
    isSuccess,
    refetch,
    // status,
  } = useQuery({
    queryKey: [queryKey],
    // queryFn: () => group[groupMethod as keyof typeof group](params),
    queryFn: () => group[groupMethod](params), // as keyof typeof group

    select: group['select'],
    enabled: enabled,
    retry: 0,

    // meta: params,

    // initialData,
    staleTime: 5000,

    // refetchOnWindowFocus: 'always',
    // refetchOnMount: 'always',
  })

  useEffect(() => {
    // if (isLoading) console.log('isLoading')
  }, [isLoading])
  useEffect(() => {
    if (isSuccess) {
      //   console.log('Data fetched successfully')
      //   console.log(data)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError) {
      console.log('Error fetching data')
      console.log('ERROR:', error)

      if (error.response.status === 401) {
        dispatch(setAuthToken(''))
        return
      }

      dispatch(
        setNotification({
          title: error.response?.statusText,
          text: error.message,
          type: 'ERROR',
        })
      )
    }
  }, [isError])

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
