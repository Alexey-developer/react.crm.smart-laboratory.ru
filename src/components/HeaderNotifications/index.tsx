import React from 'react'
import { Button, Popover, Badge } from 'antd'

import styles from './index.module.scss'

export const HeaderNotifications: React.FC = () => {
	return (
		<Popover
			// content={<a onClick={hide}>Close</a>}
			// title='Уведомления'
			trigger='click'
			placement='bottom'
		>
			<Badge count='+99' offset={[-5, 20]}>
				<Button
					className={styles.header_btn}
					type='text'
					icon={<i className='fa-solid fa-bell fa-shake'></i>}
				/>
			</Badge>
		</Popover>
	)
}
