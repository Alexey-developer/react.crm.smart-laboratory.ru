import { CurrentUserGroup } from '@api/models/currentUser/queryGroup'
import { ProjectGroup } from '@api/models/project/queryGroup'
import { ProjectTypeGroup } from '@api/models/projectType/queryGroup'
import { ProjectStatusGroup } from '@api/models/projectStatus/queryGroup'
import { TaskGroup } from '@api/models/task/queryGroup'
import { TaskStatusGroup } from '@api/models/taskStatus/queryGroup'
import { CustomerCompanyGroup } from '@api/models/customerCompany/queryGroup'

export type GroupClass =
  | typeof CurrentUserGroup
  | typeof ProjectGroup
  | typeof ProjectTypeGroup
  | typeof ProjectStatusGroup
  | typeof TaskGroup
  | typeof TaskStatusGroup
  | typeof CustomerCompanyGroup
export type GroupMethod =
  | keyof CurrentUserGroup
  | keyof ProjectGroup
  | keyof ProjectTypeGroup
  | keyof ProjectStatusGroup
  | keyof TaskGroup
  | keyof TaskStatusGroup
  | keyof CustomerCompanyGroup
