import React from 'react'
import { Collapse } from 'antd'
import type { CollapseProps } from 'antd'

import { TColorType } from '@api/common/types/TColorType'

import './index.module.scss'

type CollapseCardProps = {
  type?: TColorType
  items: CollapseProps['items']
}

export const CollapseCard: React.FC<CollapseCardProps> = ({ type, items }) => {
  return (
    <Collapse
      //   defaultActiveKey={['1']}
      //   onChange={onChange}
      //   destroyInactivePanel={true}
      expandIconPosition='end'
      items={items}
      bordered={false}
      className={type}
      expandIcon={panelProps => {
        return panelProps.isActive ? (
          <i className='fa-solid fa-minus'></i>
        ) : (
          <i className='fa-solid fa-plus'></i>
        )
      }}
      ghost={true}
      //   size='large'
    />
  )
}
