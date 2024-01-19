import React from 'react'

import styles from './index.module.scss'

import { useSelector } from 'react-redux'
import { selectIsCollapsed } from '@redux/CollapseSider/selectors'

import { useTranslation } from 'react-i18next'

import { Divider, Typography } from 'antd'

import { Link } from 'react-router-dom'

const { Title } = Typography

export const Logo: React.FC = () => {
	const [translated_phrase] = useTranslation('global')

	const isCollapsed = useSelector(selectIsCollapsed)

	return (
		<Divider>
			<Title className={styles.logo} level={3}>
				<Link to='/'>
					{!isCollapsed && translated_phrase('Common.companyName') + ' CRM '}
					<i
						className='fa-solid fa-flask fa-fade'
						style={{ animationDuration: '4s' }}
					></i>
				</Link>
			</Title>
		</Divider>
	)
}
