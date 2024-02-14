import React from 'react'

import { Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd'
// import styles from './index.module.scss'

import { useTranslation } from 'react-i18next'

type FilterProps = {
  items: MenuProps['items']
}

export const Filter: React.FC<FilterProps> = ({ items }) => {
  const [translated_phrase] = useTranslation('global')

  return (
    <Dropdown
      menu={{ items }}
      // trigger={['click']}
    >
      <a onClick={e => e.preventDefault()}>
        <Space>
          {translated_phrase('Filters.filters')}
          {/* <DownOutlined /> */}
        </Space>
      </a>
    </Dropdown>
  )
}
