import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { Menu, Badge } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { selectAuthToken } from '@redux/CurrentUser/selectors'
import { selectLeftMenuOpenKeys } from '@redux/LeftMenuOpenKeys/selectors'
import { setOpenKeys } from '@redux/LeftMenuOpenKeys/slice'

import { useAPIQuery } from '@api/useAPIQuery'
import { CurrentUserGroup } from '@api/models/currentUser/queryGroup'
import { getMethod } from '@utils/getMethod'

import {
  filterMenuItemsByPermissions,
  formLeftMenuItems,
} from '@utils/formLeftMenuItems'

import type { MenuItem } from '@utils/formLeftMenuItems'
import type { MenuProps } from 'antd'
// Локальные типы взамен legacy `antd/lib|es/menu/hooks/useItems` (несовместимы с antd v6).
// Public idiom (см. docs/menu): items — Required<MenuProps>['items'].
type ItemType = NonNullable<MenuProps['items']>[number]
type SubMenuType = ItemType & { children: ItemType[] }

export const LeftMenu: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  const location = useLocation()
  const { pathname } = location
  const pathnames = pathname.split('/').filter(item => item)

  const dispatch = useDispatch()
  const openKeys = useSelector(selectLeftMenuOpenKeys)
  const authToken = useSelector(selectAuthToken)
  const { data: currentUserResponse } = useAPIQuery(
    CurrentUserGroup,
    getMethod('CURRENT_USER'),
    {},
    Boolean(authToken)
  )
  const commonPermissions = currentUserResponse?.data?.common_permissions ?? []
  const catalog = currentUserResponse?.data?.common_permissions_catalog ?? {}

  const openHorizon = async () => {
    try {
      const group = new CurrentUserGroup(authToken)
      const response = await group.enterHorizon()
      const url = response.data?.url
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    } catch {
      // Policy/session still enforce; toast via global handlers if any.
    }
  }

  const items: MenuProps['items'] = []
  const leftMenuItems = filterMenuItemsByPermissions(
    formLeftMenuItems(),
    permissionKey => {
      const full = catalog[permissionKey] ?? permissionKey
      return commonPermissions.includes(full)
    }
  )

  const convert = (leftMenuItem: MenuItem) => {
    const label = (
      <>
        <span>{translated_phrase(leftMenuItem.name_key)}</span>
        {leftMenuItem.badge && (
          <Badge
            className={leftMenuItem.badge.className}
            offset={leftMenuItem.badge.offset}
            count={leftMenuItem.badge.count}
          ></Badge>
        )}
      </>
    )

    let itemLabel: React.ReactNode
    if (leftMenuItem.childrenMenuItems) {
      itemLabel = label
    } else if (leftMenuItem.openHorizon) {
      itemLabel = (
        <a
          href='#horizon'
          onClick={event => {
            event.preventDefault()
            void openHorizon()
          }}
        >
          {label}
        </a>
      )
    } else {
      itemLabel = <Link to={leftMenuItem.path}>{label}</Link>
    }

    const convertedMenuItem: ItemType = {
      key: leftMenuItem.key ?? leftMenuItem.path,
      label: itemLabel,
      icon: (
        <span className='anticon'>
          <i className={leftMenuItem.icon}></i>
        </span>
      ),
    }
    return convertedMenuItem
  }

  leftMenuItems.map(leftMenuItem => {
    const converted = convert(leftMenuItem)

    if (leftMenuItem.childrenMenuItems) (converted as SubMenuType).children = []

    leftMenuItem.childrenMenuItems?.map(childLeftMenuItem =>
      (converted as SubMenuType).children.push(convert(childLeftMenuItem))
    )
    items.push(converted)
  })

  return (
    <Menu
      theme='dark'
      selectedKeys={pathname !== '/' ? [pathnames[0]] : ['']}
      openKeys={openKeys}
      onOpenChange={keys => dispatch(setOpenKeys(keys))}
      mode='inline'
      items={items}
    />
  )
}
