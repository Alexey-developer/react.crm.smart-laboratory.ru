import React from 'react'

import './reset.css'
import './common.scss'

import '@assets/fontawesome/v6.5.1/css/all.css'
import '@assets/fontawesome/v6.5.1/css/sharp-thin.css'
import '@assets/fontawesome/v6.5.1/css/sharp-solid.css'
import '@assets/fontawesome/v6.5.1/css/sharp-regular.css'
import '@assets/fontawesome/v6.5.1/css/sharp-light.css'

import { Sidebar } from '@components/Sidebar'

import { useSelector } from 'react-redux'
import { selectLang } from '@redux/Language/selectors'

import { ConfigProvider } from 'antd'

import english from 'antd/locale/en_US'
import russian from 'antd/locale/ru_RU'

export const MainLayout: React.FC = () => {
  const lang = useSelector(selectLang)

  return (
    <ConfigProvider locale={lang === 'ru' ? russian : english}>
      <div className='wrapper'>
        <Sidebar />
        {/* <div className='content'>

				</div> */}
      </div>
    </ConfigProvider>
  )
}
