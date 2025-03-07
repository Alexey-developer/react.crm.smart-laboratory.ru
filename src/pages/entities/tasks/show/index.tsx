import React, { useEffect } from 'react'
import { Row, Col, Tag, Progress } from 'antd'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'
import { CollapseCard } from '@components/CollapseCard'
import { AlertCard } from '@components/AlertCard'
import { IncludedEmployees } from '@components/IncludedEmployees'

import { ActionButton } from '@components/ActionButton'
import { Link, useLocation } from 'react-router-dom'

import { SetPageTitle } from '@utils/helpers'
import { formCardExtra } from '@utils/formCardExtra'
import { getIcon } from '@utils/getIcon'
import { COMMON_EDITING } from '@utils/constants/routes'
import { convert2string } from '@utils/helpers'

// import { DefaultCard } from '@components/DefaultCard'
// import { ActionButton } from '@components/ActionButton'
// import { IncludedEmployees } from '@components/IncludedEmployees'
// import type { Employees } from '@components/IncludedEmployees'

// import { formCardExtra } from '@utils/formCardExtra'

import { getProject } from '@utils/tempData'
import { PermissionSystem } from '@components/PermissionSystem'
import { DefaultCard } from '@components/DefaultCard'

export const TaskPage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(`${translated_phrase('MenuItems.tasks')}: # /* + id*/}`)

  const location = useLocation()
  const { pathname } = location

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageIsLoaded(true))
  }, [])

  const project = getProject()

  return (
    <>
      <Row>
        <AlertCard
          message={project.totalTime}
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
          message={convert2string(project.incomes, '₽')}
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
            convert2string(project.costsAuto, '₽ - ') +
            convert2string(project.costs, '₽ = ') +
            convert2string(project.costsAuto - project.costs, '₽')
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
          message={convert2string(project.penalty, '₽')}
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
          key={project.id}
          type='default'
          title={'#' + project.id + ' ' + project.name}
          badgeRibbonText={translated_phrase('Statuses.Project.in_progress')}
          badgeRibbonClassName={'success transparent'}
          content={
            <>
              <Tag
                className={'success'}
                icon={<i className='fa-solid fa-chart-line-up'></i>}
              >
                {(project.incomes / project.costsAuto).toFixed(2)}
              </Tag>
              <Tag
                className={'transparent'}
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {project.createdAt}
              </Tag>
              <Progress percent={project.progress} />
              <IncludedEmployees employees={project.employees} />
            </>
          }
          actions={[
            <ActionButton
              className='transparent'
              title={translated_phrase('MenuItems.tasks')}
              shape='circle'
              icon={getIcon('TASKS')}
            />,
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
            'warning transparent',
            translated_phrase('Types.Project.development')
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
