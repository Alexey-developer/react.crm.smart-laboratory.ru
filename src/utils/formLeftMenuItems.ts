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
  /** Route segment for leaf items; empty for group parents (use `key`). */
  path: string
  /**
   * antd Menu item key. Required unique for group parents (`path: ''`);
   * defaults to `path` for leaves. Shared empty keys collapse all groups together.
   */
  key?: string
  icon: string
  badge?: Badge
  childrenMenuItems?: MenuItem[]
  /**
   * CommonPermissionActionsEnum value (short key), e.g. `permissions.manage`.
   * Resolved via current-user `common_permissions_catalog` — not a hardcoded Spatie string.
   */
  permission?: string
  /** POST horizon/enter then window.open — not a React Router path. */
  openHorizon?: boolean
}

type LeftMenuItems = MenuItem[]

export const formLeftMenuItems = (): LeftMenuItems => {
  const badge_offset: BadgeOffset = [10, -2]

  const menuItemsArray: MenuItem[] = [
    {
      name_key: 'MenuItems.Budget.self',
      path: '',
      key: 'budget',
      icon: 'fa-solid fa-ruble-sign',
      childrenMenuItems: [
        {
          name_key: 'MenuItems.Budget.accounting',
          path: URIs.ACCOUNTING,
          icon: 'fa-solid fa-calculator',
        },
        {
          name_key: 'MenuItems.Budget.financial_operations',
          path: URIs.FINANCIAL_OPERATIONS,
          icon: 'fa-solid fa-money-bill-transfer',
        },
      ],
    },
    {
      name_key: 'MenuItems.Telephony.self',
      path: '',
      key: 'telephony',
      icon: getIcon('CALLS'),
      childrenMenuItems: [
        {
          name_key: 'MenuItems.Telephony.calls',
          path: URIs.CALLS,
          icon: getIcon('CALLS'),
          badge: {
            className: 'danger transparent',
            offset: badge_offset,
            count: 99,
          },
        },
        {
          name_key: 'MenuItems.Telephony.phone_numbers',
          path: URIs.PHONE_NUMBERS,
          icon: getIcon('PHONE_NUMBERS'),
        },
        {
          name_key: 'MenuItems.Telephony.operator_profiles',
          path: URIs.OPERATOR_PROFILES,
          icon: getIcon('OPERATOR_PROFILES'),
        },
        {
          name_key: 'MenuItems.Telephony.call_extensions',
          path: URIs.CALL_EXTENSIONS,
          icon: getIcon('CALL_EXTENSIONS'),
        },
        {
          name_key: 'MenuItems.Telephony.company_dial_numbers',
          path: URIs.COMPANY_DIAL_NUMBERS,
          icon: getIcon('COMPANY_DIAL_NUMBERS'),
        },
        {
          name_key: 'MenuItems.Telephony.blocked_phone_numbers',
          path: URIs.BLOCKED_PHONE_NUMBERS,
          icon: getIcon('BLOCKED_PHONE_NUMBERS'),
        },
      ],
    },
    {
      name_key: 'MenuItems.CrmSettings.self',
      path: '',
      key: 'crm-settings',
      icon: 'fa-solid fa-gears',
      childrenMenuItems: [
        {
          name_key: 'MenuItems.CrmSettings.general_permission_system',
          path: URIs.GENERAL_PERMISSION_SYSTEM,
          icon: 'fa-solid fa-lock',
          permission: 'permissions.manage',
        },
        {
          name_key: 'MenuItems.CrmSettings.horizon_dashboard',
          path: '',
          key: 'horizon-dashboard',
          icon: 'fa-solid fa-gauge-high',
          permission: 'horizon.view_dashboard',
          openHorizon: true,
        },
      ],
    },
    {
      name_key: 'MenuItems.Workflow.self',
      path: '',
      key: 'workflow',
      icon: 'fa-solid fa-diagram-project',
      childrenMenuItems: [
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
          name_key: 'MenuItems.directions',
          path: URIs.DIRECTIONS,
          icon: getIcon('DIRECTIONS'),
          badge: {
            className: 'warning transparent',
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
      ],
    },
    {
      name_key: 'MenuItems.Employees.self',
      path: '',
      key: 'employees',
      icon: 'fa-solid fa-users-between-lines',
      childrenMenuItems: [
        {
          name_key: 'MenuItems.Employees.profiles',
          path: URIs.WORKER_PROFILES,
          icon: 'fa-solid fa-id-badge',
          badge: {
            className: 'danger',
            offset: badge_offset,
            count: 99,
          },
        },
        {
          name_key: 'MenuItems.work_time_ranges',
          path: URIs.WORK_TIME_RANGES,
          icon: 'fa-solid fa-stopwatch',
        },
      ],
    },
    {
      name_key: 'MenuItems.KnowledgeBase.self',
      path: '',
      key: 'knowledge-base',
      icon: 'fa-solid fa-book',
      childrenMenuItems: [
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
      ],
    },
    {
      name_key: 'MenuItems.WorkingWithCustomers.self',
      path: '',
      key: 'working-with-customers',
      icon: 'fa-solid fa-heart',
      childrenMenuItems: [
        {
          name_key: 'MenuItems.WorkingWithCustomers.companies',
          path: URIs.CUSTOMER_COMPANIES,
          icon: 'fa-solid fa-building',
          badge: {
            className: 'warning',
            offset: badge_offset,
            count: 99,
          },
        },
        {
          name_key: 'MenuItems.WorkingWithCustomers.customer_profiles',
          path: URIs.CUSTOMER_PROFILES,
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
      name_key: 'MenuItems.system_users',
      path: URIs.SYSTEM_USERS,
      icon: 'fa-solid fa-user-shield',
    },
  ]

  return menuItemsArray
}

/** Drop items the user cannot see; drop empty groups after filtering children. */
export const filterMenuItemsByPermissions = (
  items: MenuItem[],
  can: (permission: string) => boolean
): MenuItem[] => {
  return items
    .map(item => {
      if (item.permission && !can(item.permission)) {
        return null
      }

      if (!item.childrenMenuItems) {
        return item
      }

      const children = filterMenuItemsByPermissions(item.childrenMenuItems, can)
      if (children.length === 0) {
        return null
      }

      return { ...item, childrenMenuItems: children }
    })
    .filter((item): item is MenuItem => item !== null)
}

/** Depth-first lookup by route segment (leaf `path`). */
export const findLeftMenuItemByPath = (
  items: MenuItem[],
  path: string
): MenuItem | undefined => {
  for (const item of items) {
    if (item.path === path) {
      return item
    }

    if (item.childrenMenuItems) {
      const found = findLeftMenuItemByPath(item.childrenMenuItems, path)
      if (found) {
        return found
      }
    }
  }

  return undefined
}
