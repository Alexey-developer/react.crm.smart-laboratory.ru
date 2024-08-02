import React from 'react'
import { Card, Col, Badge } from 'antd'

import styles from './index.module.scss'

export type DefaultCardProps = {
  title: React.ReactNode
  badgeRibbonText?: string
  badgeRibbonClassName?:
    | 'transparent'
    | 'success'
    | 'success transparent'
    | 'warning'
    | 'warning transparent'
    | 'danger'
    | 'danger transparent'
  content: React.ReactNode
  actions?: React.ReactNode[]
  extra?: React.ReactNode
  hoverable?: boolean
  type?: 'default' | 'success' | 'warning' | 'danger'
  grid?: { xs: number; lg: number; xl: number; xxl: number }
}

export const DefaultCard: React.FC<DefaultCardProps> = ({
  title,
  badgeRibbonText,
  badgeRibbonClassName,
  content,
  actions,
  extra,
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
      tabBarExtraContent={<h1>123</h1>}
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

  if (badgeRibbonText) {
    return returnable(
      <Badge.Ribbon className={badgeRibbonClassName} text={badgeRibbonText}>
        {defaultCard}
      </Badge.Ribbon>
    )
  }

  return returnable(defaultCard)
}
