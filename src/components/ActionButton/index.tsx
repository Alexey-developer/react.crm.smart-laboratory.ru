import React from 'react'
import { Button, Tooltip, Popconfirm } from 'antd'

import { useTranslation } from 'react-i18next'

// import './index.module.scss'

type ActionButtonProps = {
  className?:
    | 'transparent'
    | 'success'
    | 'success transparent'
    | 'warning'
    | 'warning transparent'
    | 'danger'
    | 'danger transparent'
  title: string
  icon: string
  shape?: 'default' | 'circle' | 'round'
  useConfirm?: boolean
  confirmTitleKey?: string
  confirmDescriptionKey?: string
  confirmOkTextKey?: string
  confirmCancelTextKey?: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  className = '',
  title,
  icon,
  shape = 'default',
  useConfirm = false,
  confirmTitleKey = 'Confirm.title',
  confirmDescriptionKey = 'Confirm.description',
  confirmOkTextKey = 'Confirm.ok_text',
  confirmCancelTextKey = 'Confirm.cancel_text',
}) => {
  const [translated_phrase] = useTranslation('global')

  const actionButton = (
    <Tooltip title={title}>
      <Button
        className={'smart-btn ' + className}
        type='default'
        shape={shape}
        icon={<i className={icon}></i>}
      />
    </Tooltip>
  )

  if (useConfirm) {
    return (
      <Popconfirm
        title={translated_phrase(confirmTitleKey)}
        description={translated_phrase(confirmDescriptionKey)}
        okText={translated_phrase(confirmOkTextKey)}
        cancelText={translated_phrase(confirmCancelTextKey)}
      >
        {actionButton}
      </Popconfirm>
    )
  }
  return <>{actionButton}</>
}
