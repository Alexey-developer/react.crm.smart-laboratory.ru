import React from 'react'
import { Button, Popover, Badge, Divider, Avatar, Flex, Space } from 'antd'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { setAuthToken } from '@redux/CurrentUser/slice'

import { useAPIQuery } from '@api/useAPIQuery'
import { CurrentUserGroup } from '@api/models/currentUser/queryGroup'
import { getMethod } from '@utils/getMethod'

import { Skeleton } from '@components/Skeleton'

import { formSkeleton } from './formSkeleton'
import styles from './index.module.scss'

export const HeaderProfile: React.FC = () => {
  const dispatch = useDispatch()
  const [translated_phrase] = useTranslation('global')

  const { data, isLoading, isFetching } = useAPIQuery(
    CurrentUserGroup,
    getMethod('CURRENT_USER')
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
              <Flex justify='space-evenly' align='flex-start'>
                <Badge offset={[-22, 28]} dot={true} className='success'>
                  <Avatar icon={<i className='fa-solid fa-user'></i>} />
                </Badge>
                <div>
                  Деревенсков {data?.name}
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
                <Button
                  type='text'
                  icon={<i className='fa-solid fa-stopwatch'></i>}
                >
                  {translated_phrase('HeaderProfile.my_time_ranges')}
                </Button>
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
{
  /* <Card loading={true} style={{ minWidth: 300 }}>
            <Card.Meta
              avatar={
                <Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=1' />
              }
              title='Card title'
              description={
                <>
                  <p>This is the description</p>
                  <p>This is the description</p>
                </>
              }
            />
          </Card> */
}
