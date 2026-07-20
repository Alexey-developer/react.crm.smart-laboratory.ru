import React from 'react'

import { Link } from 'react-router-dom'

import {
  Row,
  Col,
  Space,
  Flex,
  Button,
  Popover,
  Table,
  type TableColumnsType,
  Tabs,
} from 'antd'

import type { Tab } from 'rc-tabs/lib/interface.d.ts'

import { useReactive } from 'ahooks'

import { useTranslation } from 'react-i18next'

import { useDispatch, useSelector } from 'react-redux'
import { selectPerPage } from '@redux/CurrentUser/selectors'
import { setPageIsLoaded } from '@redux/PageLoading/slice'
import type { ViewType } from '@redux/TasksView/types'

import type { GroupClass } from '@api/common/types/TGroups'
import { useAPIQuery } from '@api/useAPIQuery'
import { useAPIMutation } from '@api/useAPIMutation'

import { EntityCard } from './EntityCard'
import {
  MetaCalculation,
  type MetaCalculationAttribute,
} from './MetaCalculation'
import type { EntityFormActionsConfig } from './types'
import { DefaultCard } from '@components/DefaultCard'
import { type Filters, Filter } from '@components/Filter'
import { type RequestSortState, Sort } from '@components/Sort'
import { CustomSearch } from './CustomSearch'
import { CustomPagination } from '@components/CustomPagination'
import { AlertCard } from '@components/AlertCard'

import { getMethod } from '@utils/getMethod'
import { SetPageTitle } from '@utils/helpers'
import { useGetStateCurrentPageFilters } from '@utils/useGetStateCurrentPageFilters'
import { useSyncFiltersFromSearchParams } from '@utils/useSyncFiltersFromSearchParams'
import { getIcon } from '@utils/getIcon'
import { COMMON_CREATING } from '@utils/constants/routes'
import { getCheckboxFilterType } from '@utils/getCheckboxFilterType'

import styles from './index.module.scss'

export type { EntityFormActionsConfig } from './types'

type EntityIndexProps = {
  pageTitleCode: string
  groupClass: GroupClass
  entityFilters: Filters
  FormContent: (entity: any) => React.ReactNode
  actionIndexes: number[]
  /** Per-entity override (e.g. hide edit for non-manual calls). */
  resolveActionIndexes?: (entity: any) => number[]
  formActions?: EntityFormActionsConfig
  /** Avatar circles in list loading skeleton (default 4; WTR = 1; compact cards = 0). */
  skeletonEmployeeCount?: number
  /**
   * Progress + metric strip in list skeleton.
   * Default follows `skeletonEmployeeCount >= 2`. Pass `false` for OperatorProfile / telephony / companies / profiles.
   */
  skeletonShowProgress?: boolean
  extraTopComponents?: React.ReactNode[]
  viewType?: ViewType
  state?: TState
}

const SCRUM_COLUMN_MIN_WIDTH = 380
const SCRUM_TABLE_MIN_SCROLL_X = 1200
const SCRUM_TABLE_SCROLL_Y = 1000
const EMPTY_CARD_CONTENT = <></>

