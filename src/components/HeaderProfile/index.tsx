import React from 'react'
import { Button, Popover, Badge, Divider, Avatar, Flex, Space } from 'antd'

import { useTranslation } from 'react-i18next'

import styles from './index.module.scss'

export const HeaderProfile: React.FC = () => {
	const [translated_phrase] = useTranslation('global')

	return (
		<Popover
			content={
				<>
					<Flex justify='space-evenly' align='flex-start'>
						<Badge offset={[-22, 28]} dot={true} className='success'>
							<Avatar icon={<i className='fa-solid fa-user'></i>} />
						</Badge>

						<div>
							Деревенсков Алексей
							<br />
							Руководитель
						</div>
					</Flex>
					<Divider />
					<Space.Compact direction='vertical'>
						<Button
							type='text'
							icon={<i className='fa-solid fa-user-gear'></i>}
						>
							{translated_phrase('HeaderProfile.my_profile')}
						</Button>
						<Button type='text' icon={<i className='fa-solid fa-gears'></i>}>
							{translated_phrase('HeaderProfile.settings')}
						</Button>
						<Divider />
						<Button
							type='text'
							icon={<i className='fa-solid fa-stopwatch'></i>}
						>
							{translated_phrase('HeaderProfile.my_time_ranges')}
						</Button>
						<Button
							type='text'
							icon={<i className='fa-solid fa-credit-card'></i>}
						>
							{translated_phrase('HeaderProfile.my_payments')}
						</Button>
						<Button
							type='text'
							icon={<i className='fa-solid fa-list-check'></i>}
						>
							{translated_phrase('HeaderProfile.my_unfinished_tasks')}
						</Button>
						<Divider />
						<Button
							type='text'
							icon={<i className='fa-solid fa-right-from-bracket'></i>}
						>
							{translated_phrase('HeaderProfile.sign_out')}
						</Button>
					</Space.Compact>
				</>
			}
			// title='Title'
			trigger='click'
			placement='bottom'
			// open={open}
			// onOpenChange={handleOpenChange}
		>
			<Badge offset={[-15, 20]} dot={true} className='success'>
				<Button
					className={styles.header_btn}
					type='text'
					icon={<i className='fa-solid fa-user'></i>}
				/>
			</Badge>
		</Popover>
	)
}
