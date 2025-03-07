import React from 'react'
import { Button } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentTheme } from '@redux/Theme/selectors'
import { setCurrentTheme } from '@redux/Theme/slice'
import { setIsSpinning } from '@redux/Spin/slice'

import styles from './index.module.scss'

export const ChangeTheme: React.FC = () => {
  const dispatch = useDispatch()

  const currentTheme = useSelector(selectCurrentTheme)
  document.querySelector('body')?.setAttribute('data-theme', currentTheme)

  const handlerChangeTheme = () => {
    dispatch(setIsSpinning(true))
    setTimeout(() => {
      dispatch(setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark'))
    }, 200)
    setTimeout(() => {
      dispatch(setIsSpinning(false))
    }, 700)
  }

  return (
    <>
      <Button
        className={styles.header_btn}
        type='text'
        icon={
          currentTheme === 'dark' ? (
            <i className='fa-solid fa-lightbulb'></i>
          ) : (
            <i className='fa-regular fa-lightbulb'></i>
          )
        }
        onClick={handlerChangeTheme}
      />
    </>
  )
}
