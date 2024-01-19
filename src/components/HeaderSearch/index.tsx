import React from 'react'
import { Button } from 'antd'

import styles from './index.module.scss'

export const HeaderSearch: React.FC = () => {
	return (
		<Button
			className={styles.header_btn}
			type='text'
			icon={<i className='fa-solid fa-magnifying-glass'></i>}
		/>
	)
}
