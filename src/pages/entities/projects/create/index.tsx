import React from 'react'
// import { Row, Col, Tag, Progress } from 'antd'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { ProjectGroup } from '@api/models/project/queryGroup'

import { SetPageTitle } from '@utils/helpers'
import { getCustomForm } from '@utils/xHelpers'
import { getFormItems, getIconType } from '../helpers'

export const CreateProjectPage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.projects')}: ${translated_phrase(
      'Modes.creating'
    )}`
  )

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setPageIsLoaded(true))
  }, [])

  return getCustomForm(
    getFormItems([]),
    translated_phrase('Modes.creating'),
    translated_phrase('MenuItems.projects'),
    'success transparent',
    getIconType(),
    ProjectGroup,
    'STORE',
    'CREATE',
    translated_phrase('Actions.create')
  )
}
