import { useMutation } from '@tanstack/react-query'

import { useCallback, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectAuthToken } from '@redux/CurrentUser/selectors'
import { setNotification } from '@redux/HeaderNotification/slice'

import { TCurrentUserParams } from './models/currentUser/params/TCurrentUserParams'
import { TProjectParams } from './models/project/params/TProjectParams'

import type { GroupClass, GroupMethod } from './common/types/TGroups'

type Params = TCurrentUserParams | TProjectParams

export const useAPIMutation = (
  groupClass: GroupClass,
  groupMethod: GroupMethod,
  params: any,
  entityId?: number
) => {
  const dispatch = useDispatch()

  const group = new groupClass(useSelector(selectAuthToken))

  if (!(groupMethod in group)) {
    throw new Error('groupMethod is undefined!')
  }

  if (params && entityId) {
    params['id'] = entityId
  }

  const {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate,
    mutateAsync,
    variables,
  } = useMutation({
    mutationFn: (variables: any) => group[groupMethod](variables ?? params),
    // Never auto-retry mutations: duplicate POST/PUT/DELETE without HTTP Idempotency-Key.
    retry: 0,
    networkMode: 'online',
  })

  /** Sync double-click guard for this hook instance (before isPending re-renders). */
  const inFlightRef = useRef<Promise<unknown> | null>(null)

  const guardedMutateAsync = useCallback(
    (variables?: any, options?: any) => {
      if (inFlightRef.current) {
        return inFlightRef.current as ReturnType<typeof mutateAsync>
      }

      const promise = mutateAsync(variables, options).finally(() => {
        inFlightRef.current = null
      })
      inFlightRef.current = promise
      return promise
    },
    [mutateAsync]
  )

  const guardedMutate = useCallback(
    (variables?: any, options?: any) => {
      if (inFlightRef.current) {
        return
      }

      void guardedMutateAsync(variables, options)
    },
    [guardedMutateAsync]
  )

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setNotification({
          title: 'Успешно!',
          text: 'Data mutated successfully',
          type: 'SUCCESS',
        })
      )
    }
  }, [dispatch, isSuccess, data])

  useEffect(() => {
    if (isError) {
      dispatch(
        setNotification({
          title: error.response?.statusText,
          text: error.message,
          type: 'ERROR',
        })
      )
    }
  }, [dispatch, error, isError])

  return {
    mutate: guardedMutate,
    mutateAsync: guardedMutateAsync,
    data,
    isPending,
    isSuccess,
    isError,
    variables,
  }
}
export { GroupMethod }
