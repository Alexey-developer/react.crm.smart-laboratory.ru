import React from 'react'
import { Row, Col, Tag, Progress } from 'antd'

import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { DirectionGroup } from '@api/models/direction/queryGroup'

import { useAPIQuery } from '@api/useAPIQuery'
import { useAPIMutation } from '@api/useAPIMutation'

import { Skeleton } from '@components/Skeleton'
import { useFormActions } from '@components/EntityIndex/FormActions'
import { CollapseCard } from '@components/CollapseCard'
import { AlertCard } from '@components/AlertCard'
import { IncludedEmployees } from '@components/IncludedEmployees'
import { PermissionSystem } from '@components/PermissionSystem'
import { DefaultCard } from '@components/DefaultCard'

import { ActionButton } from '@components/ActionButton'

import { getMethod } from '@utils/getMethod'
import { SetPageTitle, seconds2Time } from '@utils/helpers'
import { formCardExtra } from '@utils/formCardExtra'
import { getIcon } from '@utils/getIcon'
import { DIRECTIONS } from '@utils/constants/routes'
import {
  formatBillingMoney,
  formatCostsAutoVsBilling,
  formatIncomeToCostRatio,
  formatProjectionMoney,
} from '@utils/formatFinancialMoney'

import { formSkeletonTop } from './formSkeleton'
import { formSkeletonBottom } from './formSkeleton'

import { getProject } from '@utils/tempData'
import { directionParentEntity } from '@utils/entityFormActions/directionParentEntity'

export const DirectionPage: React.FC = () => {
  const { entityId } = useParams()
  const directionId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(`${translated_phrase('MenuItems.directions')}: #${entityId}`)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    DirectionGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const direction = data?.data
  const parentProject = direction ? directionParentEntity(direction) : undefined

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    DirectionGroup,
    getMethod('DESTROY'),
    {}
  )

  const cardActions = useFormActions(
    directionId,
    [4, 5, 1, 2],
    () => mutateAsyncDelete(directionId).then(() => navigate(`/${DIRECTIONS}`)),
    {
      tasksFilterKey: 'direction_id',
      parentEntityId: parentProject?.id ?? direction?.project_id,
      parentEntityTitle: parentProject?.label,
    }
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
          direction && (
            <>
              <Row>
                <AlertCard
                  message={seconds2Time(
                    direction.total_spent_time,
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
                    direction.total_incomes,
                    direction.currency ?? direction.project?.currency
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
                    direction.financial_projections,
                    direction.total_costs,
                    direction.currency ?? direction.project?.currency
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
                    direction.financial_projections,
                    'total_penalty_funds',
                    (direction.currency ?? direction.project?.currency)?.symbol
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
      {direction ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          key={direction.id}
          type='default'
          title={`# ${direction.id} ${direction.name}`}
          badgeRibbonText={translated_phrase(
            direction.direction_type.lang_code
          )}
          badgeRibbonClassName={direction.direction_type.class}
          content={
            <>
              <h2>{direction.description}</h2>
              <Tag
                className={'success'}
                icon={<i className='fa-solid fa-chart-line-up'></i>}
              >
                {formatIncomeToCostRatio(
                  direction.total_incomes,
                  direction.financial_projections,
                  direction.currency?.id ?? direction.project?.currency?.id
                )}
              </Tag>
              <Tag
                className={'transparent'}
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {direction.created_at}
              </Tag>
              <Progress percent={direction.common_task_progress} />
              <IncludedEmployees employees={getProject().employees} />
            </>
          }
          actions={cardActions}
          extra={formCardExtra(
            direction.status.class,
            translated_phrase(direction.status.lang_code)
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
          direction && (
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
