import React from 'react'
import { Button, Tooltip } from 'antd'

import './index.module.scss'

type ActionButtonProps = {
  className?: 'default' | 'success' | 'warning' | 'danger'
  title: string
  icon: string
  shape?: 'default' | 'circle' | 'round'
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  className = 'default',
  title,
  icon,
  shape = 'default',
}) => {
  return (
    <Tooltip title={title}>
      <Button
        className={'action-btn ' + className}
        type='default'
        shape={shape}
        icon={<i className={icon}></i>}
      />
    </Tooltip>
  )
}
