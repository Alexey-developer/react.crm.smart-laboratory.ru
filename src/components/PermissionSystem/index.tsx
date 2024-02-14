import React from 'react'

import { useTranslation } from 'react-i18next'

import { Col, Row, Space, Switch, Typography } from 'antd'
const { Text } = Typography

import { useReactive } from 'ahooks'

import styles from './index.module.scss'

import { CustomAvatar } from '@components/CustomAvatar'
import { CollapseCard } from '@components/CollapseCard'

import { getProject } from '@utils/tempData'

type Permission = {
  name: string
  action: string
}

type PermissionSystemProps = {
  permissions: Permission[]
}

export const PermissionSystem: React.FC<PermissionSystemProps> = ({
  permissions,
}) => {
  const [translated_phrase] = useTranslation('global')

  const { employees } = getProject()

  const state = useReactive({
    isLoading: false,
    isDisabled: false,
  })

  return (
    <CollapseCard
      type='danger'
      items={[
        {
          key: '1',
          label: translated_phrase('PermissionSystem.permission_system'),
          children: (
            <Row className={styles.row}>
              {employees.map(employee => (
                <Col
                  key={employee.id}
                  xs={24}
                  lg={12}
                  xl={8}
                  xxl={6}
                  className='default-col'
                >
                  <Space direction='vertical'>
                    <CustomAvatar employee={employee} />
                    {permissions.map(permission => (
                      <>
                        <Text className={styles.text}>{permission.name}</Text>
                        <Switch
                          checkedChildren={translated_phrase(
                            'PermissionSystem.allow'
                          )}
                          unCheckedChildren={translated_phrase(
                            'PermissionSystem.disallow'
                          )}
                          defaultChecked
                          loading={state.isLoading}
                          // disabled={disabled}
                          onChange={
                            (/*checked, event*/) => {
                              console.log(permission.action)
                              state.isLoading = true
                              setTimeout(() => {
                                state.isLoading = false
                              }, 600)
                            }
                          }
                        />
                      </>
                    ))}
                  </Space>
                </Col>
              ))}
            </Row>
          ),
          // extra: <div>extra</div>,
        },
      ]}
    />
  )
}
