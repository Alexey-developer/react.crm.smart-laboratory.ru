import React, { useEffect } from 'react'
import { Row, Badge } from 'antd'

import { useTranslation } from 'react-i18next'

import { SetPageTitle } from '@utils/SetPageTitle'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { DefaultCard } from '@components/DefaultCard'
import { ActionButton } from '@components/ActionButton'

import { formCardExtra } from '@utils/formCardExtra'

export const ProjectsPage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(translated_phrase('MenuItems.projects'))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageIsLoaded(true))
  }, [])

  const cardActions = [
    <ActionButton
      title={translated_phrase('Actions.go')}
      shape='circle'
      icon={'fa-solid fa-arrow-right-from-arc'}
    />,
    <ActionButton
      className='warning' //transparent
      title={translated_phrase('Actions.edit')}
      shape='circle'
      icon={'fa-solid fa-pen-to-square'}
    />,
    <ActionButton
      className='danger' //transparent
      title={translated_phrase('Actions.delete')}
      shape='circle'
      icon={'fa-solid fa-trash'}
    />,
  ]

  const projects = [1, 2, 3, 4, 5, 6, 7, 8]

  const formContent = (description: string, created_at: string) => {
    return (
      <>
        <h2>{description}</h2>
        <Badge
          className={'transparent'}
          count={'Создан: ' + created_at}
        ></Badge>
        <Badge
          className={'transparent'}
          count={'Создан: ' + created_at}
        ></Badge>
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
        {/* {projects.map() => 
{        <DefaultCard
          title='#1 Апельсин'
          actions={cardActions}
          extra={formCardExtra('success transparent', 'Разработка')}
        />}
		} */}

        {projects.map(i => (
          <DefaultCard
            title={'#' + i + ' Апельсин'}
            badgeRibbonText={'В работе'}
            badgeRibbonClassName={'danger'}
            content={formContent(
              'Laravel (Backend API) + React (Frontend)',
              '31-07-2022 | 00:24:01'
            )}
            actions={cardActions}
            extra={formCardExtra('warning transparent', 'Разработка')}
          />
        ))}
      </Row>
    </>
  )
}
