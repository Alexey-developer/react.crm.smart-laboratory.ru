import React from 'react'
import { Avatar, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

import './index.module.scss'

export type Employee = {
  id: number
  name: string
  surname: string
}

type CustomAvatarProps = {
  employee: Employee
}

export const CustomAvatar: React.FC<CustomAvatarProps> = ({ employee }) => {
  return (
    <Tooltip
      key={employee.id}
      title={'#' + employee.id + ' ' + employee.surname + ' ' + employee.name}
    >
      <Link to={'#'}>
        <Avatar>
          {employee.surname.substring(0, 1)}. {employee.name.substring(0, 1)}.
        </Avatar>
      </Link>
    </Tooltip>
  )
}
