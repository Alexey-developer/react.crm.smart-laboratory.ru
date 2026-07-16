import React from 'react'
import { Row, Col, Tag, Progress } from 'antd'

import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { ProjectGroup } from '@api/models/project/queryGroup'

import { useAPIQuery } from '@api/useAPIQuery'
import { useAPIMutation } from '@api/useAPIMutation'

import { Skeleton } from '@components/Skeleton'
import { useFormActions } from '@components/EntityIndex/FormActions'
import { CollapseCard } from '@components/CollapseCard'
import { AlertCard } from '@components/AlertCard'
import { PermissionSystem } from '@components/PermissionSystem'
import { DefaultCard } from '@components/DefaultCard'

import { ActionButton } from '@components/ActionButton'

import { getMethod } from '@utils/getMethod'
import { SetPageTitle, seconds2Time } from '@utils/helpers'
import { getIcon } from '@utils/getIcon'
import { PROJECTS } from '@utils/constants/routes'
import {
  formatBillingMoney,
  formatCostsAutoVsBilling,
  formatProjectionMoney,
} from '@utils/formatFinancialMoney'

import { formSkeletonTop } from './formSkeleton'
import { formSkeletonBottom } from './formSkeleton'

export const ProjectPage: React.FC = () => {
  const { entityId } = useParams()
  const projectId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(`${translated_phrase('MenuItems.projects')}: #${entityId}`)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    ProjectGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const project = data?.data

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    ProjectGroup,
    getMethod('DESTROY'),
    {}
  )

  const cardActions = useFormActions(
    projectId,
    [6, 4, 1, 2],
    () => mutateAsyncDelete(projectId).then(() => navigate(`/${PROJECTS}`)),
    { directionsCount: project?.directions_count }
  )

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
                  message={formatBillingMoney(
                    project.total_incomes,
                    project.currency
                  )}
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
                  message={formatCostsAutoVsBilling(
                    project.financial_projections,
                    project.total_costs,
                    project.currency
                  )}
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
                  message={formatProjectionMoney(
                    project.financial_projections,
                    'total_penalty_funds',
                    project.currency?.symbol
                  )}
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
          badgeRibbonText={
            project.monitoring_enabled
              ? translated_phrase('Form.EntitiesFields.monitoring_enabled')
              : ''
          }
          badgeRibbonClassName={
            project.monitoring_enabled ? 'success' : 'transparent'
          }
          content={
            <>
              <h2>{project.description}</h2>
              <Tag
                className={'success'}
                icon={<i className='fa-solid fa-chart-line-up'></i>}
              >
                {project.total_costs_auto
                  ? (project.total_incomes / project.total_costs_auto).toFixed(2)
                  : '—'}
              </Tag>
              <Tag
                className={'transparent'}
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {project.created_at}
              </Tag>
              <Progress percent={project.common_task_progress} />
            </>
          }
          actions={cardActions}
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
                    type='transparent'
                    items={[
                      {
                        key: '1',
                        label: translated_phrase('Info.endpoints'),
                        children: <div>{translated_phrase('Info.coming_soon')}</div>,
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
