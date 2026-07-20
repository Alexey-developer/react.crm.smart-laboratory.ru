import React from 'react'
import { Button } from 'antd'

import styles from './index.module.scss'

const HeaderChatsComponent: React.FC = () => {
  return (
    <Button
      className={styles.header_btn}
      type='text'
      icon={<i className='fa-solid fa-comments'></i>}
    />
  )
}

/** Memo: TopHeader chrome widgets stay isolated (keep when implementing chats). */
export const HeaderChats = React.memo(HeaderChatsComponent)
