import { useMutation } from '@tanstack/react-query'

import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectAuthToken } from '@redux/CurrentUser/selectors'
import { setNotification } from '@redux/HeaderNotification/slice'

// import { RequestResult } from '@api/common/responseModels/requestResult'

import { TCurrentUserParams } from './models/currentUser/params/TCurrentUserParams'
import { TProjectParams } from './models/project/params/TProjectParams'

import type { GroupClass, GroupMethod } from './common/types/TGroups'

type Params = TCurrentUserParams | TProjectParams

export const useAPIMutation = (
  groupClass: GroupClass,
  groupMethod: GroupMethod,
  //   params: Params
  params: any,
  entityId?: number
  //   enabled = true
) => {
  const dispatch = useDispatch()

  const group = new groupClass(useSelector(selectAuthToken))

  if (!(groupMethod in group)) {
    const error = 'groupMethod is undefined!'

    console.log(error)
    throw error
  }
  //   console.log('params:', params)
  //   console.log(`variables = ${variables}`)

  //   const temp = params
  //   params = Object
  //   params['fields'] = params

  if (params && entityId) {
    params['id'] = entityId
  }

  //   const { data, isLoading, isSuccess, isError, error } = useMutation({
  const {
    data,
    error,
    isError,
    isIdle,
    isPending,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
    submittedAt,
    variables,
  } = useMutation({
    mutationFn: (variables: any) => group[groupMethod](variables ?? params), //as keyof typeof group
    //   console.log('====================================')
    //   console.log(1, variables)
    //   console.log(2, params)
    //   console.log(3, variables ?? params)
    //   console.log('====================================')
    retry: 0,
  })

  useEffect(() => {
    if (isPending) console.log('isPending')
  }, [isPending])

  useEffect(() => {
    if (isSuccess) {
      console.log('Data mutated successfully')
      console.log(`data = ${data}`)
      console.log(data)
      //   data.status
      dispatch(
        setNotification({
          title: 'Успешно!',
          text: 'Data mutated successfully',
          type: 'SUCCESS',
        })
      )
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError) {
      console.log('Error mutating data')
      console.log(error)

      dispatch(
        setNotification({
          title: error.response?.statusText,
          text: error.message,
          type: 'ERROR',
        })
      )
    }
  }, [isError])

  return { mutate, mutateAsync, data, isPending, isSuccess, isError, variables }
}
export { GroupMethod }
