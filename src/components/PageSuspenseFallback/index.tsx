import React from 'react'
import { Spin } from 'antd'

import { useTranslation } from 'react-i18next'

import styles from './index.module.scss'

/** Suspense fallback for lazy page chunks — before page skeletons mount. */
export const PageSuspenseFallback: React.FC = () => {
  const [translated_phrase] = useTranslation('global')

  return (
    <div className={styles.fallback} role='status' aria-live='polite'>
      <div className={styles.panel}>
        <Spin size='large' />
        <p className={styles.description}>
          {translated_phrase('Extra.page_loading')}
        </p>
      </div>
    </div>
  )
}
