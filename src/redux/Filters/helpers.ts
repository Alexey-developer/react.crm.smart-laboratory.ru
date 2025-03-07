import type { FilterType, TFilter } from './types'

export const getMapFromString = (str?: string) => {
  const filtersMap = new Map<FilterType, TFilter[]>()

  const filtersString = str ?? localStorage.getItem('filters')
  if (!filtersString) {
    return filtersMap
  }
  const filtersArray = filtersString?.split('|')

  filtersArray?.map(pageFilters => {
    const split = pageFilters.split('::')

    const page = split[0] //key
    const filters = JSON.parse(split[1])

    filtersMap.set(page as FilterType, filters)
  })

  return filtersMap
}

export const getStringFromMap = (filtersMap: Map<FilterType, TFilter[]>) => {
  let str = ''

  //   for (const [key, value] of Object.entries(filtersMap)) {
  //     console.log(key, value)
  //   }

  for (const entry of filtersMap) {
    const key = entry[0] //page
    const value = entry[1]
    str += `${key}::${JSON.stringify(value)}|`
  }
  return str.slice(0, -1)
}
