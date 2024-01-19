import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { Menu, Badge } from 'antd'

import { formLeftMenuItems } from '@utils/formLeftMenuItems'

import type { MenuItem } from '@utils/formLeftMenuItems'
import type { SubMenuType } from 'antd/lib/menu/hooks/useItems'
import type { MenuProps } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'

export const LeftMenu: React.FC = () => {
	//2 перерисовки при смене языка
	const [translated_phrase] = useTranslation('global')
	const location = useLocation()

	const items: MenuProps['items'] = []
	const leftMenuItems = formLeftMenuItems()
	// console.log(leftMenuItems)

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

		const convertedMenuItem: ItemType = {
			key: leftMenuItem.path,
			label: leftMenuItem.childrenMenuItems ? (
				label
			) : (
				<Link to={leftMenuItem.path}>{label}</Link>
			),
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

	// console.log(items)
	// console.log(location.pathname)

	return (
		<Menu
			theme='dark'
			selectedKeys={location.pathname !== '/' ? [location.pathname] : ['']}
			mode='inline'
			items={items}
		/>
	)
}
