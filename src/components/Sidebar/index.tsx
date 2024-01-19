import React from 'react'

import { useSelector } from 'react-redux'
import { selectIsCollapsed } from '@redux/CollapseSider/selectors'

import { Layout } from 'antd'

import styles from './index.module.scss'

import { Logo } from '@components/Logo'
import { LeftMenu } from '@components/LeftMenu'
import { TopHeader } from '@components/TopHeader'
import { Breadcrumbs } from '@components/Breadcrumbs'

import { Outlet } from 'react-router-dom'
import { TopLoadingBar } from '@components/TopLoadingBar'

const { Content, Footer, Sider } = Layout

export const Sidebar: React.FC = () => {
  const isCollapsed = useSelector(selectIsCollapsed)

  return (
    <Layout hasSider>
      <Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        className={styles.sider}
      >
        <Logo />
        <LeftMenu />
      </Sider>
      <Layout
        className={`site-layout ${styles.site_layout_common} ${
          isCollapsed ? styles.collapsed : styles.opened
        }`}
      >
        <TopLoadingBar />
        <TopHeader />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Breadcrumbs />
          <Outlet />
          <div
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
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
