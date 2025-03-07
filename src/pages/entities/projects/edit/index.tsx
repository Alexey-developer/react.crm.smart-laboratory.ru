import React from 'react'
// import { Row, Col, Tag, Progress } from 'antd'

import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useReactive } from 'ahooks'

import type { Store } from 'rc-field-form/lib/interface'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { ProjectGroup } from '@api/models/project/queryGroup'

import { useAPIQuery } from '@api/useAPIQuery'

// import { CollapseCard } from '@components/CollapseCard'
import { DefaultCard } from '@components/DefaultCard'
import { Skeleton } from '@components/Skeleton'

import { getMethod } from '@utils/getMethod'
import { formCardExtra } from '@utils/formCardExtra'
import { SetPageTitle } from '@utils/helpers'
import { getCustomForm, getFormCardTitle } from '@utils/xHelpers'
import { getFormItems, getIconType } from '../helpers'
import { formSkeleton } from './formSkeleton'

export const EditProjectPage: React.FC = () => {
  const { entityId } = useParams()

  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase(
      'MenuItems.projects'
    )}: #${entityId} - ${translated_phrase('Modes.editing')}`
  )

  const dispatch = useDispatch()

  const { data, isLoading, isFetching, refetch, isRefetching, isPending } =
    useAPIQuery(ProjectGroup, getMethod('SHOW'), {
      id: entityId,
    })

  const project = data?.data
  //   console.log(project)

  const state = useReactive<{
    initialValues: Store
    customForm: React.ReactNode
  }>({
    initialValues: {},
    customForm: (
      <DefaultCard
        grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
        type='default'
        title={getFormCardTitle(getIconType())}
        badgeRibbonText={translated_phrase('Modes.editing')}
        badgeRibbonClassName={'warning'}
        content={
          //   <div style={{ minHeight: '800px' }}>
          <Skeleton
            isLoading={isLoading}
            width='100%'
            height='720px'
            skeleton={formSkeleton()}
            content={<></>}
          />
          //   </div>
        }
        extra={formCardExtra(
          'warning transparent',
          translated_phrase('MenuItems.projects')
        )}
      />
    ),
  })

  React.useEffect(() => {
    if (isLoading || isFetching) {
      return
    }
    dispatch(setPageIsLoaded(!isLoading && !isFetching))

    const formItems = getFormItems()
    formItems.map(
      value => (state.initialValues[value.name] = project[value.name])
    )

    state.customForm = getCustomForm(
      formItems,
      translated_phrase('Modes.editing'),
      translated_phrase('MenuItems.projects'),
      'warning transparent',
      getIconType(),
      ProjectGroup,
      'UPDATE',
      'EDIT',
      translated_phrase('Actions.edit'),
      state.initialValues
    )
  }, [isLoading, isFetching])

  return state.customForm
}
