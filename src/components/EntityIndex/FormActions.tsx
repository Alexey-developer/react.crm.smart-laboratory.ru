import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Badge } from 'antd'

import { useTranslation } from 'react-i18next'

import { ActionButton } from '@components/ActionButton'

import { getIcon } from '@utils/getIcon'
import {
  COMMON_EDITING,
  TASKS,
  PROJECTS,
  DIRECTIONS,
} from '@utils/constants/routes'
import { getProjectActionTitle } from '@utils/entityFormActions/getProjectActionTitle'
import { getDirectionActionTitle } from '@utils/entityFormActions/getDirectionActionTitle'
import { getTaskActionTitle } from '@utils/entityFormActions/getTaskActionTitle'

export type FormActionsOptions = {
  parentEntityId?: number
  parentEntityTitle?: string
  directionEntityId?: number
  directionEntityTitle?: string
  taskEntityId?: number
  taskEntityTitle?: string
  tasksFilterKey?: 'project_id' | 'direction_id'
  directionsCount?: number
}

export const useFormActions = (
  entityId: number,
  actionIndexes: number[],
  onConfirm: () => void,
  options: FormActionsOptions = {},
): React.ReactNode[] => {
  const {
    parentEntityId,
    parentEntityTitle,
    directionEntityId,
    directionEntityTitle,
    taskEntityId,
    taskEntityTitle,
    tasksFilterKey = 'project_id',
    directionsCount,
  } = options
  const [translated_phrase] = useTranslation('global')
  const location = useLocation()
  const { pathname } = location

  const isShowPath = pathname.endsWith(`/${entityId}`)
  const entityPath = isShowPath ? pathname : `${pathname}/${entityId}`
  const editPath = `${entityPath}/${COMMON_EDITING}`

  const tasksLink =
    tasksFilterKey === 'direction_id' && parentEntityId
      ? `/${TASKS}/?direction_id=${entityId}&project=${parentEntityId}`
      : `/${TASKS}/?project=${entityId}`

  const allActions = [
    <Link key='go' to={entityPath}>
      <ActionButton
        title={translated_phrase('Actions.go')}
        shape='circle'
        icon={getIcon('GO')}
      />
    </Link>,
    <Link key='edit' to={editPath}>
      <ActionButton
        className='warning transparent'
        title={translated_phrase('Actions.edit')}
        shape='circle'
        icon={getIcon('EDIT')}
      />
    </Link>,
    <ActionButton
      key='delete'
      className='danger transparent'
      title={translated_phrase('Actions.delete')}
      shape='circle'
      icon={getIcon('DELETE')}
      useConfirm={true}
      onConfirm={onConfirm}
    />,
    <ActionButton
      key='restore'
      className='warning transparent'
      title={translated_phrase('Actions.restore')}
      shape='circle'
      icon={getIcon('RESTORE')}
      useConfirm={true}
      onConfirm={onConfirm}
    />,
    <Link key='tasks' to={tasksLink}>
      <Badge count='+99' offset={[8, 5]}>
        <ActionButton
          className='transparent'
          title={translated_phrase('MenuItems.tasks')}
          shape='circle'
          icon={getIcon('TASKS')}
        />
      </Badge>
    </Link>,
    <Link key='project' to={`/${PROJECTS}/${parentEntityId}`}>
      <ActionButton
        className='transparent'
        title={getProjectActionTitle(translated_phrase, parentEntityTitle)}
        shape='circle'
        icon={getIcon('PROJECTS')}
      />
    </Link>,
    <Link key='directions' to={`/${DIRECTIONS}/?project=${entityId}`}>
      <Badge count={directionsCount ?? 0} offset={[8, 5]}>
        <ActionButton
          className='transparent'
          title={translated_phrase('MenuItems.directions')}
          shape='circle'
          icon={getIcon('DIRECTIONS')}
        />
      </Badge>
    </Link>,
    directionEntityId ? (
      <Link key='direction' to={`/${DIRECTIONS}/${directionEntityId}`}>
        <ActionButton
          className='transparent'
          title={getDirectionActionTitle(
            translated_phrase,
            directionEntityTitle
          )}
          shape='circle'
          icon={getIcon('DIRECTIONS')}
        />
      </Link>
    ) : null,
    taskEntityId ? (
      <Link key='task' to={`/${TASKS}/${taskEntityId}`}>
        <ActionButton
          title={getTaskActionTitle(translated_phrase, taskEntityTitle)}
          shape='circle'
          icon={getIcon('TASKS')}
        />
      </Link>
    ) : null,
  ]

  return actionIndexes.map(i => allActions[i]).filter(Boolean)
}
