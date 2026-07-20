import React, { Suspense, useEffect, useLayoutEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectIsCollapsed } from '@redux/CollapseSider/selectors'
import { selectAuthToken } from '@redux/CurrentUser/selectors'

import { Layout } from 'antd'

import styles from './index.module.scss'

import { Logo } from '@components/Logo'
import { LeftMenu } from '@components/LeftMenu'
import { TopHeader } from '@components/TopHeader'
import { Breadcrumbs } from '@components/Breadcrumbs'
import { CustomSpin } from '@components/CustomSpin'
import { Notification } from '@components/Notification'
import { TopLoadingBar } from '@components/TopLoadingBar'
import { Auth } from '@components/Auth'
import { PageSuspenseFallback } from '@components/PageSuspenseFallback'

const { Content, Footer, Sider } = Layout

/** Syncs sider width class without forcing Outlet / Softphone to re-render. */
const SiderCollapseSync: React.FC = () => {
  const isCollapsed = useSelector(selectIsCollapsed)

  useLayoutEffect(() => {
    document.documentElement.dataset.sider = isCollapsed ? 'collapsed' : 'opened'
  }, [isCollapsed])

  return null
}

const AppSider: React.FC = () => {
  const isCollapsed = useSelector(selectIsCollapsed)

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      className={styles.sider}
    >
      <Logo />
      <LeftMenu />
    </Sider>
  )
}

const PageOutlet: React.FC = () => (
  <>
    <Breadcrumbs />
    <Suspense fallback={<PageSuspenseFallback />}>
      <Outlet />
    </Suspense>
  </>
)

export const Sidebar: React.FC = () => {
  const authToken = useSelector(selectAuthToken)
  const navigate = useNavigate()

  useEffect(() => {
    const { pathname } = location
    if (pathname === '/auth' && authToken) {
      navigate('/')
    }
    if (!authToken) {
      navigate('/auth')
    }
  }, [authToken, navigate])

  return (
    <Layout hasSider={Boolean(authToken)}>
      <SiderCollapseSync />
      {authToken && <AppSider />}
      <Layout
        className={`${styles.site_layout_common} ${
          authToken ? styles.with_sider : ''
        }`}
      >
        <CustomSpin />
        <Notification />
        {authToken && <TopLoadingBar />}

        <TopHeader />

        <Content className={styles.content}>
          {authToken ? <PageOutlet /> : <Auth />}
        </Content>
        <Footer className={styles.footer}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
