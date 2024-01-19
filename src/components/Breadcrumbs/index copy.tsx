import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import { Breadcrumb } from 'antd'

import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
type BreadcrumbItem = ItemType

type BreadcrumbsProps = {
	extraBreadcrumbItems?: BreadcrumbItem[]
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
	extraBreadcrumbItems,
}) => {
	// const location = useLocation()
	// const { pathname } = location
	// console.log(1, pathname)
	// const pathnames = pathname.split('/').filter(item => item)
	// console.log(2, pathnames)

	let breadcrumbItems: BreadcrumbItem[] = [
		{
			href: extraBreadcrumbItems !== undefined ? '/' : undefined,
			title: <i className='fa-solid fa-home'></i>,
		},
	]

	if (extraBreadcrumbItems !== undefined) {
		breadcrumbItems = [...breadcrumbItems, ...extraBreadcrumbItems]
	}

	// console.log(breadcrumbItems.length)
	// console.log(breadcrumbItems)

	return <Breadcrumb items={breadcrumbItems} />
}

// onClick={() =>
//                                 navigate(`/lk/worker/crm/${creds?.crmID}`)
//                             }
