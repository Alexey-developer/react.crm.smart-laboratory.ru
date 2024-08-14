import React from 'react'
import { Row, Tag, Progress, Tooltip, Space, Badge } from 'antd'
import type { PaginationProps } from 'antd'

import { Link, useLocation } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { DefaultCard } from '@components/DefaultCard'
import { ActionButton } from '@components/ActionButton'
import { Filter } from '@components/Filter'
import { CustomPagination } from '@components/CustomPagination'
import { IncludedEmployees } from '@components/IncludedEmployees'
import type { Employees } from '@components/IncludedEmployees'

import { useAPIQuery } from '@api/useAPIQuery'
import { ProjectGroup } from '@api/models/project/queryGroup'
// import { ProjectStatusGroup } from '@api/models/projectStatus/queryGroup'
// import { ProjectTypeGroup } from '@api/models/projectType/queryGroup'
import { getMethod } from '@utils/getMethod'

import { SetPageTitle } from '@utils/helpers'
import { formCardExtra } from '@utils/formCardExtra'
import { getIcon } from '@utils/getIcon'
import { TASKS, COMMON_EDITING } from '@utils/constants/routes'
import { convert2string } from '@utils/helpers'
import { getProject } from '@utils/tempData'
import { useGetStateCurrentPageFilters } from '@utils/useGetStateCurrentPageFilters'
import { CheckboxFilter } from '@components/Filter/CheckboxFilter'
// import { getCheckboxFilterType } from '@utils/getCheckboxFilterType'
import { TProject } from '@api/models/project/type/TProject'
import { SelectFilter } from '@components/Filter/SelectFilter'
import { useReactive } from 'ahooks'

export const ProjectsPage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(translated_phrase('MenuItems.projects'))

  const location = useLocation()
  const { pathname } = location

  const dispatch = useDispatch()

  const requestPageState = useReactive<{
    value: number
  }>({
    value: 1,
  })

  const filters = useGetStateCurrentPageFilters()

  const { data, isLoading, isFetching, refetch } = useAPIQuery(
    ProjectGroup,
    getMethod('INDEX'),
    { page: requestPageState.value, filters: filters }
  )

  React.useEffect(() => {
    refetch()
  }, [requestPageState.value])

  //   console.log(123, data)

  React.useEffect(() => {
    dispatch(setPageIsLoaded(!isLoading && !isFetching))
  }, [isLoading, isFetching])

  const tempProject = getProject()

  const formContent = (
    description: string,
    createdAt: string,
    totalTime: number,
    incomes: number,
    costsAuto: number,
    costs: number,
    penalty: number,
    progress: number,
    employees: Employees[]
  ) => {
    return (
      <>
        <h2>{description}</h2>
        <Tooltip title={translated_phrase('Statistics.time_spent')}>
          <Tag
            className={'warning transparent'}
            icon={<i className={getIcon('TIME')}></i>}
          >
            {totalTime}
          </Tag>
        </Tooltip>
        <Tooltip title={translated_phrase('Statistics.incomes')}>
          <Tag
            className={'success transparent'}
            icon={<i className={getIcon('RUBLE')}></i>}
          >
            {convert2string(incomes, '₽')}
          </Tag>
        </Tooltip>
        <Tooltip
          title={
            translated_phrase('Statistics.costs_auto') +
            ' - ' +
            translated_phrase('Statistics.costs')
          }
        >
          <Tag
            className={'danger transparent'}
            icon={<i className={getIcon('RUBLE')}></i>}
          >
            {convert2string(costsAuto, '₽ - ')}
            {convert2string(costs, '₽ = ')}
            {convert2string(costsAuto - costs, '₽')}
          </Tag>
        </Tooltip>
        <Tooltip title={translated_phrase('Statistics.penalty')}>
          <Tag
            className={'warning transparent'}
            icon={<i className={getIcon('RUBLE')}></i>}
          >
            {convert2string(penalty, '₽')}
          </Tag>
        </Tooltip>

        <Tag
          className={'success'}
          icon={<i className='fa-solid fa-chart-line-up'></i>}
        >
          {(incomes / costsAuto).toFixed(2)}
        </Tag>
        <Tag
          className={'transparent'}
          icon={<i className={getIcon('CREATED_AT')}></i>}
        >
          {createdAt}
        </Tag>
        <Progress percent={progress} />
        <IncludedEmployees employees={employees} />
      </>
    )
  }

  const formActions = (entityId: number) => {
    return [
      <Link to={pathname + '/' + entityId}>
        <ActionButton
          title={translated_phrase('Actions.go')}
          shape='circle'
          icon={getIcon('GO')}
        />
      </Link>,
      <Link to={`/${TASKS}/?project_id=${entityId}`}>
        <Badge count='+99' offset={[15, 5]}>
          <ActionButton
            className='transparent'
            title={translated_phrase('MenuItems.tasks')}
            shape='circle'
            icon={getIcon('TASKS')}
          />
        </Badge>
      </Link>,
      <Link to={pathname + '/' + entityId + '/' + COMMON_EDITING}>
        <ActionButton
          className='warning transparent'
          title={translated_phrase('Actions.edit')}
          shape='circle'
          icon={getIcon('EDIT')}
        />
      </Link>,
      <ActionButton
        className='danger transparent'
        title={translated_phrase('Actions.delete')}
        shape='circle'
        icon={getIcon('DELETE')}
        useConfirm={true}
      />,
    ]
  }

  //   const onChange: PaginationProps['onChange'] = pageNumber => {
  //     console.log('Page: ', pageNumber)
  //   }
  //   const onChange: PaginationProps['onChange'] = (page, pageSize) => {
  //     console.log('Page: ', page)
  //     console.log('pageSize: ', pageSize)
  //   }

  return (
    <>
      <Space>
        <Filter
          filters={[
            CheckboxFilter('STATUS'),
            CheckboxFilter('TYPE'),
            SelectFilter('CUSTOMER_COMPANY'),
            // SelectFilter('CustomerCompanyGroup'),
          ]}
          isLoading={isLoading || isFetching}
          refetch={refetch}
        />
      </Space>

      <Row justify='start'>
        {!isLoading /*&& !isFetching */ &&
          data?.data?.map((project: TProject) => (
            <DefaultCard
              isLoading={isLoading}
              key={project.id}
              type='default'
              title={'#' + project.id + ' ' + project.name}
              badgeRibbonText={translated_phrase(project.status.lang_code)}
              badgeRibbonClassName={project.status.class}
              content={formContent(
                project.description,
                project.created_at,
                project.total_spent_time,
                project.total_incomes,
                project.total_costs_auto,
                project.total_costs,
                project.total_penalty_funds,
                project.common_task_progress,
                tempProject.employees
              )}
              actions={formActions(project.id)}
              extra={formCardExtra(
                project.type.class,
                translated_phrase(project.type.lang_code)
              )}
            />
          ))}
        {
          /*(*/ isLoading /* || isFetching)*/ &&
            [...Array(15)]?.map((skeleton, i) => (
              <DefaultCard
                isLoading={isLoading || isFetching}
                key={i}
                title=''
                content={<></>}
              />
            ))
        }
      </Row>
      <CustomPagination
        requestPageState={requestPageState}
        total={data?.meta.total}
      />
    </>
  )
}
