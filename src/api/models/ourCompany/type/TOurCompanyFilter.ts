export type TOurCompanyFilter = {
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  createdDates?: string[]
  updatedDates?: string[]
  deleted?: boolean
  query?: string
  status?: string[]
}
