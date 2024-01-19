import React from 'react'
import { Card, Col, Badge } from 'antd'

import styles from './index.module.scss'

type DefaultCardProps = {
  title: string
  badgeRibbonText?: string
  badgeRibbonClassName?:
    | undefined
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
}

export const DefaultCard: React.FC<DefaultCardProps> = ({
  title,
  badgeRibbonText,
  badgeRibbonClassName,
  content,
  actions,
  extra,
  hoverable = true,
}) => {
  const defaultCard = (
    <Card
      className={styles.project_card}
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

  if (badgeRibbonText) {
    return (
      <Col span={4} className={styles.default_col}>
        <Badge.Ribbon className={badgeRibbonClassName} text={badgeRibbonText}>
          {defaultCard}
        </Badge.Ribbon>
      </Col>
    )
  }
  return (
    <Col span={4} className={styles.default_col}>
      {defaultCard}
    </Col>
  )
}
