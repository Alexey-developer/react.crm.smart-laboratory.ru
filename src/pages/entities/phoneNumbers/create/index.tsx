import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { PhoneNumberGroup } from '@api/models/phoneNumber/queryGroup'

import * as URIs from '@utils/constants/routes'
import { SetPageTitle } from '@utils/helpers'
import { getCustomForm } from '@utils/xHelpers'
import { getFormItems, getIconType } from '../helpers'

export const CreatePhoneNumberPage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.Telephony.phone_numbers')}: ${translated_phrase(
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
    translated_phrase('MenuItems.Telephony.phone_numbers'),
    'success transparent',
    getIconType(),
    PhoneNumberGroup,
    'STORE',
    data => {
      navigate(`/${URIs.PHONE_NUMBERS}/${data.data.data.id}`)
    },
    'CREATE',
    translated_phrase('Actions.create'),
    {
      phoneable_type: 'customer_company',
      is_primary: false,
    },
    undefined,
    'EntitiesFields.'
  )
}
