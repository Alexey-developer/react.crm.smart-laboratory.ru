import React from 'react'
import { QRCode, Popover, Button } from 'antd'
import { useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '@redux/Theme/selectors'

import styles from './index.module.scss'

export const PageQRCode: React.FC = () => {
  const currentTheme = useSelector(selectCurrentTheme)

  const location = useLocation()
  const { pathname } = location
  //   console.log(pathname)

  return (
    <Popover
      content={
        <QRCode
          errorLevel='H'
          value='https://crm.smart-laboratory.ru/projects/5'
          //   icon={<i className='fa-regular fa-qrcode'></i>}
          color={
            currentTheme === 'dark' ? 'rgba(208, 212, 241)' : 'rgba(47, 43, 61)'
          }
          //   type='svg'
        />
      }
      trigger='click'
      placement='bottom'
    >
      <Button
        className={styles.header_btn}
        type='text'
        icon={<i className='fa-regular fa-qrcode'></i>}
      />
    </Popover>
  )
}
