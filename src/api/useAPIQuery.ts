import { useQuery } from '@tanstack/react-query'

import { useEffect } from 'react'

import { APIBase } from '@api/APIBase'

import { useSelector } from 'react-redux'
import { selectAuthToken } from '@redux/CurrentUser/selectors'

import { projectGroup } from '@api/entities/project/queryGroup'

import { RequestResult } from '@api/common/responseModels/requestResult'

import { ProjectGroup } from '@api/entities/project/queryGroup/'
import { TaskGroup } from '@api/entities/project/queryGroup/test'

// const applyMixins = (derivedCtor: any, baseCtors: any[]) => {
//     baseCtors.forEach((baseCtor) => {
//         Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
//             if (name !== 'constructor') {
//                 derivedCtor.prototype[name] = baseCtor.prototype[name];
//             }
//         });
//     });
// }

// applyMixins(APIBase, [
//     ProjectGroup,
// ]);

// type GroupClasses =

// type useAPIQueryProps = {
//   groupClass: typeof ProjectGroup | typeof TaskGroup
//   groupMethod: keyof ProjectGroup | keyof TaskGroup
//   //   groupMethod: 'index' | 'show'
// }

type GroupClass = typeof ProjectGroup | typeof TaskGroup
// type GroupMethod = keyof ProjectGroup | keyof TaskGroup

// export const useAPIQuery = (
//   GroupClass: typeof ProjectGroup /*method*/ /*: Promise<RequestResult<T>>*/,
//   groupMethod: 'index' | 'show'
// ) => {
// export const useAPIQuery = <T>(groupClass: T, groupMethod: keyof T) => {
export const useAPIQuery = (
  groupClass: GroupClass,
  //   groupMethod: keyof GroupClass
  groupMethod: keyof typeof groupClass
  //   groupMethod: keyof ProjectGroup
) => {
  // const t = new ProjectGroup()
  //   console.log(APIMethod)

  //   console.log(method)

  // const group = new GroupClass(useSelector(selectAuthToken))

  const group = new groupClass(
    'Bearer 1|wcKsc30IAcEAC76Clqlnf9RiNx6lLEtS3oJbuQf2bd8e7f3d'
  )

  //   console.log(Object.)
  //   console.log(Object.keys(group))

  // GroupClass.prototype.index

  //   group[groupMethod]()

  //   let method //: string
  //   switch (groupMethod) {
  //     case 'index':
  //       method = group.index.bind(group)
  //       break
  //   }

  if (!(groupMethod in group)) {
    //   if (group[groupMethod] === undefined) {
    // console.log(group.hasOwnProperty(groupMethod))

    const error = 'groupMethod is undefined!'

    console.log(error)
    throw error
  }

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['qwertry'],
    // queryFn: () => method(),
    queryFn: () => group[groupMethod as keyof typeof group](), //as keyof typeof group

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
