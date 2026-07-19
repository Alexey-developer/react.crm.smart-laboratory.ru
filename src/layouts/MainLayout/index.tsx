import React from 'react'

import './reset.css'
import './common.scss'

import '@assets/fontawesome/v6.5.1/css/all.css'
import '@assets/fontawesome/v6.5.1/css/sharp-thin.css'
import '@assets/fontawesome/v6.5.1/css/sharp-solid.css'
import '@assets/fontawesome/v6.5.1/css/sharp-regular.css'
import '@assets/fontawesome/v6.5.1/css/sharp-light.css'

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
// import 'dayjs/locale/en'

import { Sidebar } from '@components/Sidebar'
import { RealtimeProvider } from '@components/RealtimeProvider'
import { UserPermissionsRealtime } from '@components/UserPermissionsRealtime'

import { getAntdLocale } from '@utils/getAntdLocale'
import { GetValidateMessages } from '@utils/helpers'

export const MainLayout: React.FC = () => {
  const lang = useSelector(selectLang)
  const authToken = useSelector(selectAuthToken)
  const dayjsLocale = getDayjsLocale(lang)

  dayjs.extend(updateLocale)

  dayjs.updateLocale(dayjsLocale, {
    weekStart: 1,
  })

  const validateMessages = GetValidateMessages()

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
