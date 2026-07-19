import React from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useReactive } from 'ahooks'

import type { Store } from 'rc-field-form/lib/interface'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { CallExtensionGroup } from '@api/models/callExtension/queryGroup'

import { useAPIQuery } from '@api/useAPIQuery'

import { DefaultCard } from '@components/DefaultCard'
import { Skeleton } from '@components/Skeleton'

import * as URIs from '@utils/constants/routes'
import { getMethod } from '@utils/getMethod'
import { formCardExtra } from '@utils/formCardExtra'
import { SetPageTitle } from '@utils/helpers'
import { getCustomForm, getFormCardTitle } from '@utils/xHelpers'
import { getFormItems, getIconType } from '../helpers'

export const EditCallExtensionPage: React.FC = () => {
  const { entityId } = useParams()

  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase(
      'MenuItems.Telephony.call_extensions'
    )}: #${entityId} - ${translated_phrase('Modes.editing')}`
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, isLoading, isFetching } = useAPIQuery(
    CallExtensionGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const callExtension = data?.data

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
          <Skeleton
            isLoading={isLoading}
            width='100%'
            height='400px'
            skeleton={<></>}
            content={<></>}
          />
        }
        extra={formCardExtra(
          'warning transparent',
          translated_phrase('MenuItems.Telephony.call_extensions')
        )}
      />
    ),
  })

  React.useEffect(() => {
    if (isLoading || isFetching || !callExtension) {
      return
    }
    dispatch(setPageIsLoaded(!isLoading && !isFetching))

    const formItems = getFormItems()
    formItems.forEach(value => {
      state.initialValues[value.name] = callExtension[value.name]
    })

    state.customForm = getCustomForm(
      formItems,
      translated_phrase('Modes.editing'),
      translated_phrase('MenuItems.Telephony.call_extensions'),
      'warning transparent',
      getIconType(),
      CallExtensionGroup,
      'UPDATE',
      data => {
        navigate(`/${URIs.CALL_EXTENSIONS}/${data.data.data.id}`)
      },
      'EDIT',
      translated_phrase('Actions.edit'),
      state.initialValues,
      entityId as number | undefined,
      'EntitiesFields.'
    )
  }, [isLoading, isFetching, callExtension])

  return state.customForm
}
