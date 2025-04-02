import React, { useEffect, useState } from 'react'
import {
  Row,
  Tag,
  Progress,
  Tooltip,
  Table,
  Checkbox,
  Dropdown,
  Button,
  Radio,
  Select,
  Space,
} from 'antd'

import { Link, useLocation } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useDispatch, useSelector } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { setViewType } from '@redux/TasksView/slice'
import { selectViewType } from '@redux/TasksView/selectors'

import { DefaultCard } from '@components/DefaultCard'
import { ActionButton } from '@components/ActionButton'
import { IncludedEmployees } from '@components/IncludedEmployees'
import { CustomPagination } from '@components/CustomPagination'
import { Filter } from '@components/Filter'

import type { Employees } from '@components/IncludedEmployees'
import type {
  CheckboxOptionType,
  TableColumnsType,
  PaginationProps,
  MenuProps,
} from 'antd'

import { SetPageTitle } from '@utils/helpers'
import { formCardExtra } from '@utils/formCardExtra'
import { getIcon } from '@utils/getIcon'
import { COMMON_EDITING } from '@utils/constants/routes'
import { convert2string } from '@utils/helpers'
import { getProject } from '@utils/tempData'
import { getTaskStatuses } from '@utils/tempData'

export const TasksPage: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(translated_phrase('MenuItems.tasks'))

  const location = useLocation()
  const { pathname } = location

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageIsLoaded(true))
  }, [])

  const viewType = useSelector(selectViewType)

  const project = getProject()
  const taskStatuses = getTaskStatuses()

  //* */

  const cardActions: React.ReactNode[][] = []

  project.tasks.map((task, i) => {
    cardActions.push([
      <Link to={pathname + '/' + (task.id + i)}>
        <ActionButton
          title={translated_phrase('Actions.go')}
          shape='circle'
          icon={getIcon('GO')}
        />
      </Link>,
      <ActionButton
        className='transparent'
        title={translated_phrase('MenuItems.projects').substring(
          0,
          translated_phrase('MenuItems.projects').length - 1
        )}
        shape='circle'
        icon={getIcon('PROJECTS')}
      />,
      <Link to={pathname + '/' + (task.id + i) + '/' + COMMON_EDITING}>
        <ActionButton
          className='warning transparent'
          title={translated_phrase('Actions.edit')}
          shape='circle'
          icon={getIcon('EDIT')}
        />
      </Link>,
      <ActionButton
        className='danger transparent'
        title={translated_phrase('Actions.delete')}
        shape='circle'
        icon={getIcon('DELETE')}
        useConfirm={true}
      />,
    ])
  })

  const formContent = (
    description: string,
    createdAt: string,
    totalTime: string,
    incomes: number,
    costsAuto: number,
    costs: number,
    penalty: number,
    progress: number,
    employees: Employees[]
  ) => {
    return (
      <>
        <h2>{description}</h2>
        <Tooltip title={translated_phrase('Statistics.time_spent')}>
          <Tag
            className={'warning transparent'}
            icon={<i className={getIcon('TIME')}></i>}
          >
            {totalTime}
          </Tag>
        </Tooltip>
        <Tooltip title={translated_phrase('Statistics.incomes')}>
          <Tag
            className={'success transparent'}
            icon={<i className={getIcon('RUBLE')}></i>}
          >
            {convert2string(incomes, '₽')}
          </Tag>
        </Tooltip>
        <Tooltip
          title={
            translated_phrase('Statistics.costs_auto') +
            ' - ' +
            translated_phrase('Statistics.costs')
          }
        >
          <Tag
            className={'danger transparent'}
            icon={<i className={getIcon('RUBLE')}></i>}
          >
            {convert2string(costsAuto, '₽ - ')}
            {convert2string(costs, '₽ = ')}
            {convert2string(costsAuto - costs, '₽')}
          </Tag>
        </Tooltip>
        <Tooltip title={translated_phrase('Statistics.penalty')}>
          <Tag
            className={'warning transparent'}
            icon={<i className={getIcon('RUBLE')}></i>}
          >
            {convert2string(penalty, '₽')}
          </Tag>
        </Tooltip>

        <Tag
          className={'success'}
          icon={<i className='fa-solid fa-chart-line-up'></i>}
        >
          {(incomes / costsAuto).toFixed(2)}
        </Tag>
        <Tag
          className={'transparent'}
          icon={<i className={getIcon('CREATED_AT')}></i>}
        >
          {createdAt}
        </Tag>
        <Progress percent={progress} />
        <IncludedEmployees employees={employees} />
      </>
    )
  }

  //   const onChange: PaginationProps['onChange'] = pageNumber => {
  //     console.log('Page: ', pageNumber)
  //   }
  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    console.log('Page: ', page)
    console.log('pageSize: ', pageSize)
  }

  //   const sortedTasks = []

  const TaskCards: React.ReactNode[] = []

  project.tasks.map(
    (task, i) =>
      (TaskCards[task.id] = (
        <DefaultCard
          key={task.id}
          type='success'
          title={'#' + task.id + ' ' + task.name}
          badgeRibbonText={translated_phrase('Statuses.Task.' + task.status)}
          badgeRibbonClassName={task.statusClass}
          content={formContent(
            project.description,
            project.createdAt,
            project.totalTime,
            project.incomes,
            project.costsAuto,
            project.costs,
            project.penalty,
            project.progress,
            project.employees
          )}
          actions={cardActions[i]}
          extra={formCardExtra('warning transparent', '#1 Апельсин')}
          grid={
            viewType === 'list'
              ? { xs: 24, lg: 12, xl: 8, xxl: 6 }
              : { xs: 24, lg: 24, xl: 24, xxl: 24 }
          }
        />
      ))
  )

  const tasksViewList = (
    <>
      <Row justify='start'>{TaskCards.map(TaskCard => TaskCard)}</Row>
      {/* <CustomPagination onChange={onChange} total={500} /> */}
    </>
  )

  // ***********************************

  interface DataType {
    // key: React.Key
    // name: string
    [name: string]: any
  }

  const columns: TableColumnsType<DataType> = []

  taskStatuses.map(taskStatus => {
    columns.push({
      title: translated_phrase('Statuses.Task.' + taskStatus.name),
      dataIndex: taskStatus.name,
      key: taskStatus.id,
    })
    // sortedTasks.push([taskStatus.name])
  })

  //   console.log(1, sortedTasks)

  const rows: DataType[] = []

  project.tasks.map(task => {
    let createNewRow = true

    if (!rows.length) {
      rows.push({
        key: rows.length + 1,
        [task.status]: <Row justify='start'>{TaskCards[task.id]}</Row>,
      })
      return
    }
    rows.map(row => {
      if (typeof row[task.status] === 'undefined') {
        row[task.status] = <Row justify='start'>{TaskCards[task.id]}</Row>
        createNewRow = false
        return
      }
    })
    if (createNewRow) {
      rows.push({
        key: rows.length + 1,
        [task.status]: <Row justify='start'>{TaskCards[task.id]}</Row>,
      })
    }
    // return
  })
  //   console.log(rows)

  //   project.tasks.map(task => {
  //     data.push({
  //       key: task.id,
  //       //   name: task.name,
  //       [task.status]: <Row justify='start'>{TaskCards[task.id]}</Row>,
  //     })
  //   })

  const defaultCheckedList = columns.map(item => item.key as string)

  const [checkedList, setCheckedList] = useState(defaultCheckedList)

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }))

  const newColumns = columns.map(item => ({
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }))

  //   ************************************

  const tasksViewScrum = (
    <>
      <Table
        // loading
        bordered
        // virtual
        scroll={{ x: 1900, y: 1000 }}
        columns={newColumns}
        dataSource={rows}
        style={{ marginTop: 24 }}
        pagination={false}
      />
    </>
  )

  const handleMenuClick: MenuProps['onClick'] = e => {
    //   message.info('Click on menu item.')
    dispatch(setViewType(e.key === '1' ? 'list' : 'scrum'))
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Radio value={1}>
          <i className='fa-regular fa-table-list'></i> Список
        </Radio>
      ),
      //   icon: <i className='fa-regular fa-table-list'></i>,
    },
    {
      key: '2',
      label: (
        <Radio value={2}>
          <i className='fa-light fa-table'></i> Скрам
        </Radio>
      ),
      //   icon: <i className='fa-light fa-table'></i>,
    },
  ]

  const menuProps = {
    items,
    onClick: handleMenuClick,
  }

  const tasksView = (
    <>
      <Space>
        <Filter
          filters={[
            {
              groupName: translated_phrase('Filters.statuses'),
              filedName: 'taskStatus',
              content: (
                <Checkbox.Group
                  value={checkedList}
                  options={options as CheckboxOptionType[]}
                  onChange={value => {
                    setCheckedList(value as string[])
                  }}
                />
              ),
            },
            {
              groupName: translated_phrase('MenuItems.projects').substring(
                0,
                translated_phrase('MenuItems.projects').length - 1
              ),
              filedName: 'project',
              content: (
                <Select
                  showSearch
                  placeholder='Выбор проекта'
                  optionFilterProp='children'
                  // onChange={onChange}
                  // onSearch={onSearch}
                  // filterOption={filterOption}
                  allowClear
                  options={[
                    {
                      value: '1',
                      label: '#1 Апельсин',
                    },
                    {
                      value: '2',
                      label: '#2 Мандарин',
                    },
                  ]}
                />
              ),
            },
          ]}
        />

        <Radio.Group
          //   name='radiogroup'
          defaultValue={viewType === 'list' ? 1 : 2}
        >
          <Dropdown
            menu={menuProps}
            placement='bottom'
            trigger={['click']}
            arrow
          >
            <Button
              className='smart-btn warning transparent'
              icon={<i className='fa-regular fa-table-cells'></i>}
            >
              Вид
            </Button>
          </Dropdown>
        </Radio.Group>
      </Space>

      {viewType === 'list' ? tasksViewList : tasksViewScrum}
    </>
  )

  return <>{tasksView}</>
}
