import { Link, useLocation } from 'react-router-dom'

import { Badge } from 'antd'

import { useTranslation } from 'react-i18next'

import { ActionButton } from '@components/ActionButton'

import { getIcon } from '@utils/getIcon'
import { COMMON_EDITING, TASKS } from '@utils/constants/routes'

export const FormActions = (
  entityId: number,
  actionIndexes: number[],
  onConfirm: () => void
) => {
  const [translated_phrase] = useTranslation('global')
  const location = useLocation()
  const { pathname } = location

  const allActions = [
    //show link
    <Link to={pathname + '/' + entityId}>
      <ActionButton
        title={translated_phrase('Actions.go')}
        shape='circle'
        icon={getIcon('GO')}
      />
    </Link>,
    //edit link
    <Link to={pathname + '/' + entityId + '/' + COMMON_EDITING}>
      <ActionButton
        className='warning transparent'
        title={translated_phrase('Actions.edit')}
        shape='circle'
        icon={getIcon('EDIT')}
      />
    </Link>,
    //delete
    <ActionButton
      className='danger transparent'
      title={translated_phrase('Actions.delete')}
      shape='circle'
      icon={getIcon('DELETE')}
      useConfirm={true}
      onConfirm={onConfirm}
    />,
    //restore
    <ActionButton
      className='warning transparent'
      title={translated_phrase('Actions.restore')}
      shape='circle'
      icon={getIcon('RESTORE')}
      useConfirm={true}
      onConfirm={onConfirm}
    />,

    //extra links
    <Link to={`/${TASKS}/?project_id=${entityId}`}>
      <Badge count='+99' offset={[15, 5]}>
        <ActionButton
          className='transparent'
          title={translated_phrase('MenuItems.tasks')}
          shape='circle'
          icon={getIcon('TASKS')}
        />
      </Badge>
    </Link>,
  ]

  const actions = actionIndexes.map(i => allActions[i])

  return actions
}
