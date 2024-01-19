import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectLang } from '@redux/Language/selectors'
import { setLang } from '@redux/Language/slice'
import type { Lang } from '@redux/Language/types'

import { useTranslation } from 'react-i18next'

import type { MenuProps } from 'antd'

import { Button, Dropdown, Badge } from 'antd'

import styles from './index.module.scss'

export const ChangeLanguage: React.FC = () => {
	const dispatch = useDispatch()

	const [translated_phrase, i18n] = useTranslation('global')

	const lang = useSelector(selectLang)
	React.useEffect(() => {
		if (lang !== i18n.language) {
			i18n.changeLanguage(lang)
		}
	}, [lang])

	const items: MenuProps['items'] = [
		{
			label: (
				<Badge status={lang === 'ru' ? 'success' : 'default'} text='Русский' />
			),
			key: 'ru',
		},
		{
			label: (
				<Badge status={lang === 'en' ? 'success' : 'default'} text='English' />
			),
			key: 'en',
		},
	]

	const handleMenuClick: MenuProps['onClick'] = e => {
		dispatch(setLang(e.key as Lang))
	}

	return (
		<Dropdown
			menu={{
				items,
				onClick: handleMenuClick,
			}}
			trigger={['click']}
			placement='bottom'
			arrow
		>
			<Button
				className={styles.header_btn}
				type='text'
				icon={<i className='fa-solid fa-language'></i>}
			/>
		</Dropdown>
	)
}
