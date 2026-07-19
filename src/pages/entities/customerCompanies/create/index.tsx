import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { CustomerCompanyGroup } from '@api/models/customerCompany/queryGroup'

import * as URIs from '@utils/constants/routes'
import { SetPageTitle } from '@utils/helpers'
import { getCustomForm } from '@utils/xHelpers'
import { getFormItems, getIconType } from '../helpers'

export const CreateCustomerCompanyPage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.WorkingWithCustomers.companies')}: ${translated_phrase(
      'Modes.creating'
    )}`
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(setPageIsLoaded(true))
  }, [])

  return getCustomForm(
    getFormItems(),
    translated_phrase('Modes.creating'),
    translated_phrase('MenuItems.WorkingWithCustomers.companies'),
    'success transparent',
    getIconType(),
    CustomerCompanyGroup,
    'STORE',
    data => {
      navigate(`/${URIs.CUSTOMER_COMPANIES}/${data.data.data.id}`)
    },
    'CREATE',
    translated_phrase('Actions.create'),
    {},
    undefined,
    'EntitiesFields.'
  )
}
