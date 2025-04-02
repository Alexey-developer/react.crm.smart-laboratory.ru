import React from 'react'

import { Button, Dropdown, Radio, type MenuProps } from 'antd'

import { useReactive } from 'ahooks'

import { TaskGroup } from '@api/models/task/queryGroup'

import { EntityIndex } from '@components/EntityIndex'
import { CheckboxFilter } from '@components/Filter/CheckboxFilter'
import { SelectFilter } from '@components/Filter/SelectFilter'

import { useDispatch, useSelector } from 'react-redux'

import { setViewType } from '@redux/TasksView/slice'
import { selectViewType } from '@redux/TasksView/selectors'
import type { ViewType } from '@redux/TasksView/types'

import { FormContent } from './FormContent'

import { useGetStateCurrentPageFilters } from '@utils/useGetStateCurrentPageFilters'

export const TasksPage: React.FC = () => {
  const dispatch = useDispatch()
  const viewType = useSelector(selectViewType)
  const items: MenuProps['items'] = [
    {
      key: 'list',
      label: (
        <Radio value='list'>
          <i className='fa-regular fa-table-list'></i> Список
        </Radio>
      ),
      //   icon: <i className='fa-regular fa-table-list'></i>,
    },
    {
      key: 'scrum',
      label: (
        <Radio value='scrum'>
          <i className='fa-light fa-table'></i> Скрам
        </Radio>
      ),
      //   icon: <i className='fa-light fa-table'></i>,
    },
  ]

  const handleMenuClick: MenuProps['onClick'] = e => {
    //   message.info('Click on menu item.')
    dispatch(setViewType(e.key as ViewType))
  }

  const menuProps = {
    items,
    onClick: handleMenuClick,
  }

  const viewTypeComponent = (
    <Radio.Group
      //   name='radiogroup'
      defaultValue={viewType}
    >
      <Dropdown menu={menuProps} placement='bottom' trigger={['click']} arrow>
        <Button
          className='smart-btn warning transparent'
          icon={<i className='fa-regular fa-table-cells'></i>}
        >
          Вид
        </Button>
      </Dropdown>
    </Radio.Group>
  )

  const stateFilters = useGetStateCurrentPageFilters()
  const defaultCheckedList = [1, 2, 3, 4, 5]
  const state = useReactive<{ checkedList: number[] }>({
    checkedList: stateFilters['task_status']?.length
      ? stateFilters['task_status']
      : defaultCheckedList, //#todo костыльненько
  })

  React.useEffect(() => {
    state.checkedList = stateFilters['task_status'] ?? defaultCheckedList
  }, [stateFilters['task_status']])

  return (
    <EntityIndex
      pageTitleCode='MenuItems.tasks'
      groupClass={TaskGroup}
      entityFilters={[CheckboxFilter('TASK_STATUS'), SelectFilter('PROJECT')]}
      FormContent={FormContent}
      actionIndexes={[0, 5, 1, 2]}
      extraTopComponents={[viewTypeComponent]}
      viewType={viewType}
      state={state}
    />
  )
}
