import React, { ReactNode } from 'react'
import { Alert, Col } from 'antd'

import './index.module.scss'

type AlertCardProps = {
  message: string
  description?: string
  icon?: ReactNode
  type?:
    | 'transparent'
    | 'success'
    | 'success transparent'
    | 'warning'
    | 'warning transparent'
    | 'danger'
    | 'danger transparent'
  banner?: boolean
  closable?: boolean
  action?: React.ReactNode
}

export const AlertCard: React.FC<AlertCardProps> = ({
  message,
  description,
  icon,
  type,
  banner,
  closable,
  action,
}) => {
  return (
    <Col xs={24} lg={12} xl={8} xxl={6} className='default-col'>
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
    </Col>
  )
}
