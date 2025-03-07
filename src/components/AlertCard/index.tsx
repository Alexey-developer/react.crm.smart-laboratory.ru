import React, { ReactNode } from 'react'
import { Alert, Col } from 'antd'

import { TColorType } from '@api/common/types/TColorType'

import './index.module.scss'

type AlertCardProps = {
  message: string
  description?: string
  icon?: ReactNode
  type?: TColorType
  banner?: boolean
  closable?: boolean
  action?: React.ReactNode
  col?: boolean
}

export const AlertCard: React.FC<AlertCardProps> = ({
  message,
  description,
  icon,
  type,
  banner,
  closable,
  action,
  col = true,
}) => {
  const alert = (
    <Alert
      banner={banner}
      closable={closable}
      message={message}
      description={description}
      className={type}
      showIcon
      icon={icon}
      action={action}
      //   type='success'
    />
  )

  if (col)
    return (
      <Col xs={24} lg={12} xl={8} xxl={6} className='default-col'>
        {alert}
      </Col>
    )

  return alert
}
