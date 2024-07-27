import { useQuery } from '@tanstack/react-query'

import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectAuthToken } from '@redux/CurrentUser/selectors'
import { setNotification } from '@redux/HeaderNotification/slice'

// import { RequestResult } from '@api/common/responseModels/requestResult'

import { ProjectGroup } from '@api/models/project/queryGroup/'
import { TaskGroup } from '@api/models/project/queryGroup/test'

export const useAPIQuery = (
  groupClass: typeof ProjectGroup | typeof TaskGroup,
  groupMethod: keyof ProjectGroup | keyof TaskGroup
  //   groupMethod: keyof typeof groupClass
  //   groupMethod: keyof ProjectGroup
) => {
  const dispatch = useDispatch()

  // const group = new GroupClass(useSelector(selectAuthToken))
  const group = new groupClass(
    'Bearer 1|wcKsc30IAcEAC76Clqlnf9RiNx6lLEtS3oJbuQf2bd8e7f3d'
  )

  if (!(groupMethod in group)) {
    const error = 'groupMethod is undefined!'

    console.log(error)
    throw error
  }

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['qwertry'],
    // queryFn: () => method(),
    queryFn: () => group[groupMethod as keyof typeof group](),

    // queryFn: () => group.call('index'),
    // queryFn: group.index.call(param1),

    // queryFn: () => {
    //   return group.index()
    // },

    // queryFn: async () => {
    //   const data = await method()
    //   return data
    // },

    select: data => data.data,
    enabled: true,
    retry: 0,
    // initialData,
    // staleTime: 1000,
  })
  //   console.log('useAPIQuery Beg')

  useEffect(() => {
    if (isLoading) console.log('isLoading')
  }, [isLoading])
  useEffect(() => {
    if (isSuccess) {
      console.log('Data fetched successfully')
      console.log(data)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError) {
      console.log('Error fetching data')
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

  return { data, isLoading, isSuccess, isError }
  //   return 'sss'
}

//   const { data, isLoading, isSuccess, isError } = useQuery({
//     queryKey: ['test'],
//     queryFn: () => {
//       const ax = axios.create()
//       //   ax.defaults.headers.get['Content-Type'] =
//       ax.defaults.headers.post['Content-Type'] = ax.defaults.headers.put[
//         'Content-Type'
//       ] = 'application/json'

//       const token = '1|wcKsc30IAcEAC76Clqlnf9RiNx6lLEtS3oJbuQf2bd8e7f3d'
//       //   const token = ''
//       ax.defaults.headers.common['Authorization'] = 'Bearer ' + token
//       //   ax.defaults.headers.common['Authorization'] = 'Bearer ' + token

//       return ax.get('http://127.0.0.1:8000/api/v1/project-types')
//     },
//     select: data => data.data,
//     // enabled: isEnabled,
//     // initialData,
//     // staleTime: 1000,
//   })

//   useEffect(() => {
//     if (isSuccess) {
//       console.log('Data fetched successfully')
//       console.log(data)
//     }
//   }, [isSuccess, data])

//   useEffect(() => {
//     if (isError) console.log('Error fetching data')
//   }, [isError])

//   return { data, isLoading, isSuccess, isError }
