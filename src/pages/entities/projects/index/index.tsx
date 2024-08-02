import React, { useEffect } from 'react'
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

import { SetPageTitle } from '@utils/helpers'
import { formCardExtra } from '@utils/formCardExtra'
import { getIcon } from '@utils/getIcon'
import { constants } from '@utils/constants.json'
import { convert2string } from '@utils/helpers'
import { getProject } from '@utils/tempData'

export const ProjectsPage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(translated_phrase('MenuItems.projects'))

  const location = useLocation()
  const { pathname } = location

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageIsLoaded(true))
  }, [])

  const projects = [
    getProject(),
    getProject(),
    getProject(),
    getProject(),
    getProject(),
    getProject(),
    getProject(),
    getProject(),
  ]

  const cardActions: React.ReactNode[][] = []

  projects.map((project, i) => {
    cardActions.push([
      <Link to={pathname + '/' + (project.id + i)}>
        <ActionButton
          title={translated_phrase('Actions.go')}
          shape='circle'
          icon={getIcon('GO')}
        />
      </Link>,
      <Link
        to={`/${constants.routes.basic.tasks}/?project_id=${project.id + i}`}
      >
        <Badge count='+99' offset={[15, 5]}>
          <ActionButton
            className='transparent'
            title={translated_phrase('MenuItems.tasks')}
            shape='circle'
            icon={getIcon('TASKS')}
          />
        </Badge>
      </Link>,
      <Link
        to={pathname + '/' + (project.id + i) + '/' + constants.routes.editing}
      >
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
    ])
  })

  const formContent = (
    description: string,
    createdAt: string,
    totalTime: string,
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

  //   const onChange: PaginationProps['onChange'] = pageNumber => {
  //     console.log('Page: ', pageNumber)
  //   }
  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    console.log('Page: ', page)
    console.log('pageSize: ', pageSize)
  }

  return (
    <>
      <Space>
        <Filter filters={[]} />
      </Space>

      <Row justify='start'>
        {/* <Row justify='space-around'> */}
        {/* <Row justify='space-evenly'> */}
        {projects.map((project, i) => (
          <DefaultCard
            key={project.id + i}
            type='default'
            title={'#' + (project.id + i) + ' ' + project.name}
            badgeRibbonText={translated_phrase('Statuses.Project.in_progress')}
            badgeRibbonClassName={'success transparent'}
            content={formContent(
              project.description,
              project.createdAt,
              project.totalTime,
              project.incomes,
              project.costsAuto,
              project.costs,
              project.penalty,
              project.progress,
              project.employees
            )}
            actions={cardActions[i]}
            extra={formCardExtra(
              'warning transparent',
              translated_phrase('Types.Project.development')
            )}
          />
        ))}
      </Row>
      <CustomPagination onChange={onChange} total={500} />
    </>
  )
}
