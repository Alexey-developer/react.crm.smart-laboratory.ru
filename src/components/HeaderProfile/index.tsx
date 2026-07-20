import React from 'react'
import { Button, Popover, Badge, Divider, Avatar, Flex, Space } from 'antd'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setAuthToken } from '@redux/CurrentUser/slice'

import { useAPIQuery } from '@api/useAPIQuery'
import { CurrentUserGroup } from '@api/models/currentUser/queryGroup'
import { getMethod } from '@utils/getMethod'

import { Skeleton } from '@components/Skeleton'

import { formSkeleton } from './formSkeleton'
import styles from './index.module.scss'
import * as URIs from '@utils/constants/routes'

const HeaderProfileComponent: React.FC = () => {
  const dispatch = useDispatch()
  const [translated_phrase] = useTranslation('global')

  const { data, isLoading, isFetching } = useAPIQuery(
    CurrentUserGroup,
    getMethod('CURRENT_USER'),
  )

  return (
    <Popover
      content={
        <Skeleton
          isLoading={isLoading || isFetching}
          width={237}
          height={281}
          skeleton={formSkeleton()}
          content={
            <>
              <Flex
                className={styles.profile_user_row}
                justify='flex-start'
                align='flex-start'
              >
                <Badge offset={[-22, 28]} dot={true} className='success'>
                  <Avatar icon={<i className='fa-solid fa-user'></i>} />
                </Badge>
                <div>
                  Деревенсков {data?.data?.name}
                  <br />
                  Руководитель
                </div>
              </Flex>
              <Divider />
              <Space.Compact direction='vertical'>
                <Button
                  type='text'
                  icon={<i className='fa-solid fa-user-gear'></i>}
                >
                  {translated_phrase('HeaderProfile.my_profile')}
                </Button>
                <Button
                  type='text'
                  icon={<i className='fa-solid fa-gears'></i>}
                >
                  {translated_phrase('HeaderProfile.settings')}
                </Button>
                <Divider />
                <Link
                  to={
                    data?.data?.worker_profile?.id
                      ? `/${URIs.WORK_TIME_RANGES}/?worker_profile_id=${data.data.worker_profile.id}`
                      : `/${URIs.WORK_TIME_RANGES}`
                  }
                >
                  <Button
                    type='text'
                    icon={<i className='fa-solid fa-stopwatch'></i>}
                  >
                    {translated_phrase('HeaderProfile.my_time_ranges')}
                  </Button>
                </Link>
                <Button
                  type='text'
                  icon={<i className='fa-solid fa-credit-card'></i>}
                >
                  {translated_phrase('HeaderProfile.my_payments')}
                </Button>
                <Button
                  type='text'
                  icon={<i className='fa-solid fa-list-check'></i>}
                >
                  {translated_phrase('HeaderProfile.my_unfinished_tasks')}
                </Button>
                <Divider />
                <Button
                  onClick={() => {
                    dispatch(setAuthToken(''))
                  }}
                  type='text'
                  icon={<i className='fa-solid fa-right-from-bracket'></i>}
                >
                  {translated_phrase('HeaderProfile.sign_out')}
                </Button>
              </Space.Compact>
            </>
          }
        />
      }
      // title='Title'
      trigger='click'
      placement='bottom'
      // open={open}
      // onOpenChange={handleOpenChange}
    >
      <Badge offset={[-15, 20]} dot={true} className='success'>
        <Button
          className={styles.header_btn}
          type='text'
          icon={<i className='fa-solid fa-user'></i>}
        />
      </Badge>
    </Popover>
  )
}

/** Memo: isolate from TopHeader sibling/parent re-renders. */
export const HeaderProfile = React.memo(HeaderProfileComponent)
