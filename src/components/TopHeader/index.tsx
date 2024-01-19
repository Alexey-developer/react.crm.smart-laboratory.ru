import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { selectIsCollapsed } from '@redux/CollapseSider/selectors'
import { setIsCollapsed } from '@redux/CollapseSider/slice'

import { ChangeTheme } from '@components/ChangeTheme'
import { ChangeLanguage } from '@components/ChangeLanguage'
import { HeaderSearch } from '@components/HeaderSearch'
import { HeaderChats } from '@components/HeaderChats'
import { HeaderNotifications } from '@components/HeaderNotifications'
import { HeaderProfile } from '@components/HeaderProfile'

import styles from './index.module.scss'

import { Layout, Button, Flex } from 'antd'
const { Header } = Layout

export const TopHeader: React.FC = () => {
	const dispatch = useDispatch()

	const isCollapsed = useSelector(selectIsCollapsed)

	return (
		<Header>
			<Flex justify='space-between'>
				<Flex justify='flex-start'>
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
					<HeaderSearch />
				</Flex>

				<Flex justify='center'>
					<ChangeTheme />
					<ChangeLanguage />
				</Flex>

				<Flex justify='flex-end'>
					<HeaderChats />
					<HeaderNotifications />
					<HeaderProfile />
				</Flex>
			</Flex>
		</Header>
	)
}
