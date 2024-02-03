import React from 'react'

import { useTranslation } from 'react-i18next'

import { CollapseCard } from '@components/CollapseCard'
// import { Avatar, Tooltip } from 'antd'
// import { Link } from 'react-router-dom'

// import styles from './index.module.scss'

export type Employees = {
  id: number
  name: string
  surname: string
}

type PermissionSystemProps = {
  //   employees: Employees[]
}

export const PermissionSystem: React.FC<PermissionSystemProps> = () =>
  //   {
  //     //   employees,
  //   }
  {
    const [translated_phrase] = useTranslation('global')
    return (
      <CollapseCard
        items={[
          {
            key: '1',
            label: translated_phrase('PermissionSystem.permission_system'),
            children: <div>text</div>,
            // extra: <div>extra</div>,
          },
        ]}
      />
    )
  }
