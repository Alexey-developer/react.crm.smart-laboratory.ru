import React from 'react'
import { Card, Col, Badge } from 'antd'

import { TColorType } from '@api/common/types/TColorType'

import { Skeleton } from '@components/Skeleton'

import { formSkeleton } from './formSkeleton'
import styles from './index.module.scss'

export type Grid = { xs: number; lg: number; xl: number; xxl: number }

export type DefaultCardProps = {
  title: React.ReactNode
  badgeRibbonText?: string
  badgeRibbonClassName?: TColorType
  content: React.ReactNode
  actions?: React.ReactNode[]
  extra?: React.ReactNode
  isLoading?: boolean
  skeletonActionCount?: number
  /** Avatar circles in list-card skeleton (WTR = 1, Project/Direction/Task ≈ 4, compact = 0). */
  skeletonEmployeeCount?: number
  /**
   * Progress bar + metric strip in list skeleton.
   * Default: on when `skeletonEmployeeCount >= 2`. Compact cards must pass `false`.
   */
  skeletonShowProgress?: boolean
  hoverable?: boolean
  type?: 'default' | 'success' | 'warning' | 'danger'
  grid?: Grid
}

export const DefaultCard: React.FC<DefaultCardProps> = ({
  title,
  badgeRibbonText,
  badgeRibbonClassName,
  content,
  actions,
  extra,
  isLoading,
  skeletonActionCount = 4,
  skeletonEmployeeCount = 4,
  skeletonShowProgress,
  hoverable = true,
  type,
  grid = { xs: 24, lg: 12, xl: 8, xxl: 6 },
}) => {
  const defaultCard = (
    <Card
      className={styles.default_card + ' ' + type}
      title={title}
      bordered={false}
      hoverable={hoverable}
      // loading={true}
      // type='inner'
      extra={extra}
      actions={actions}
    >
      {content}
    </Card>
  )

  const returnable = (child: React.ReactNode) => {
    return (
      <Col
        // span={4}
        xs={grid.xs}
        // sm={24}
        // md={12}
        lg={grid.lg}
        xl={grid.xl}
        xxl={grid.xxl}
        className='default-col'
      >
        {child}
      </Col>
    )
  }

  const intermediateSkeleton = (child: React.ReactNode) => {
    if (isLoading === undefined) {
      return returnable(child)
    } else {
      return returnable(
        <Skeleton
          isLoading={isLoading}
          width={'100%'}
          height={'100%'}
          skeleton={formSkeleton({
            actionCount: skeletonActionCount,
            employeeCount: skeletonEmployeeCount,
            showProgress: skeletonShowProgress,
          })}
          content={child}
        />
      )
    }
  }

  if (badgeRibbonText) {
    return intermediateSkeleton(
      <Badge.Ribbon className={badgeRibbonClassName} text={badgeRibbonText}>
        {defaultCard}
      </Badge.Ribbon>
    )
  }

  return intermediateSkeleton(defaultCard)
}
