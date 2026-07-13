import type { QueryClient } from '@tanstack/react-query'

import type { GroupClass } from '@api/common/types/TGroups'

export type APIQuerySeed = {
  groupClass: GroupClass
  method: string
  data: unknown
  perPage?: number
  params?: Record<string, unknown>
}

/** Зеркало логики queryKey из useAPIQuery */
export const buildAPIQueryKey = (
  groupClass: GroupClass,
  groupMethod: string,
  perPage = 16,
  params: Record<string, unknown> = {}
): string[] => {
  let queryKey = `${groupClass.name}/${String(groupMethod)}`

  if (String(groupMethod) === 'index') {
    const indexParams = {
      per_page: perPage,
      ...params,
    }
    queryKey += `/perPage=${indexParams.per_page}`

    if (indexParams.page) {
      queryKey += `/page=${indexParams.page}`
    }
    if (indexParams.filters) {
      const filters = { ...(indexParams.filters as Record<string, unknown>) }
      const statusKey = Object.keys(filters).find(key => key.includes('_status'))
      if (statusKey) {
        filters.status = filters[statusKey]
        delete filters[statusKey]
      }
      queryKey += `/filters=${JSON.stringify(filters)}`
    }
    if (indexParams.sort_by && indexParams.sort_direction) {
      queryKey += `/sortBy=${indexParams.sort_by}/sortDirection=${indexParams.sort_direction}`
    }
    if (indexParams.query) {
      queryKey += `/query=${indexParams.query}/queryFields=${indexParams.query_fields}`
    }
    if (indexParams.id) {
      queryKey += `/id=${indexParams.id}`
    }
  }

  return [queryKey]
}

export const seedAPIQueries = (
  client: QueryClient,
  seeds: APIQuerySeed[],
  defaultPerPage = 16
) => {
  for (const seed of seeds) {
    const queryKey = buildAPIQueryKey(
      seed.groupClass,
      seed.method,
      seed.perPage ?? defaultPerPage,
      seed.params ?? {}
    )
    client.setQueryData(queryKey, seed.data)
  }
}
