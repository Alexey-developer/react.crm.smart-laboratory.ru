import React from 'react'
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '@redux/Theme/selectors'

import './index.module.scss'

type SkeletonProps = {
  isLoading: boolean
  width: number | string
  height: number | string
  skeleton: React.ReactNode
  content: React.ReactNode
  contentLoaderProps?: IContentLoaderProps
}

export const Skeleton: React.FC<SkeletonProps> = ({
  isLoading,
  width,
  height,
  skeleton,
  content,
  contentLoaderProps,
}) => {
  const currentTheme = useSelector(selectCurrentTheme)

  return isLoading ? (
    <ContentLoader
      className='skeleton'
      speed={0.6}
      width={width}
      height={height}
      // viewBox={`0 0 ${width} ${height}`}
      backgroundColor={
        currentTheme === 'dark'
          ? 'rgba(208, 212, 241, 0.68)'
          : 'rgba(47, 43, 61, 0.68)'
      }
      foregroundColor={
        currentTheme === 'dark'
          ? 'rgba(208, 212, 241, 1)'
          : 'rgba(47, 43, 61, 1)'
      }
      {...contentLoaderProps}
    >
      {skeleton}
    </ContentLoader>
  ) : (
    content
  )
}
