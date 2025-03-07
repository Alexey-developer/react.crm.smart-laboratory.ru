import React from 'react'
import { Avatar } from 'antd'

import styles from './index.module.scss'

import { CustomAvatar } from '@components/CustomAvatar'

export type Employees = {
  id: number
  name: string
  surname: string
}

type IncludedEmployeesProps = {
  employees: Employees[]
}

export const IncludedEmployees: React.FC<IncludedEmployeesProps> = ({
  employees,
}) => {
  return (
    <Avatar.Group
      //   maxPopoverTrigger='click'
      //   maxCount={2}

      max={{ count: 2, popover: { trigger: 'click' } }}
      //   shape='square'
      className={styles.avatar_group}
    >
      {employees.map(employee => (
        <CustomAvatar key={employee.id} employee={employee} />
      ))}
    </Avatar.Group>
  )
}
