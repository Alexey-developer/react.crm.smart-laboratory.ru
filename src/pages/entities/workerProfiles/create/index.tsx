import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { WorkerProfileGroup } from '@api/models/workerProfile/queryGroup'

import * as URIs from '@utils/constants/routes'
import { SetPageTitle } from '@utils/helpers'
import { getCustomForm } from '@utils/xHelpers'
import { getFormItems, getIconType } from '../helpers'

export const CreateWorkerProfilePage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.Employees.profiles')}: ${translated_phrase(
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
    translated_phrase('MenuItems.Employees.profiles'),
    'success transparent',
    getIconType(),
    WorkerProfileGroup,
    'STORE',
    data => {
      navigate(`/${URIs.WORKER_PROFILES}/${data.data.data.id}`)
    },
    'CREATE',
    translated_phrase('Actions.create'),
    {
      utc_offset: 3,
    },
    undefined,
    'EntitiesFields.'
  )
}
