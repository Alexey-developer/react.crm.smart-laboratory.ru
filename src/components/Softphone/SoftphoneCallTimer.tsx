import React, { useEffect, useState } from 'react'

import styles from './index.module.scss'

const formatCallTime = (total: number): string => {
  const m = Math.floor(total / 60)
    .toString()
    .padStart(2, '0')
  const s = (total % 60).toString().padStart(2, '0')

  return `${m}:${s}`
}

type SoftphoneCallTimerProps = {
  active: boolean
  /** Kept in sync for hangup → ended duration without re-rendering Softphone each second. */
  secondsRef: React.MutableRefObject<number>
}

/**
 * Owns the in-call clock so `useReactive` Softphone state is not bumped every 1s.
 */
export const SoftphoneCallTimer: React.FC<SoftphoneCallTimerProps> = ({
  active,
  secondsRef,
}) => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!active) {
      setSeconds(0)
      secondsRef.current = 0
      return undefined
    }

    const timerId = window.setInterval(() => {
      setSeconds(prev => {
        const next = prev + 1
        secondsRef.current = next
        return next
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [active, secondsRef])

  return <div className={styles.timer}>{formatCallTime(seconds)}</div>
}
