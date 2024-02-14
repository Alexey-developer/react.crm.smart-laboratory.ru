import React from 'react'

import { Button, Popover, Space } from 'antd'

// import styles from './index.module.scss'

import { useTranslation } from 'react-i18next'

type FilterProps = {
  filters: { groupName: string; content: React.ReactNode }[]
}

export const Filter: React.FC<FilterProps> = ({ filters }) => {
  const [translated_phrase] = useTranslation('global')

  return (
    <Popover
      content={
        <>
          <Space direction='vertical'>
            {filters.map(filter => (
              <Popover
                content={filter.content}
                trigger='click'
                placement='right'
                // arrow
              >
                <Button className='smart-btn transparent'>
                  <Space>
                    {filter.groupName}
                    <span className='ant-btn-icon'>
                      <i className='fa-solid fa-arrow-right-long'></i>
                    </span>
                  </Space>
                </Button>
              </Popover>
            ))}
          </Space>
        </>
      }
      //   title='Title'
      trigger='click'
      //   open={open}
      //   onOpenChange={handleOpenChange}
      placement='bottom'
    >
      <Button
        className='smart-btn'
        icon={<i className='fa-solid fa-filter'></i>}
      >
        {translated_phrase('Filters.filters')}
      </Button>
    </Popover>
  )
}
