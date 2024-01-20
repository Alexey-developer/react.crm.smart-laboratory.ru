import React, { useEffect } from 'react'
import { Row, Badge, Tag, Progress } from 'antd'

import { useTranslation } from 'react-i18next'

import { SetPageTitle } from '@utils/SetPageTitle'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { DefaultCard } from '@components/DefaultCard'
import { ActionButton } from '@components/ActionButton'

import { formCardExtra } from '@utils/formCardExtra'
import { getIcon } from '@utils/getIcon'

export const ProjectsPage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(translated_phrase('MenuItems.projects'))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageIsLoaded(true))
  }, [])

  const cardActions = [
    <ActionButton
      className='transparent'
      title={translated_phrase('Actions.go')}
      shape='circle'
      icon={getIcon('GO')}
    />,
    <ActionButton
      className='warning transparent'
      title={translated_phrase('Actions.edit')}
      shape='circle'
      icon={getIcon('EDIT')}
    />,
    <ActionButton
      className='danger transparent'
      title={translated_phrase('Actions.delete')}
      shape='circle'
      icon={getIcon('DELETE')}
      useConfirm={true}
    />,
  ]

  const projects = [1, 2, 3, 4, 5, 6, 7, 8]

  const formContent = (
    description: string,
    created_at: string,
    incomes: number,
    costs: number
  ) => {
    return (
      <>
        <h2>{description}</h2>
        <Tag
          className={'success transparent'}
          icon={<i className={getIcon('MONEY')}></i>}
        >
          Принес {incomes.toLocaleString('ru-RU')} ₽
        </Tag>
        <Tag
          className={'danger transparent'}
          icon={<i className={getIcon('MONEY')}></i>}
        >
          Потрачено (авторачёт) {costs.toLocaleString('ru-RU')} ₽
        </Tag>
        <Tag
          className={'transparent'}
          icon={<i className={getIcon('CREATED_AT')}></i>}
        >
          {created_at}
        </Tag>
        <Progress percent={69} />
      </>
    )
  }

  return (
    <>
      {/* <Breadcrumbs
				extraBreadcrumbItems={[
					{
						title: (
							<>
								<i className='fa-solid fa-align-left'></i>
								<span> {translated_phrase('MenuItems.projects')}</span>
							</>
						),
					},
				]}
			/> */}
      {/* <h1>{translated_phrase('MenuItems.projects')}</h1> */}

      <Row justify='start'>
        {/* <Row justify='space-around'> */}
        {/* <Row justify='space-evenly'> */}
        {projects.map(i => (
          <DefaultCard
            title={'#' + i + ' Апельсин'}
            badgeRibbonText={translated_phrase('Statuses.Project.in_progress')}
            badgeRibbonClassName={'success transparent'}
            content={formContent(
              'Laravel (Backend API) + React (Frontend)',
              '31-07-2022 | 00:24:01',
              1817875,
              888210
            )}
            actions={cardActions}
            extra={formCardExtra(
              'warning transparent',
              translated_phrase('Types.Project.development')
            )}
          />
        ))}
      </Row>
    </>
  )
}
