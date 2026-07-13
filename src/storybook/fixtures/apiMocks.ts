import { CustomerCompanyGroup } from '@api/models/customerCompany/queryGroup'
import { DirectionGroup } from '@api/models/direction/queryGroup'
import { ProjectGroup } from '@api/models/project/queryGroup'
import { ProjectStatusGroup } from '@api/models/projectStatus/queryGroup'

import type { APIQuerySeed } from '../queryMocks'

export const mockProjectStatuses = [
  { id: 1, lang_code: 'Statuses.Project.in_progress' },
  { id: 2, lang_code: 'Statuses.Project.completed' },
  { id: 3, lang_code: 'Statuses.Project.on_hold' },
]

export const mockProjectsIndexResponse = {
  data: [
    { id: 1, name: 'Alpha Portal' },
    { id: 2, name: 'Beta CRM' },
    { id: 3, name: 'Gamma Analytics' },
  ],
  meta: {
    current_page: 1,
    last_page: 2,
    per_page: 16,
    total: 3,
  },
}

export const mockCustomerCompaniesIndexResponse = {
  data: [
    { id: 10, name: 'Smart Lab LLC' },
    { id: 11, name: 'Acme Corp' },
  ],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 16,
    total: 2,
  },
}

/** Seeds для Filter / CustomSelect на странице projects */
export const projectsFilterQuerySeeds: APIQuerySeed[] = [
  {
    groupClass: ProjectStatusGroup,
    method: 'index',
    data: mockProjectStatuses,
  },
  {
    groupClass: CustomerCompanyGroup,
    method: 'index',
    params: { page: 1, query: '' },
    data: mockCustomerCompaniesIndexResponse,
  },
]

/** Seeds для CustomSelect type=PROJECT */
export const projectSelectQuerySeeds: APIQuerySeed[] = [
  {
    groupClass: ProjectGroup,
    method: 'index',
    params: { page: 1, query: '' },
    data: mockProjectsIndexResponse,
  },
]

export const mockDirectionsIndexResponse = {
  data: [
    { id: 101, name: 'Backend' },
    { id: 102, name: 'Frontend' },
  ],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 16,
    total: 2,
  },
}

/** Seeds для CustomSelect type=DIRECTION */
export const directionSelectQuerySeeds: APIQuerySeed[] = [
  {
    groupClass: DirectionGroup,
    method: 'index',
    params: { page: 1, query: '' },
    data: mockDirectionsIndexResponse,
  },
]

export const projectStatusSimpleSelectSeeds: APIQuerySeed[] = [
  {
    groupClass: ProjectStatusGroup,
    method: 'index',
    data: mockProjectStatuses,
  },
]
