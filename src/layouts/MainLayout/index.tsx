import React, { useEffect } from 'react'

import './reset.css'
import './common.scss'

import '@assets/fontawesome/load'

import { useSelector } from 'react-redux'
import { selectLang } from '@redux/Language/selectors'
import { selectAuthToken } from '@redux/CurrentUser/selectors'
import { getDayjsLocale } from '@redux/Language/languages'

import { ConfigProvider } from 'antd'

import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/az'
import 'dayjs/locale/be'
import 'dayjs/locale/de'
import 'dayjs/locale/fr'
import 'dayjs/locale/ja'
import 'dayjs/locale/kk'
import 'dayjs/locale/ky'
import 'dayjs/locale/ru'
import 'dayjs/locale/tr'
import 'dayjs/locale/zh-cn'

import { Sidebar } from '@components/Sidebar'
import { RealtimeProvider } from '@components/RealtimeProvider'
import { UserPermissionsRealtime } from '@components/UserPermissionsRealtime'

import { getAntdLocale } from '@utils/getAntdLocale'
import { GetValidateMessages } from '@utils/helpers'

dayjs.extend(updateLocale)

export const MainLayout: React.FC = () => {
  const lang = useSelector(selectLang)
  const authToken = useSelector(selectAuthToken)
  const dayjsLocale = getDayjsLocale(lang)
  const validateMessages = GetValidateMessages()

  useEffect(() => {
    dayjs.updateLocale(dayjsLocale, {
      weekStart: 1,
    })
  }, [dayjsLocale])

  return (
    <ConfigProvider locale={getAntdLocale(lang)} form={{ validateMessages }}>
      <RealtimeProvider token={authToken || null}>
        <UserPermissionsRealtime />
        <div className='wrapper'>
          <Sidebar />
        </div>
      </RealtimeProvider>
    </ConfigProvider>
  )
}
