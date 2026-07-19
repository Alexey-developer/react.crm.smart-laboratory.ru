import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { OurCompanyGroup } from '@api/models/ourCompany/queryGroup'

import * as URIs from '@utils/constants/routes'
import { SetPageTitle } from '@utils/helpers'
import { getCustomForm } from '@utils/xHelpers'
import { getFormItems, getIconType } from '../helpers'

export const CreateOurCompanyPage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.Studio.our_companies')}: ${translated_phrase(
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
    translated_phrase('MenuItems.Studio.our_companies'),
    'success transparent',
    getIconType(),
    OurCompanyGroup,
    'STORE',
    data => {
      navigate(`/${URIs.OUR_COMPANIES}/${data.data.data.id}`)
    },
    'CREATE',
    translated_phrase('Actions.create'),
    { status: 'active' },
    undefined,
    'EntitiesFields.'
  )
}
