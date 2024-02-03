import React from 'react'
import { Avatar, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'

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
      maxCount={2}
      //   shape='square'
      maxPopoverTrigger='click'
      className={styles.avatar_group}
    >
      {employees.map(employee => (
        <Tooltip
          key={employee.id}
          className={styles.t}
          title={
            '#' + employee.id + ' ' + employee.surname + ' ' + employee.name
          }
        >
          <Link to={'#'}>
            <Avatar>
              {employee.surname.substring(0, 1)}.{' '}
              {employee.name.substring(0, 1)}.
            </Avatar>
          </Link>
        </Tooltip>
      ))}
    </Avatar.Group>
  )
}
