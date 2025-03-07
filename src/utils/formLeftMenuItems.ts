import { getIcon } from '@utils/getIcon'
import * as URIs from '@utils/constants/routes'

type Badge = {
  className: string
  offset: BadgeOffset
  count: number
}

type BadgeOffset = [string | number, string | number]

export type MenuItem = {
  name_key: string
  path: string
  icon: string
  badge?: Badge
  childrenMenuItems?: MenuItem[]
}

type LeftMenuItems = MenuItem[]

export const formLeftMenuItems = (): LeftMenuItems => {
  const badge_offset: BadgeOffset = [10, -2]

  const menuItemsArray: MenuItem[] = [
    {
      name_key: 'MenuItems.accounting',
      path: URIs.ACCOUNTING,
      icon: 'fa-solid fa-calculator',
    },
    {
      name_key: 'MenuItems.budget',
      path: URIs.BUDGET,
      icon: 'fa-solid fa-ruble-sign',
    },
    {
      name_key: 'MenuItems.call_history',
      path: URIs.CALL_HISTORY,
      icon: 'fa-solid fa-headset',
      badge: {
        className: 'danger transparent',
        offset: badge_offset,
        count: 99,
      },
    },
    {
      name_key: 'MenuItems.general_permission_system',
      path: URIs.GENERAL_PERMISSION_SYSTEM,
      icon: 'fa-solid fa-lock',
    },
    {
      name_key: 'MenuItems.projects',
      path: URIs.PROJECTS,
      icon: 'fa-solid fa-diagram-project',
      badge: {
        className: '',
        offset: badge_offset,
        count: 99,
      },
    },
    {
      name_key: 'MenuItems.tasks',
      path: URIs.TASKS,
      icon: getIcon('TASKS'),
      badge: {
        className: 'success transparent',
        offset: badge_offset,
        count: 99,
      },
    },
    {
      name_key: 'MenuItems.documents',
      path: URIs.DOCUMENTS,
      icon: 'fa-solid fa-file-lines',
      badge: {
        className: 'warning transparent',
        offset: badge_offset,
        count: 99,
      },
    },
    {
      name_key: 'MenuItems.WorkingWithCustomers.self',
      path: '',
      icon: 'fa-solid fa-heart',
      childrenMenuItems: [
        {
          name_key: 'MenuItems.WorkingWithCustomers.customers',
          path: URIs.CUSTOMERS,
          icon: 'fa-solid fa-users',
          badge: {
            className: 'warning',
            offset: badge_offset,
            count: 99,
          },
        },
        {
          name_key: 'MenuItems.WorkingWithCustomers.appeals',
          path: URIs.APPEALS,
          icon: 'fa-solid fa-file-pen',
          badge: {
            className: 'danger transparent',
            offset: badge_offset,
            count: 99,
          },
        },
        {
          name_key: 'MenuItems.WorkingWithCustomers.support',
          path: URIs.SUPPORT,
          icon: 'fa-solid fa-comments',
          badge: {
            className: 'danger transparent',
            offset: badge_offset,
            count: 99,
          },
        },
        {
          name_key: 'MenuItems.WorkingWithCustomers.applications_from_website',
          path: URIs.APPLICATIONS_FROM_WEBSITE,
          icon: 'fa-solid fa-envelope-open-text',
          badge: {
            className: 'success transparent',
            offset: badge_offset,
            count: 99,
          },
        },
      ],
    },
    {
      name_key: 'MenuItems.employees',
      path: URIs.EMPLOYEES,
      icon: 'fa-solid fa-users-between-lines',
      badge: {
        className: 'danger',
        offset: badge_offset,
        count: 99,
      },
    },
  ]

  return menuItemsArray
}
