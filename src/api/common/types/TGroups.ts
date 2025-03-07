import { CurrentUserGroup } from '@api/models/currentUser/queryGroup'
import { ProjectGroup } from '@api/models/project/queryGroup'
import { CustomerCompanyGroup } from '@api/models/customerCompany/queryGroup'

export type GroupClass =
  | typeof CurrentUserGroup
  | typeof ProjectGroup
  | typeof CustomerCompanyGroup
export type GroupMethod =
  | keyof CurrentUserGroup
  | keyof ProjectGroup
  | keyof CustomerCompanyGroup
