import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import type { MenuProps } from 'antd'

import { useTranslation } from 'react-i18next'

import { Menu, Badge } from 'antd'

export const LeftMenu: React.FC = () => {
	const badge_offset: [string | number, string | number] = [10, -2]

	const [translated_phrase] = useTranslation('global')

	const location = useLocation()

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <span>{translated_phrase('MenuItems.accounting')}</span>,
			icon: (
				<span className='anticon'>
					<i className='fa-solid fa-calculator'></i>
				</span>
			),
		},
		{
			key: '2',
			label: <span>{translated_phrase('MenuItems.budget')}</span>,
			icon: (
				<span className='anticon'>
					<i className='fa-solid fa-ruble-sign'></i>
				</span>
			),
		},
		{
			key: '3',
			label: (
				<>
					<span>{translated_phrase('MenuItems.call_history')}</span>
					<Badge
						className='danger transparent'
						offset={badge_offset}
						count={99}
					></Badge>
				</>
			),
			icon: (
				<span className='anticon'>
					<i className='fa-solid fa-headset'></i>
				</span>
			),
		},
		{
			key: '4',
			label: (
				<span>{translated_phrase('MenuItems.general_permission_system')}</span>
			),

			icon: (
				<span className='anticon'>
					<i className='fa-solid fa-lock'></i>
				</span>
			),
		},
		{
			key: '/projects',
			label: (
				<Link to='/projects'>
					<span>{translated_phrase('MenuItems.projects')}</span>
					<Badge offset={badge_offset} count={99}></Badge>
				</Link>
			),

			icon: (
				<span className='anticon'>
					<i className='fa-solid fa-diagram-project'></i>
				</span>
			),
		},
		{
			key: '6',
			label: (
				<>
					<span>{translated_phrase('MenuItems.tasks')}</span>
					<Badge
						className='success transparent'
						offset={badge_offset}
						count={99}
					></Badge>
				</>
			),

			icon: (
				<span className='anticon'>
					<i className='fa-solid fa-list-check'></i>
				</span>
			),
		},
		{
			key: '7',
			label: (
				<>
					<span>{translated_phrase('MenuItems.documents')}</span>
					<Badge
						className='warning transparent'
						offset={badge_offset}
						count={99}
					></Badge>
				</>
			),

			icon: (
				<span className='anticon'>
					<i className='fa-solid fa-file-lines'></i>
				</span>
			),
		},
		{
			key: 'sub_1',
			label: (
				<>
					<span>
						{translated_phrase('MenuItems.WorkingWithCustomers.self')}
					</span>
					<Badge
						className='warning transparent'
						offset={badge_offset}
						count={99}
					></Badge>
				</>
			),

			icon: (
				<span className='anticon'>
					<i className='fa-solid fa-heart'></i>
				</span>
			),
			children: [
				{
					key: '8',
					label: (
						<>
							<span>
								{translated_phrase('MenuItems.WorkingWithCustomers.customers')}
							</span>
							<Badge
								className='warning'
								offset={badge_offset}
								count={99}
							></Badge>
						</>
					),

					icon: (
						<span className='anticon'>
							<i className='fa-solid fa-users'></i>
						</span>
					),
				},
				{
					key: '9',
					label: (
						<>
							<span>
								{translated_phrase('MenuItems.WorkingWithCustomers.appeals')}
							</span>
							<Badge
								className='danger transparent'
								offset={badge_offset}
								count={99}
							></Badge>
						</>
					),

					icon: (
						<span className='anticon'>
							<i className='fa-solid fa-file-pen'></i>
						</span>
					),
				},
				{
					key: '10',
					label: (
						<>
							<span>
								{translated_phrase('MenuItems.WorkingWithCustomers.support')}
							</span>
							<Badge
								className='danger transparent'
								offset={badge_offset}
								count={99}
							></Badge>
						</>
					),
					icon: (
						<span className='anticon'>
							<i className='fa-solid fa-comments'></i>
						</span>
					),
				},
				{
					key: '11',
					label: (
						<>
							<span>
								{translated_phrase(
									'MenuItems.WorkingWithCustomers.applications_from_website'
								)}
							</span>
							<Badge
								className='success transparent'
								offset={badge_offset}
								count={99}
							></Badge>
						</>
					),

					icon: (
						<span className='anticon'>
							<i className='fa-solid fa-envelope-open-text'></i>
						</span>
					),
				},
			],
		},
		{
			key: '12',
			label: (
				<>
					<span>{translated_phrase('MenuItems.employees')}</span>
					<Badge className='danger' offset={badge_offset} count={99}></Badge>
				</>
			),

			icon: (
				<span className='anticon'>
					<i className='fa-solid fa-users-between-lines'></i>
				</span>
			),
		},
	]

	return (
		<Menu
			theme='dark'
			selectedKeys={location.pathname !== '/' ? [location.pathname] : ['']}
			mode='inline'
			items={items}
		/>
	)
}
