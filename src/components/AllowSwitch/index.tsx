import React from 'react'

import { Switch, Typography } from 'antd'
const { Text } = Typography

import { useTranslation } from 'react-i18next'

import styles from './index.module.scss'

type AllowSwitchProps = {
  label: string
  checked: boolean
  loading?: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

/**
 * Permission-style allow/deny Switch (green/red + i18n children).
 * `loading` / `disabled` while the mutation is in flight.
 */
export const AllowSwitch: React.FC<AllowSwitchProps> = ({
  label,
  checked,
  loading = false,
  disabled = false,
  onChange,
}) => {
  const [translated_phrase] = useTranslation('global')

  return (
    <div className={styles.row}>
      <Text className={styles.text}>{label}</Text>
      <div className={styles.switchWrap}>
        <Switch
          checked={checked}
          loading={loading}
          disabled={disabled || loading}
          checkedChildren={translated_phrase('PermissionSystem.allow')}
          unCheckedChildren={translated_phrase('PermissionSystem.disallow')}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
