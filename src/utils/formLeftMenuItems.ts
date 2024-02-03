import { getIcon } from '@utils/getIcon'

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
      path: 'accounting',
      icon: 'fa-solid fa-calculator',
    },
    {
      name_key: 'MenuItems.budget',
      path: 'budget',
      icon: 'fa-solid fa-ruble-sign',
    },
    {
      name_key: 'MenuItems.call_history',
      path: 'call-history',
      icon: 'fa-solid fa-headset',
      badge: {
        className: 'danger transparent',
        offset: badge_offset,
        count: 99,
      },
    },
    {
      name_key: 'MenuItems.general_permission_system',
      path: 'general-permission-system',
      icon: 'fa-solid fa-lock',
    },
    {
      name_key: 'MenuItems.projects',
      path: 'projects',
      icon: 'fa-solid fa-diagram-project',
      badge: {
        className: '',
        offset: badge_offset,
        count: 99,
      },
    },
    {
      name_key: 'MenuItems.tasks',
      path: 'tasks',
      icon: getIcon('TASKS'),
      badge: {
        className: 'success transparent',
        offset: badge_offset,
        count: 99,
      },
    },
    {
      name_key: 'MenuItems.documents',
      path: 'documents',
      icon: 'fa-solid fa-file-lines',
      badge: {
        className: 'warning transparent',
        offset: badge_offset,
        count: 99,
      },
    },
    {
      name_key: 'MenuItems.WorkingWithCustomers.self',
      path: 'self',
      icon: 'fa-solid fa-heart',
      childrenMenuItems: [
        {
          name_key: 'MenuItems.WorkingWithCustomers.customers',
          path: 'customers',
          icon: 'fa-solid fa-users',
          badge: {
            className: 'warning',
            offset: badge_offset,
            count: 99,
          },
        },
        {
          name_key: 'MenuItems.WorkingWithCustomers.appeals',
          path: 'appeals',
          icon: 'fa-solid fa-file-pen',
          badge: {
            className: 'danger transparent',
            offset: badge_offset,
            count: 99,
          },
        },
        {
          name_key: 'MenuItems.WorkingWithCustomers.support',
          path: 'support',
          icon: 'fa-solid fa-comments',
          badge: {
            className: 'danger transparent',
            offset: badge_offset,
            count: 99,
          },
        },
        {
          name_key: 'MenuItems.WorkingWithCustomers.applications_from_website',
          path: 'applications-from-website',
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
      path: 'employees',
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
