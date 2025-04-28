import React from 'react'

import { Link } from 'react-router-dom'

import {
  Row,
  Space,
  Flex,
  Button,
  Tag,
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

import { FormCard } from './FormCard'
import { FormActions } from './FormActions'
import { DefaultCard } from '@components/DefaultCard'
import { type Filters, Filter } from '@components/Filter'
import { type RequestSortState, Sort } from '@components/Sort'
import { CustomSearch } from './CustomSearch'
import { CustomPagination } from '@components/CustomPagination'
import { AlertCard } from '@components/AlertCard'

import { getMethod } from '@utils/getMethod'
import { convert2string, seconds2Time, SetPageTitle } from '@utils/helpers'
import { useGetStateCurrentPageFilters } from '@utils/useGetStateCurrentPageFilters'
import { getIcon } from '@utils/getIcon'
import { COMMON_CREATING } from '@utils/constants/routes'
import { getCheckboxFilterType } from '@utils/getCheckboxFilterType'

type EntityIndexProps = {
  pageTitleCode: string
  groupClass: GroupClass
  entityFilters: Filters
  FormContent: (entity: any) => React.ReactNode
  actionIndexes: number[]
  extraTopComponents?: React.ReactNode[]
  viewType?: ViewType
  state?: TState
}

export const EntityIndex: React.FC<EntityIndexProps> = ({
  pageTitleCode,
  groupClass,
  entityFilters,
  FormContent,
  actionIndexes,
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

  const filters = useGetStateCurrentPageFilters()
  //   console.log('FILTERS: ', filters)

  const {
    data,
    isLoading,
    isFetching,
    refetch,
    isRefetching,
    isPending,
    error,
  } = useAPIQuery(groupClass, getMethod('INDEX'), {
    page: requestPageState.value,
    query: requestQueryState.value,
    query_fields: requestQueryFieldsState.value,
    filters: filters,
    sort_by: requestSortState.sortByFiledName,
    sort_direction: requestSortState.sortDirection,
  })

  //   console.log('isLoading: ', isLoading)
  //   console.log('isFetching: ', isFetching)
  //   console.log('isRefetching: ', isRefetching)
  //   console.log('isPending: ', isPending)
  //   console.log('------------------------------------')

  const {
    //
    mutateAsync: mutateAsyncDelete,
    isPending: isPendingMutationDelete,
  } = useAPIMutation(groupClass, getMethod('DESTROY'), {})
  const {
    mutateAsync: mutateAsyncRestore,
    isPending: isPendingMutationRestore,
  } = useAPIMutation(groupClass, getMethod('RESTORE'), {})

  //   console.log('data: ', data)

  React.useEffect(() => {
    dispatch(setPageIsLoaded(!isLoading && !isFetching))
  }, [isLoading, isFetching])

  const Card: React.FC<{ entity: any }> = ({ entity }) => {
    return FormCard({
      isLoading: isLoading,
      entity: entity,
      FormContent: FormContent,
      cardActions: FormActions(
        entity.id,
        entity.deleted_at ? [3] : actionIndexes,
        () => {
          entity.deleted_at
            ? mutateAsyncRestore(entity.id).then(() => refetch())
            : mutateAsyncDelete(entity.id).then(() => refetch())
        },
        entity.project?.id
      ),
      grid:
        !viewType || viewType === 'list'
          ? undefined
          : { xs: 24, lg: 24, xl: 24, xxl: 24 },
    })
  }

  type Attribute = {
    field: string
    value: number
    type: 'time' | 'money' | 'common'
  }
  const Calculation: React.FC<{
    attribute: Attribute
  }> = ({ attribute }) => {
    let value, icon, className
    switch (attribute.type) {
      case 'time':
        value = seconds2Time(attribute.value, translated_phrase)
        icon = getIcon('TIME')
        className = 'success transparent'
        break
      case 'money':
        value = convert2string(attribute.value, '₽')
        icon = getIcon('RUBLE')
        className = 'warning transparent'
        break
      case 'common':
        // value = (attribute.value / data?.meta.total).toFixed(2)
        value = attribute.value
        icon = getIcon('INFO')
        className = 'success'
        break
    }

    return (
      <Tag className={className} icon={<i className={icon}></i>}>
        {`${translated_phrase(
          `Form.EntitiesFields.${attribute.field}`
        )}: ${value}`}
      </Tag>
    )
  }

  //
  let tasksViewScrum = <></>
  //   console.log(1111111, tasksViewScrum)
  const taskStatuses = useAPIQuery(
    getCheckboxFilterType('TASK_STATUS').group,
    getMethod('INDEX')
  )
  if (viewType === 'scrum') {
    interface DataType {
      // key: React.Key
      // name: string
      [name: string]: any
    }
    const rows: DataType[] = []

    data?.data?.map((entity: any, i: number) => {
      let createNewRow = true
      //   console.log(235235, entity.status)

      if (!rows.length) {
        rows.push({
          key: rows.length + 1,
          [entity.status.lang_code]: (
            <Row justify='start'>{<Card key={i} entity={entity} />}</Row>
          ),
        })
        return
      }
      rows.map(row => {
        if (typeof row[entity.status.lang_code] === 'undefined') {
          row[entity.status.lang_code] = (
            <Row justify='start'>{<Card key={i} entity={entity} />}</Row>
          )
          createNewRow = false
          return
        }
      })
      if (createNewRow) {
        rows.push({
          key: rows.length + 1,
          [entity.status.lang_code]: (
            <Row justify='start'>{<Card key={i} entity={entity} />}</Row>
          ),
        })
      }
      // return
    })

    const columns: TableColumnsType<DataType> = []
    taskStatuses?.data?.map(taskStatus => {
      columns.push({
        title: translated_phrase(taskStatus.lang_code),
        dataIndex: taskStatus.lang_code,
        key: taskStatus.id,
      })
    })

    const newColumns = columns.map(item => ({
      ...item,
      hidden: !state?.checkedList.includes(item.key as number),
    }))
    tasksViewScrum = (
      <>
        <Table
          // loading
          bordered
          // virtual
          scroll={{ x: 1900, y: 1000 }}
          columns={newColumns}
          dataSource={rows}
          //   style={{ marginTop: 24 }}
          pagination={false}
        />
      </>
    )
  }

  const tabs: Tab[] = [
    {
      key: '1',
      label: 'total',
      children: (
        <Space direction='vertical'>
          {data?.meta.total_calculations.map(
            (attribute: Attribute, index: number) => (
              <Calculation key={index} attribute={attribute} />
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
          {data?.meta.average_calculations.map(
            (attribute: Attribute, index: number) => (
              <Calculation key={index} attribute={attribute} />
            )
          )}
        </Space>
      ),
      icon: '',
    },
  ]

  // <Space direction='vertical'>
  //   {data?.meta.total_calculations.map(
  //     (attribute: Attribute, index: number) => (
  //       <Calculation key={index} attribute={attribute} />
  //     )
  //   )}
  //   {data?.meta.average_calculations.map(
  //     (attribute: Attribute, index: number) => (
  //       <Calculation key={index} attribute={attribute} />
  //     )
  //   )}
  // </Space>
  //

  return (
    <>
      <Flex justify='space-between'>
        <Space>
          <Filter
            filters={entityFilters}
            isLoading={isLoading || isFetching}
            // total={data?.meta.total}
          />
          <Sort
            requestSortState={requestSortState}
            isLoading={isLoading || isFetching}
            sortAttributes={data?.meta.sort_attributes}
          />
          {extraTopComponents?.map(topComponent => topComponent)}
        </Space>
        {/* <Flex justify='flex-center'>
          <Tag
            className={'success'}
            // icon={<i className={getIcon('RUBLE')}></i>}
          >
            {data?.meta.total}
          </Tag>
        </Flex> */}
        <Flex justify='flex-end'>
          <Space>
            <Popover
              //   title={translated_phrase('Search.title')}
              title='Общие числа'
              trigger='click'
              //   open={open}
              placement='bottom'
              // onOpenChange={onPopoverOpenChangeHandler}
              content={
                <Tabs
                  defaultActiveKey='1'
                  items={tabs}
                  // items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
                  //   const id = String(i + 1);
                  //   return {
                  //     key: id,
                  //     label: `Tab ${id}`,
                  //     children: `Tab ${id}`,
                  //     icon: <Icon />,
                  //   };
                  // })}
                />

                // <Space direction='vertical'>
                //   {data?.meta.total_calculations.map(
                //     (attribute: Attribute, index: number) => (
                //       <Calculation key={index} attribute={attribute} />
                //     )
                //   )}
                //   {data?.meta.average_calculations.map(
                //     (attribute: Attribute, index: number) => (
                //       <Calculation key={index} attribute={attribute} />
                //     )
                //   )}
                // </Space>
              }
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
      <Row style={{ marginTop: 20 }} justify='start'>
        {!isLoading /*&& !isFetching */ &&
          (!viewType || viewType === 'list') &&
          data?.data?.map((entity: any, i: number) => (
            <Card key={i} entity={entity} />
          ))}
        {!isLoading && viewType === 'scrum' && tasksViewScrum}
        {
          /*(*/ isLoading /* || isFetching)*/ &&
            [...Array(perPage)]?.map((skeleton, i) => (
              <DefaultCard
                isLoading={isLoading || isFetching}
                key={i}
                title=''
                content={<></>}
              />
            ))
        }
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
