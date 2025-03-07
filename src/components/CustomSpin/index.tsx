import React, { useEffect } from 'react'
import { Spin } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { selectIsSpinning } from '@redux/Spin/selectors'
// import { setIsSpinning } from '@redux/Spin/slice'

import './index.module.scss'

export const CustomSpin: React.FC = () => {
  const isSpinning = useSelector(selectIsSpinning)
  //   const dispatch = useDispatch()

  //   useEffect(() => {
  //     setTimeout(() => {
  //       dispatch(setIsSpinning(false))
  //       //   console.log('хватит?')
  //     }, 700)
  //   }, [isSpinning])

  return <Spin spinning={isSpinning} fullscreen />
}
