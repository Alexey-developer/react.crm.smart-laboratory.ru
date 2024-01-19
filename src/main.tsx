import ReactDOM from 'react-dom/client'

// import reportWebVitals from './reportWebVitals'
// import { StrictMode } from 'react'

import App from './App'

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from '@redux/store'

import global_en from '@translations/en/global.json'
import global_ru from '@translations/ru/global.json'

import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'

import { Lang } from '@redux/Language/types'

i18next.init({
	interpolation: { escapeValue: false },
	lng: (localStorage.getItem('lang') as Lang) ?? 'ru',
	resources: {
		en: {
			global: global_en,
		},
		ru: {
			global: global_ru,
		},
	},
})

const rootElement = document.getElementById('root') as HTMLElement

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		// <StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<I18nextProvider i18n={i18next}>
					<App />
				</I18nextProvider>
			</Provider>
		</BrowserRouter>
		// </StrictMode>
	)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
