import React from 'react'

// import { useTranslation } from 'react-i18next'

import { Col, Pagination, Row } from 'antd'
import type { PaginationProps } from 'antd'
// import { Avatar, Tooltip } from 'antd'
// import { Link } from 'react-router-dom'

import './index.module.scss'

type CustomPaginationProps = {
  onChange: PaginationProps['onChange']
  total: number
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  onChange,
  total,
}) => {
  // const [translated_phrase] = useTranslation('global')
  return (
    <Row>
      <Col span={24} className='default-col'>
        <Pagination
          showQuickJumper
          showSizeChanger
          defaultCurrent={1}
          defaultPageSize={10}
          hideOnSinglePage={false}
          total={total}
          onChange={onChange}
        />
      </Col>
    </Row>
  )
}
