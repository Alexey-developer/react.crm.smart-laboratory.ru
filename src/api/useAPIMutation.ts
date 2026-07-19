import { useMutation } from '@tanstack/react-query'

import { useEffect } from 'react'

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
    retry: 0,
  })

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

  return { mutate, mutateAsync, data, isPending, isSuccess, isError, variables }
}
export { GroupMethod }
