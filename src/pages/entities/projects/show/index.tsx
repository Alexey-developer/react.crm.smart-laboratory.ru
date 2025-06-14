import React from 'react'
import { Row, Col, Tag, Progress, Badge } from 'antd'

import { useTranslation } from 'react-i18next'
import { Link, useLocation, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { ProjectGroup } from '@api/models/project/queryGroup'

import { useAPIQuery } from '@api/useAPIQuery'

import { Skeleton } from '@components/Skeleton'
import { CollapseCard } from '@components/CollapseCard'
import { AlertCard } from '@components/AlertCard'
import { IncludedEmployees } from '@components/IncludedEmployees'
import { PermissionSystem } from '@components/PermissionSystem'
import { DefaultCard } from '@components/DefaultCard'

import { ActionButton } from '@components/ActionButton'

import { getMethod } from '@utils/getMethod'
import { SetPageTitle } from '@utils/helpers'
import { formCardExtra } from '@utils/formCardExtra'
import { getIcon } from '@utils/getIcon'
import { TASKS, COMMON_EDITING } from '@utils/constants/routes'
import { convert2string, seconds2Time } from '@utils/helpers'

// import { DefaultCard } from '@components/DefaultCard'
// import { ActionButton } from '@components/ActionButton'
// import { IncludedEmployees } from '@components/IncludedEmployees'
// import type { Employees } from '@components/IncludedEmployees'

// import { formCardExtra } from '@utils/formCardExtra'

import { formSkeletonTop } from './formSkeleton'
import { formSkeletonBottom } from './formSkeleton'

import { getProject } from '@utils/tempData'

export const ProjectPage: React.FC = () => {
  const { entityId } = useParams()
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(`${translated_phrase('MenuItems.projects')}: #${entityId}`)

  const location = useLocation()
  const { pathname } = location

  const dispatch = useDispatch()

  const {
    data,
    isLoading,
    isFetching,
    refetch,
    isRefetching,
    isPending,
    error,
  } = useAPIQuery(ProjectGroup, getMethod('SHOW'), {
    id: entityId,
  })

  const project = data?.data
  console.log(project)

  React.useEffect(() => {
    dispatch(setPageIsLoaded(!isLoading && !isFetching))
  }, [isLoading, isFetching])

  return (
    <>
      <Skeleton
        isLoading={isLoading}
        width='100%'
        height='100'
        skeleton={formSkeletonTop()}
        content={
          project && (
            <>
              <Row>
                <AlertCard
                  message={seconds2Time(
                    project.total_spent_time,
                    translated_phrase
                  )}
                  description={translated_phrase('Statistics.time_spent')}
                  icon={<i className={getIcon('TIME')}></i>}
                  action={
                    <Link to={'#'}>
                      <ActionButton
                        title={translated_phrase('Actions.go')}
                        shape='circle'
                        icon={getIcon('GO')}
                      />
                    </Link>
                  }
                  type='transparent'
                />
                <AlertCard
                  message={convert2string(project.total_incomes, '₽')}
                  description={translated_phrase('Statistics.incomes')}
                  icon={<i className={getIcon('RUBLE')}></i>}
                  action={
                    <Link to={'#'}>
                      <ActionButton
                        className='success'
                        title={translated_phrase('Actions.go')}
                        shape='circle'
                        icon={getIcon('GO')}
                      />
                    </Link>
                  }
                  type='success transparent'
                />
                <AlertCard
                  message={
                    convert2string(project.total_costs_auto, '₽ - ') +
                    convert2string(project.total_costs, '₽ = ') +
                    convert2string(
                      project.total_costs_auto - project.total_costs,
                      '₽'
                    )
                  }
                  description={
                    translated_phrase('Statistics.costs_auto') +
                    ' - ' +
                    translated_phrase('Statistics.costs')
                  }
                  icon={<i className={getIcon('RUBLE')}></i>}
                  action={
                    <Link to={'#'}>
                      <ActionButton
                        className='danger'
                        title={translated_phrase('Actions.go')}
                        shape='circle'
                        icon={getIcon('GO')}
                      />
                    </Link>
                  }
                  type='danger transparent'
                />
                <AlertCard
                  message={convert2string(project.total_penalty_funds, '₽')}
                  description={translated_phrase('Statistics.penalty')}
                  icon={<i className={getIcon('RUBLE')}></i>}
                  action={
                    <Link to={'#'}>
                      <ActionButton
                        className='warning'
                        title={translated_phrase('Actions.go')}
                        shape='circle'
                        icon={getIcon('GO')}
                      />
                    </Link>
                  }
                  type='warning transparent'
                />
              </Row>
            </>
          )
        }
      />
      {project ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          key={project.id}
          type='default'
          title={`# ${project.id} ${project.name}`}
          badgeRibbonText={translated_phrase(project.status.lang_code)}
          badgeRibbonClassName={project.status.class}
          content={
            <>
              <h2>{project.description}</h2>
              <Tag
                className={'success'}
                icon={<i className='fa-solid fa-chart-line-up'></i>}
              >
                {(project.total_incomes / project.total_costs_auto).toFixed(2)}
              </Tag>
              <Tag
                className={'transparent'}
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {project.created_at}
              </Tag>
              <Progress percent={project.common_task_progress} />
              <IncludedEmployees employees={getProject().employees} />
            </>
          }
          actions={[
            <Link to={`/${TASKS}/?project_id=${project.id}`}>
              <Badge count='+99' offset={[15, 5]}>
                <ActionButton
                  className='transparent'
                  title={translated_phrase('MenuItems.tasks')}
                  shape='circle'
                  icon={getIcon('TASKS')}
                />
              </Badge>
            </Link>,
            <Link to={pathname + '/' + COMMON_EDITING}>
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
          ]}
          extra={formCardExtra(
            project.type.class,
            translated_phrase(project.type.lang_code)
          )}
        />
      ) : isLoading ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          isLoading={true}
          title=''
          content={<></>}
        />
      ) : (
        error && (
          <AlertCard
            message={error.response?.statusText}
            description={error.message}
            icon={<i className={getIcon('ERROR')}></i>}
            type='danger'
            col={false}
          />
        )
      )}
      <Skeleton
        isLoading={isLoading}
        width='100%'
        height='100%'
        skeleton={formSkeletonBottom()}
        content={
          project && (
            <>
              <Row>
                <Col span={24} className='default-col'>
                  <PermissionSystem
                    permissions={[
                      { name: 'Видеть в списке', action: 'index' },
                      { name: 'Просматривать', action: 'index' },
                    ]}
                  />
                </Col>
                <Col span={24} className='default-col'>
                  <CollapseCard
                    type='danger transparent'
                    items={[
                      {
                        key: '1',
                        label: translated_phrase('Info.accesses'),
                        children: <div>text</div>,
                        // extra: <div>extra</div>,
                      },
                    ]}
                  />
                </Col>
                <Col span={24} className='default-col'>
                  <CollapseCard
                    type='success transparent'
                    items={[
                      {
                        key: '1',
                        label: translated_phrase('Info.repositories'),
                        children: <div>text</div>,
                        // extra: <div>extra</div>,
                      },
                    ]}
                  />
                </Col>
                <Col span={24} className='default-col'>
                  <CollapseCard
                    type='warning transparent'
                    items={[
                      {
                        key: '1',
                        label: translated_phrase('Info.technology_stack'),
                        children: <div>text</div>,
                        // extra: <div>extra</div>,
                      },
                    ]}
                  />
                </Col>
                <Col span={24} className='default-col'>
                  <CollapseCard
                    type='transparent'
                    items={[
                      {
                        key: '1',
                        label: translated_phrase('Info.expirations'),
                        children: <div>text</div>,
                        // extra: <div>extra</div>,
                      },
                    ]}
                  />
                </Col>
                <Col span={24} className='default-col'>
                  <CollapseCard
                    items={[
                      {
                        key: '1',
                        label: translated_phrase('Info.other_links'),
                        children: <div>text</div>,
                        // extra: <div>extra</div>,
                      },
                    ]}
                  />
                </Col>
              </Row>
            </>
          )
        }
      />
    </>
  )
}
