import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { selectIsCollapsed } from '@redux/CollapseSider/selectors'
import { selectAuthToken } from '@redux/CurrentUser/selectors'
import { setIsCollapsed } from '@redux/CollapseSider/slice'

import { ChangeTheme } from '@components/ChangeTheme'
import { ChangeLanguage } from '@components/ChangeLanguage'
import { PageQRCode } from '@components/PageQRCode'
import { HeaderSearch } from '@components/HeaderSearch'
import { HeaderChats } from '@components/HeaderChats'
import { HeaderNotifications } from '@components/HeaderNotifications'
import { HeaderProfile } from '@components/HeaderProfile'
import { Softphone } from '@components/Softphone'
import { TelephonyAccountOverview } from '@components/TelephonyAccountOverview'
import { TelephonyQueueOverview } from '@components/TelephonyQueueOverview'

import styles from './index.module.scss'

import { Layout, Button, Flex } from 'antd'
const { Header } = Layout

/** Isolated so Softphone / telephony widgets do not re-render on sider toggle. */
const SiderCollapseButton: React.FC = () => {
  const dispatch = useDispatch()
  const isCollapsed = useSelector(selectIsCollapsed)

  return (
    <Button
      className={styles.header_btn}
      type='text'
      icon={
        isCollapsed ? (
          <i className='fa-solid fa-align-left'></i>
        ) : (
          <i className='fa-solid fa-align-right'></i>
        )
      }
      onClick={() => dispatch(setIsCollapsed(!isCollapsed))}
    />
  )
}

export const TopHeader: React.FC = () => {
  const authToken = useSelector(selectAuthToken)

  return (
    <Header>
      <Flex justify='space-between'>
        {authToken && (
          <Flex justify='flex-start'>
            <SiderCollapseButton />
            <HeaderSearch />
          </Flex>
        )}

        <Flex justify='center' className={styles.header_center}>
          <ChangeTheme />
          <ChangeLanguage />
          <PageQRCode />
        </Flex>

        {authToken && (
          <Flex justify='flex-end' align='center'>
            <TelephonyAccountOverview />
            <TelephonyQueueOverview />
            <Softphone />
            <HeaderChats />
            <HeaderNotifications />
            <HeaderProfile />
          </Flex>
        )}
      </Flex>
    </Header>
  )
}
