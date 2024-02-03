import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { SetPageTitle } from '@utils/helpers'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

export const HomePage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(translated_phrase('Extra.home_page'))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageIsLoaded(true))
  }, [])

  return (
    <>
      {/* <h1>{translated_phrase('Extra.home_page')}</h1> */}
      <h1>p</h1>
    </>
  )
}
