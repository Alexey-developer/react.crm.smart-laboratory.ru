import React, { useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
type BreadcrumbItem = ItemType

import { formLeftMenuItems } from '@utils/formLeftMenuItems'

import { Breadcrumb } from 'antd'

import './index.module.scss'

export const Breadcrumbs: React.FC = () => {
	const [translated_phrase] = useTranslation('global')

	const location = useLocation()
	const { pathname } = location
	// console.log(1, pathname)
	// const pathnames = pathname.split('/').filter(item => item)
	// console.log(2, pathnames)

	const breadcrumbItems: BreadcrumbItem[] = [
		{
			title: (
				<>
					<Link to={'/'}>
						<i className='fa-solid fa-home'></i>
					</Link>
				</>
			),
		},
	]

	const leftMenuItems = formLeftMenuItems()
	// console.log(leftMenuItems)
	const leftMenuItem = leftMenuItems.find(
		leftMenuItem => leftMenuItem.path === pathname
	)
	// console.log(leftMenuItem)

	// const breadcrumbRef = React.useRef<HTMLAnchorElement>(null)

	if (leftMenuItem) {
		breadcrumbItems.push({
			title: (
				<>
					{/* <Link to={leftMenuItem.path} ref={breadcrumbRef}> */}
					<i className={leftMenuItem.icon}></i>
					<span> {translated_phrase(leftMenuItem.name_key)}</span>
					{/* </Link> */}
				</>
			),
		})
	}

	// useEffect(() => {
	// }, [])

	return (
		<Breadcrumb
			separator={<i className='fa-regular fa-chevrons-right'></i>}
			items={breadcrumbItems}
		/>
	)
}
