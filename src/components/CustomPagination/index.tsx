import React from 'react'

import { Col, Pagination, Row } from 'antd'
import type { PaginationProps } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { selectPerPage } from '@redux/CurrentUser/selectors'
import { setPerPage } from '@redux/CurrentUser/slice'
import { PerPageOptions, type PerPage } from '@redux/CurrentUser/types'

import './index.module.scss'

type CustomPaginationProps = {
  requestPageState: { value: number }
  total: number
  lastPage: number
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  requestPageState,
  total,
  lastPage,
}) => {
  const dispatch = useDispatch()

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    requestPageState.value = page
    dispatch(setPerPage(pageSize as PerPage))
  }

  React.useEffect(() => {
    if (requestPageState.value > lastPage) {
      requestPageState.value = lastPage
    }
  }, [lastPage])

  return (
    <Row>
      <Col span={24} className='default-col'>
        <Pagination
          showQuickJumper
          showSizeChanger
          defaultCurrent={1}
          current={requestPageState.value}
          defaultPageSize={useSelector(selectPerPage)}
          pageSize={useSelector(selectPerPage)}
          pageSizeOptions={[...PerPageOptions]}
          hideOnSinglePage={false}
          total={total}
          onChange={onChange}
        />
      </Col>
    </Row>
  )
}
