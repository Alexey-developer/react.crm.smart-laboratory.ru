import type { FilterFieldName, TFilter } from '@redux/Filters/types'

/** URI-параметры навигации → имена полей в Filter / Redux */
export const URL_FILTER_PARAM_TO_FIELD = {
  project: 'project',
  project_id: 'project',
  direction_id: 'direction',
  worker_profile_id: 'worker_profile',
} as const

export type UrlFilterParam = keyof typeof URL_FILTER_PARAM_TO_FIELD

export const URL_FILTER_PARAMS = Object.keys(
  URL_FILTER_PARAM_TO_FIELD
) as UrlFilterParam[]

export type SearchParamsFilterValues = Partial<
  Record<(typeof URL_FILTER_PARAM_TO_FIELD)[UrlFilterParam], number[]>
>

export const parseFiltersFromSearchParams = (
  search: string
): SearchParamsFilterValues => {
  const result: SearchParamsFilterValues = {}

  if (!search) {
    return result
  }

  const params = new URLSearchParams(search)

  for (const [param, fieldName] of Object.entries(URL_FILTER_PARAM_TO_FIELD)) {
    const raw = params.get(param)
    if (!raw) {
      continue
    }

    const id = Number(raw)
    if (Number.isFinite(id) && id > 0) {
      result[fieldName] = [id]
    }
  }

  return result
}

export const mergeUrlFiltersIntoStore = (
  existingFilters: TFilter[],
  urlFilters: SearchParamsFilterValues
): TFilter[] => {
  if (Object.keys(urlFilters).length === 0) {
    return existingFilters
  }

  const fieldNames = new Set(Object.keys(urlFilters))

  const merged = existingFilters.filter(
    filter => !fieldNames.has(filter.filedName)
  )

  for (const [fieldName, values] of Object.entries(urlFilters)) {
    merged.push({
      filedName: fieldName as FilterFieldName,
      filedValue: values as unknown as TFilter['filedValue'],
    })
  }

  return merged
}
