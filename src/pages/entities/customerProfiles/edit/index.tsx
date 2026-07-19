import React from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useReactive } from 'ahooks'

import type { Store } from 'rc-field-form/lib/interface'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { CustomerProfileGroup } from '@api/models/customerProfile/queryGroup'

import { useAPIQuery } from '@api/useAPIQuery'

import { DefaultCard } from '@components/DefaultCard'
import { Skeleton } from '@components/Skeleton'

import * as URIs from '@utils/constants/routes'
import { getMethod } from '@utils/getMethod'
import { formCardExtra } from '@utils/formCardExtra'
import { SetPageTitle } from '@utils/helpers'
import { getCustomForm, getFormCardTitle } from '@utils/xHelpers'
import { getFormItems, getIconType } from '../helpers'

export const EditCustomerProfilePage: React.FC = () => {
  const { entityId } = useParams()

  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase(
      'MenuItems.WorkingWithCustomers.customer_profiles'
    )}: #${entityId} - ${translated_phrase('Modes.editing')}`
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, isLoading, isFetching } = useAPIQuery(
    CustomerProfileGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const customerProfile = data?.data

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
          translated_phrase('MenuItems.WorkingWithCustomers.customer_profiles')
        )}
      />
    ),
  })

  React.useEffect(() => {
    if (isLoading || isFetching || !customerProfile) {
      return
    }
    dispatch(setPageIsLoaded(!isLoading && !isFetching))

    const formItems = getFormItems()
    formItems.forEach(value => {
      state.initialValues[value.name] = customerProfile[value.name]
    })

    state.initialValues.customer_company_ids =
      customerProfile.customer_company_ids ??
      customerProfile.customer_companies?.map((c: { id: number }) => c.id) ??
      []
    state.initialValues.project_ids =
      customerProfile.project_ids ??
      customerProfile.projects?.map((p: { id: number }) => p.id) ??
      []

    state.customForm = getCustomForm(
      formItems,
      translated_phrase('Modes.editing'),
      translated_phrase('MenuItems.WorkingWithCustomers.customer_profiles'),
      'warning transparent',
      getIconType(),
      CustomerProfileGroup,
      'UPDATE',
      data => {
        navigate(`/${URIs.CUSTOMER_PROFILES}/${data.data.data.id}`)
      },
      'EDIT',
      translated_phrase('Actions.edit'),
      state.initialValues,
      entityId as number | undefined,
      'EntitiesFields.'
    )
  }, [isLoading, isFetching, customerProfile])

  return state.customForm
}
