import React, { useEffect } from 'react'
import { Row, Col } from 'antd'

import { useTranslation } from 'react-i18next'

import { SetPageTitle } from '@utils/helpers'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'
import { CollapseCard } from '@components/CollapseCard'
import { AlertCard } from '@components/AlertCard'
import { IncludedEmployees } from '@components/IncludedEmployees'

import { ActionButton } from '@components/ActionButton'
import { Link } from 'react-router-dom'
import { getIcon } from '@utils/getIcon'
import { convert2string } from '@utils/helpers'

// import { DefaultCard } from '@components/DefaultCard'
// import { ActionButton } from '@components/ActionButton'
// import { IncludedEmployees } from '@components/IncludedEmployees'
// import type { Employees } from '@components/IncludedEmployees'

// import { formCardExtra } from '@utils/formCardExtra'

import { getProject } from '@utils/tempData'
import { PermissionSystem } from '@components/PermissionSystem'

export const ProjectsPage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(translated_phrase('MenuItems.projects') + ': #' /* + id*/)

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
        <Col span={24} className='default-col'>
          <IncludedEmployees employees={project.employees} />
        </Col>
        <Col span={24} className='default-col'>
          <CollapseCard
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
          <PermissionSystem />
        </Col>
      </Row>
    </>
  )
}
