import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
type BreadcrumbItem = ItemType

import { formLeftMenuItems } from '@utils/formLeftMenuItems'
import { COMMON_CREATING, COMMON_EDITING } from '@utils/constants/routes'
import { getIcon } from '@utils/getIcon'

import { Breadcrumb } from 'antd'

import './index.module.scss'

export const Breadcrumbs: React.FC = () => {
  const [translated_phrase] = useTranslation('global')

  const location = useLocation()
  const { pathname } = location
  //   console.log(1, pathname)
  const pathnames = pathname.split('/').filter(item => item)
  // console.log(2, pathnames)

  let homeItem = <i className='fa-solid fa-home'></i>

  if (pathname !== '/') {
    homeItem = <Link to={'/'}>{homeItem}</Link>
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      title: <>{homeItem}</>,
    },
  ]

  const leftMenuItems = formLeftMenuItems()
  const leftMenuItem = leftMenuItems.find(
    leftMenuItem => leftMenuItem.path === pathnames[0]
  )

  if (leftMenuItem) {
    let secondItem = (
      <>
        <i className={leftMenuItem.icon}></i>
        <span> {translated_phrase(leftMenuItem.name_key)}</span>
      </>
    )

    if (pathnames[1]) {
      secondItem = <Link to={leftMenuItem.path}>{secondItem}</Link>
    }

    breadcrumbItems.push({
      title: secondItem,
    })

    if (pathnames[1] === COMMON_CREATING) {
      breadcrumbItems.push({
        title: (
          <>
            <i className={getIcon('CREATE')}></i>
            <span> {translated_phrase('Modes.creating')}</span>
          </>
        ),
      })
    } else if (!isNaN(parseInt(pathnames[1]))) {
      let thirdItem = (
        <>
          <i className={getIcon('ID')}></i>
          <span> {pathnames[1]}</span>
        </>
      )

      if (pathnames[2] === COMMON_EDITING) {
        thirdItem = (
          <Link to={leftMenuItem.path + '/' + pathnames[1]}>{thirdItem}</Link>
        )
      }

      breadcrumbItems.push({
        title: thirdItem,
      })

      if (pathnames[2] === COMMON_EDITING) {
        breadcrumbItems.push({
          title: (
            <>
              <i className={getIcon('EDIT')}></i>
              <span> {translated_phrase('Modes.editing')}</span>
            </>
          ),
        })
      }
    }
  }

  return (
    <Breadcrumb
      separator={<i className='fa-regular fa-chevrons-right'></i>}
      items={breadcrumbItems}
    />
  )
}
