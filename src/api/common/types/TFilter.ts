export type TFilter = {
  sortDirection: 'asc' | 'desc'
  createdDates: [string, string]
  updatedDates: [string, string]
  deleted: 'only_existing' | 'only_deleted' | 'all'
  query?: string
}
