import React, { useEffect } from 'react'
import { Row, Col, Tag, Progress } from 'antd'

import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { TaskGroup } from '@api/models/task/queryGroup'
import { useAPIQuery } from '@api/useAPIQuery'

import { CollapseCard } from '@components/CollapseCard'
import { AlertCard } from '@components/AlertCard'
import { IncludedEmployees } from '@components/IncludedEmployees'
import { PermissionSystem } from '@components/PermissionSystem'
import { DefaultCard } from '@components/DefaultCard'
import { ActionButton } from '@components/ActionButton'
import { useFormActions } from '@components/EntityIndex/FormActions'

import { getMethod } from '@utils/getMethod'
import { SetPageTitle, seconds2Time } from '@utils/helpers'
import { formCardExtra } from '@utils/formCardExtra'
import { getIcon } from '@utils/getIcon'
import { projectParentEntity } from '@utils/entityFormActions/projectParentEntity'
import { taskDirectionEntity } from '@utils/entityFormActions/taskDirectionEntity'
import {
  formatBillingMoney,
  formatCostsAutoVsBilling,
  formatIncomeToCostRatio,
  formatProjectionMoney,
} from '@utils/formatFinancialMoney'

import { getTaskRecurrenceRibbon } from '@utils/entityFormActions/getTaskRecurrenceRibbon'

import { getProject } from '@utils/tempData'

export const TaskPage: React.FC = () => {
  const { entityId } = useParams()
  const taskId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(`${translated_phrase('MenuItems.tasks')}: #${entityId}`)

  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    TaskGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const task = data?.data
  const billingCurrency = task?.project?.currency ?? task?.direction?.currency
  const parentProject = task ? projectParentEntity(task) : undefined
  const parentDirection = task ? taskDirectionEntity(task) : undefined
  const recurrenceRibbon = task
    ? getTaskRecurrenceRibbon(task, translated_phrase)
    : undefined

  const cardActions = useFormActions(
    taskId,
    [5, 7, 1, 2],
    () => {},
    {
      parentEntityId: parentProject?.id,
      parentEntityTitle: parentProject?.label,
      directionEntityId: parentDirection?.id,
      directionEntityTitle: parentDirection?.label,
    }
  )

  useEffect(() => {
    dispatch(setPageIsLoaded(!isLoading && !isFetching))
  }, [dispatch, isLoading, isFetching])

  return (
    <>
      {task ? (
        <Row>
          <AlertCard
            message={seconds2Time(task.total_spent_time, translated_phrase)}
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
            message={formatBillingMoney(task.total_incomes, billingCurrency)}
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
              task.financial_projections,
              task.total_costs,
              billingCurrency
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
              task.financial_projections,
              'total_penalty_funds',
              billingCurrency?.symbol
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
          <DefaultCard
            grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
            key={task.id}
            type='default'
            title={`# ${task.id} ${task.name}`}
            badgeRibbonText={recurrenceRibbon?.text ?? ''}
            badgeRibbonClassName={recurrenceRibbon?.className ?? 'transparent'}
            content={
              <>
                <h2>{task.description}</h2>
                <Tag
                  className={'success'}
                  icon={<i className='fa-solid fa-chart-line-up'></i>}
                >
                  {formatIncomeToCostRatio(
                    task.total_incomes,
                    task.financial_projections,
                    task.project?.currency?.id ?? task.direction?.currency?.id
                  )}
                </Tag>
                <Tag
                  className={'transparent'}
                  icon={<i className={getIcon('CREATED_AT')}></i>}
                >
                  {task.created_at}
                </Tag>
                <Progress percent={task.progress} />
                <IncludedEmployees employees={getProject().employees} />
              </>
            }
            actions={cardActions}
            extra={formCardExtra(
              task.status.class,
              translated_phrase(task.status.lang_code)
            )}
          />
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
    </>
  )
}
