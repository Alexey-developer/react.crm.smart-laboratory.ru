import { useTranslation } from 'react-i18next'

export const SetPageTitle = (pageTitle: string) => {
	const [translated_phrase] = useTranslation('global')
	return (document.title =
		translated_phrase('Common.companyName') + ' CRM | ' + pageTitle)
}
