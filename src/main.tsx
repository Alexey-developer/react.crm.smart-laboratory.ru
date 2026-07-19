import ReactDOM from 'react-dom/client'

// import reportWebVitals from './reportWebVitals'
// import { StrictMode } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from '@redux/store'

import { createQueryClient } from '@api/createQueryClient'

import global_az from '@translations/az/global.json'
import global_be from '@translations/be/global.json'
import global_de from '@translations/de/global.json'
import global_en from '@translations/en/global.json'
import global_fr from '@translations/fr/global.json'
import global_ja from '@translations/ja/global.json'
import global_kk from '@translations/kk/global.json'
import global_ky from '@translations/ky/global.json'
import global_ru from '@translations/ru/global.json'
import global_tr from '@translations/tr/global.json'
import global_zh from '@translations/zh/global.json'

import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'

import App from './App'

import { Lang } from '@redux/Language/types'

i18next.init({
  interpolation: { escapeValue: false },
  lng: (localStorage.getItem('lang') as Lang) ?? 'ru',
  resources: {
    az: { global: global_az },
    be: { global: global_be },
    de: { global: global_de },
    en: { global: global_en },
    fr: { global: global_fr },
    ja: { global: global_ja },
    kk: { global: global_kk },
    ky: { global: global_ky },
    ru: { global: global_ru },
    tr: { global: global_tr },
    zh: { global: global_zh },
  },
})

const rootElement = document.getElementById('root') as HTMLElement

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  const queryClient = createQueryClient()

  root.render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider i18n={i18next}>
            <App />
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
    // </StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
