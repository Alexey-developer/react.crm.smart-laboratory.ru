import React from 'react'
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

import { useReactive } from 'ahooks'

type SkeletonProps = {
  isLoading: boolean
  skeleton: React.ReactNode
  content: React.ReactNode
  contentLoaderProps?: IContentLoaderProps
}

export const Skeleton: React.FC<SkeletonProps> = ({
  isLoading,
  skeleton,
  content,
  contentLoaderProps,
}) => {
  console.log(skeleton)

  //   type TState = {
  //     height: number
  //     elements: React.ReactNode[]
  //   }
  //   const state = useReactive<TState>({
  //     height: 68,
  //     elements: [],
  //   })

  //   const elements: React.ReactNode[] = []

  //   React.useEffect(() => {
  //     for (let i = 0; i < 6; i++) {
  //       state.elements.push(
  //         <rect key={i}>
  //           <rect x='35' y={state.height} rx='3' ry='3' width='185' height='6' />
  //           <circle cx='15' cy={state.height + 2} r='10' />
  //         </rect>
  //       )
  //       if (i === 2 || i === 5) {
  //         state.height += 20
  //       }
  //       state.height += 20
  //     }
  //     console.log(state.elements)
  //   }, [])

  return isLoading ? (
    <ContentLoader
      speed={0.6}
      width={237}
      height={281}
      viewBox='0 0 237 281'
      //   backgroundColor='rgba(208, 212, 241, 0.68)'
      backgroundColor='rgba(47, 43, 61, 0.68)'
      //   foregroundColor='rgba(208, 212, 241, 1)'
      foregroundColor='rgba(47, 43, 61, 1)'
      {...contentLoaderProps}
    >
      {/* <rect x='90' y='7' rx='3' ry='3' width='135' height='8' />
      <rect x='90' y='25' rx='3' ry='3' width='90' height='8' />
      <circle cx='30' cy='20' r='20' /> */}
      {skeleton}
      {/* {state.elements.map(element => element)} */}
      {/* {elements.map(element => {
        console.log(12321321)

        console.log(element)

        return element
      })} */}
      {/* {elements} */}
    </ContentLoader>
  ) : (
    content
  )
}
