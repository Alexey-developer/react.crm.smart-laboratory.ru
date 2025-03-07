import React from 'react'
import { notification } from 'antd'

import { getIcon } from '@utils/getIcon'

import { useDispatch, useSelector } from 'react-redux'
import { selectNotification } from '@redux/HeaderNotification/selectors'
import { setNotification } from '@redux/HeaderNotification/slice'

import './index.module.scss'

export const Notification: React.FC = () => {
  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 5 },
  })
  const dispatch = useDispatch()

  const headerNotification = useSelector(selectNotification)

  //   const [shown, setShown] = React.useState(false)
  //   if (!shown) {
  //     setTimeout(() => {
  //       dispatch(
  //         setNotification({ title: 'INFO', text: 'INFO INFO', type: 'INFO' })
  //       )
  //     }, 200)
  //     setTimeout(() => {
  //       dispatch(
  //         setNotification({
  //           title: 'SUCCESS',
  //           text: 'SUCCESS SUCCESS',
  //           type: 'SUCCESS',
  //         })
  //       )
  //     }, 400)
  //     setTimeout(() => {
  //       dispatch(
  //         setNotification({ title: 'ERROR', text: 'ERROR ERROR', type: 'ERROR' })
  //       )
  //     }, 600)
  //     setShown(true)
  //   }

  React.useEffect(() => {
    if (headerNotification.title !== '') {
      api.open({
        // key
        //   role: 'status',
        message: headerNotification.title,
        description: headerNotification.text,
        showProgress: true,
        pauseOnHover: true,
        duration: headerNotification.duration ?? 5,
        icon: <i className={getIcon(headerNotification.type)}></i>,
        placement: 'topRight',
        className: `smart-notification smart-notification-${headerNotification.type}`,
      })
      dispatch(setNotification({ title: '', text: '', type: 'INFO' }))
    }
  }, [headerNotification])

  return <>{contextHolder}</>
}
