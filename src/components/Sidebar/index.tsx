import React, { Suspense, useEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

import { /*useDispatch,*/ useSelector } from 'react-redux'
import { selectIsCollapsed } from '@redux/CollapseSider/selectors'
import { selectAuthToken } from '@redux/CurrentUser/selectors'
// import { setIsSpinning } from '@redux/Spin/slice'

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

const { Content, Footer, Sider } = Layout

export const Sidebar: React.FC = () => {
  //   const dispatch = useDispatch()
  const isCollapsed = useSelector(selectIsCollapsed)
  const authToken = useSelector(selectAuthToken)

  const navigate = useNavigate()

  useEffect(() => {
    //if любой запрос 401 -> ставим '' или banned
    const { pathname } = location
    if (pathname === '/auth' && authToken) {
      //   dispatch(setIsSpinning(true))
      // setTimeout(() => {
      navigate('/')
      // }, 2000)
    }
    if (!authToken) {
      //   dispatch(setIsSpinning(true))
      // setTimeout(() => {
      navigate('/auth')
      // }, 2000)
    }
  }, [authToken, navigate])

  //   useEffect(() => {
  //     dispatch(setIsSpinning(true))
  //   }, [authToken, dispatch])

  const content = (
    <>
      <Breadcrumbs />
      <Suspense fallback={<div>Идёт загрузка страницы проекта...</div>}>
        <Outlet />
      </Suspense>

      {/* <div
        style={{
          padding: 24,
          textAlign: 'center',
        }}
      >
        <p>long content</p>
        {
          // indicates very long content
          Array.from({ length: 100 }, (_, index) => (
            <React.Fragment key={index}>
              {index % 20 === 0 && index ? 'more' : '...'}
              <br />
            </React.Fragment>
          ))
        }
      </div> */}
    </>
  )

  return (
    <Layout hasSider={authToken ? true : false}>
      {authToken && (
        <Sider
          trigger={null}
          collapsible
          collapsed={isCollapsed}
          className={styles.sider}
        >
          <Logo />
          <LeftMenu />
        </Sider>
      )}
      <Layout
        className={`site-layout ${styles.site_layout_common} ${
          authToken && (isCollapsed ? styles.collapsed : styles.opened)
        }`}
      >
        <CustomSpin />
        <Notification />
        {authToken && <TopLoadingBar />}

        <TopHeader />

        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {authToken ? content : <Auth />}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
