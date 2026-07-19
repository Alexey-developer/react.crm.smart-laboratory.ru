import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { OperatorProfileGroup } from '@api/models/operatorProfile/queryGroup'

import * as URIs from '@utils/constants/routes'
import { SetPageTitle } from '@utils/helpers'
import { getCustomForm } from '@utils/xHelpers'
import { getFormItems, getIconType } from '../helpers'

export const CreateOperatorProfilePage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.Telephony.operator_profiles')}: ${translated_phrase(
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
    translated_phrase('MenuItems.Telephony.operator_profiles'),
    'success transparent',
    getIconType(),
    OperatorProfileGroup,
    'STORE',
    data => {
      navigate(`/${URIs.OPERATOR_PROFILES}/${data.data.data.id}`)
    },
    'CREATE',
    translated_phrase('Actions.create'),
    {
      softphone_enabled: true,
      mobile_dialer_enabled: false,
      is_active: true,
    },
    undefined,
    'EntitiesFields.'
  )
}
