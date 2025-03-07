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

import { ConfigProvider } from 'antd'

import english from 'antd/locale/en_US'
import russian from 'antd/locale/ru_RU'

import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/ru'
// import 'dayjs/locale/en'

import { Sidebar } from '@components/Sidebar'

import { GetValidateMessages } from '@utils/helpers'

export const MainLayout: React.FC = () => {
  const lang = useSelector(selectLang)

  dayjs.extend(updateLocale)

  dayjs.updateLocale(lang, {
    weekStart: 1,
  })

  const validateMessages = GetValidateMessages()

  return (
    <ConfigProvider
      locale={lang === 'ru' ? russian : english}
      form={{ validateMessages }}
    >
      <div className='wrapper'>
        <Sidebar />
      </div>
    </ConfigProvider>
  )
}
