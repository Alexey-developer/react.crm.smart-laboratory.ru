import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { DirectionGroup } from '@api/models/direction/queryGroup'

import * as URIs from '@utils/constants/routes'
import { SetPageTitle } from '@utils/helpers'
import { getCustomForm } from '@utils/xHelpers'
import { getFormItems, getIconType } from '../helpers'

export const CreateDirectionPage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.directions')}: ${translated_phrase(
      'Modes.creating'
    )}`
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(setPageIsLoaded(true))
  }, [])

  return getCustomForm(
    getFormItems([]),
    translated_phrase('Modes.creating'),
    translated_phrase('MenuItems.directions'),
    'success transparent',
    getIconType(),
    DirectionGroup,
    'STORE',
    data => {
      navigate(`/${URIs.DIRECTIONS}/${data.data.data.id}`)
    },
    'CREATE',
    translated_phrase('Actions.create'),
    {
      status_id: 1,
      direction_family_id: 1,
      direction_type_id: 1,
      payment_model_id: 1,
    },
    undefined,
    'EntitiesFields.'
  )
}
