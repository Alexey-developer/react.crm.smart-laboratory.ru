import React from 'react'
import { Collapse } from 'antd'
import type { CollapseProps } from 'antd'

// import styles from './index.module.scss'

type CollapseCardProps = {
  items: CollapseProps['items']
}

export const CollapseCard: React.FC<CollapseCardProps> = ({ items }) => {
  //   const label = 'label'
  //   const text = 'text'
  //   const extra = 'extra'

  //   const items: CollapseProps['items'] = [
  //     {
  //       key: '1',
  //       label: label,
  //       children: <div>{text}</div>,
  //       extra: <div>{extra}</div>,
  //     },
  //     {
  //       key: '2',
  //       label: 'This is panel header 2',
  //       children: <div>{text}</div>,
  //       extra: <div>{extra}</div>,
  //     },
  //   ]

  return (
    <Collapse
      //   defaultActiveKey={['1']}
      //   onChange={onChange}
      expandIconPosition='end'
      items={items}
      bordered={false}
      //   destroyInactivePanel={true}
      expandIcon={panelProps => {
        // console.log(1, panelProps)
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