export const EntityIndex: React.FC<EntityIndexProps> = ({
  pageTitleCode,
  groupClass,
  entityFilters,
  FormContent,
  actionIndexes,
  resolveActionIndexes,
  formActions,
  skeletonEmployeeCount = 4,
  skeletonShowProgress,
  extraTopComponents,
  viewType,
  state,
}) => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(translated_phrase(pageTitleCode))

  const dispatch = useDispatch()
  const perPage = useSelector(selectPerPage)

  const requestPageState = useReactive<{
    value: number
  }>({
    value: 1,
  })

  const requestQueryState = useReactive<{
    value: string
  }>({
    value: '',
  })

  const requestQueryFieldsState = useReactive<{
    value: string[]
  }>({
    value: [],
  })

  const requestSortState = useReactive<RequestSortState>({
    sortByFiledName: 'id',
    sortDirection: 'desc',
  })

  useSyncFiltersFromSearchParams()

  const filters = useGetStateCurrentPageFilters()

  const {
    data,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useAPIQuery(groupClass, getMethod('INDEX'), {
    page: requestPageState.value,
    query: requestQueryState.value,
    query_fields: requestQueryFieldsState.value,
    filters: filters,
    sort_by: requestSortState.sortByFiledName,
    sort_direction: requestSortState.sortDirection,
  })

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    groupClass,
    getMethod('DESTROY'),
    {}
  )
  const { mutateAsync: mutateAsyncRestore } = useAPIMutation(
    groupClass,
    getMethod('RESTORE'),
    {}
  )

  React.useEffect(() => {
    dispatch(setPageIsLoaded(!isLoading && !isFetching))
  }, [dispatch, isLoading, isFetching])

  const handleDelete = React.useCallback(
    (id: number) => mutateAsyncDelete(id).then(() => refetch()),
    [mutateAsyncDelete, refetch]
  )
  const handleRestore = React.useCallback(
    (id: number) => mutateAsyncRestore(id).then(() => refetch()),
    [mutateAsyncRestore, refetch]
  )

  const renderEntityCard = (entity: any) => (
    <EntityCard
      key={entity.id}
      entity={entity}
      isLoading={isLoading}
      FormContent={FormContent}
      actionIndexes={actionIndexes}
      resolveActionIndexes={resolveActionIndexes}
      formActions={formActions}
      viewType={viewType}
      onDelete={handleDelete}
      onRestore={handleRestore}
    />
  )

  let tasksViewScrum = <></>
  const isScrum = viewType === 'scrum'
  const taskStatuses = useAPIQuery(
    getCheckboxFilterType('TASK_STATUS').group,
    getMethod('INDEX'),
    {},
    isScrum
  )

  if (isScrum) {
    interface DataType {
      [name: string]: any
    }
    const rows: DataType[] = []

    data?.data?.forEach((entity: any) => {
      let createNewRow = true

      if (!rows.length) {
        rows.push({
          key: rows.length + 1,
          [entity.status.lang_code]: (
            <Row justify='start'>{renderEntityCard(entity)}</Row>
          ),
        })
        return
      }
      rows.forEach(row => {
        if (typeof row[entity.status.lang_code] === 'undefined') {
          row[entity.status.lang_code] = (
            <Row justify='start'>{renderEntityCard(entity)}</Row>
          )
          createNewRow = false
        }
      })
      if (createNewRow) {
        rows.push({
          key: rows.length + 1,
          [entity.status.lang_code]: (
            <Row justify='start'>{renderEntityCard(entity)}</Row>
          ),
        })
      }
    })

    const columns: TableColumnsType<DataType> = []
    taskStatuses?.data?.forEach(taskStatus => {
      columns.push({
        title: translated_phrase(taskStatus.lang_code),
        dataIndex: taskStatus.lang_code,
        key: taskStatus.id,
        minWidth: SCRUM_COLUMN_MIN_WIDTH,
      })
    })

    const newColumns = columns.map(item => ({
      ...item,
      hidden: !state?.checkedList.includes(item.key as number),
    }))
    const visibleColumnCount = newColumns.filter(column => !column.hidden)
      .length
    const scrollX = Math.max(
      visibleColumnCount * SCRUM_COLUMN_MIN_WIDTH,
      SCRUM_TABLE_MIN_SCROLL_X
    )

    tasksViewScrum = (
      <Table
        bordered
        className={`tasks-scrum-table ${styles.scrum_table}`}
        scroll={{ x: scrollX, y: SCRUM_TABLE_SCROLL_Y }}
        columns={newColumns}
        dataSource={rows}
        pagination={false}
      />
    )
  }

  const tabs: Tab[] = [
    {
      key: '1',
      label: 'total',
      children: (
        <Space direction='vertical'>
          {(data?.meta.total_calculations ?? []).map(
            (attribute: MetaCalculationAttribute, index: number) => (
              <MetaCalculation key={index} attribute={attribute} />
            )
          )}
        </Space>
      ),
      icon: '',
    },
    {
      key: '2',
      label: 'average',
      children: (
        <Space direction='vertical'>
          {(data?.meta.average_calculations ?? []).map(
            (attribute: MetaCalculationAttribute, index: number) => (
              <MetaCalculation key={index} attribute={attribute} />
            )
          )}
        </Space>
      ),
      icon: '',
    },
  ]

  return (
    <>
      <Flex justify='space-between'>
        <Space>
          <Filter
            filters={entityFilters}
            isLoading={isLoading || isFetching}
          />
          <Sort
            requestSortState={requestSortState}
            isLoading={isLoading || isFetching}
            sortAttributes={data?.meta.sort_attributes}
          />
          {extraTopComponents?.map(topComponent => topComponent)}
        </Space>
        <Flex justify='flex-end'>
          <Space>
            <Popover
              title='Общие числа'
              trigger='click'
              placement='bottom'
              content={<Tabs defaultActiveKey='1' items={tabs} />}
            >
              <Button
                className={'smart-btn warning transparent'}
                icon={<i className={getIcon('INFO')}></i>}
              >
                {`${translated_phrase('Search.found')} - (${
                  data?.meta.total ?? 0
                }) ${translated_phrase('Items.short_pieces')}`}
              </Button>
            </Popover>
            <CustomSearch
              requestQueryState={requestQueryState}
              requestQueryFieldsState={requestQueryFieldsState}
              isLoading={isLoading || isFetching}
              searchAttributes={data?.meta.search_attributes}
            />
            <Link to={COMMON_CREATING}>
              <Button
                className='smart-btn success'
                icon={<i className={getIcon('CREATE')}></i>}
              />
            </Link>
          </Space>
        </Flex>
      </Flex>
      <CustomPagination
        requestPageState={requestPageState}
        total={data?.meta.total}
        lastPage={data?.meta.last_page}
      />
      <Row className={styles.cards_row} justify='start'>
        {!isLoading &&
          (!viewType || viewType === 'list') &&
          data?.data?.map((entity: any) => renderEntityCard(entity))}
        {!isLoading && viewType === 'scrum' && (
          <Col span={24}>{tasksViewScrum}</Col>
        )}
        {isLoading &&
          [...Array(perPage)]?.map((_, i) => (
            <DefaultCard
              isLoading={isLoading || isFetching}
              skeletonActionCount={actionIndexes.length}
              skeletonEmployeeCount={skeletonEmployeeCount}
              skeletonShowProgress={skeletonShowProgress}
              key={i}
              title=''
              content={EMPTY_CARD_CONTENT}
            />
          ))}
      </Row>
      {error && (
        <AlertCard
          message={error.response?.statusText}
          description={error.message}
          icon={<i className={getIcon('ERROR')}></i>}
          type='danger'
          col={false}
        />
      )}
      <CustomPagination
        requestPageState={requestPageState}
        total={data?.meta.total}
        lastPage={data?.meta.last_page}
      />
    </>
  )
}
