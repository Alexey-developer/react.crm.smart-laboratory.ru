export type TParams = {
  sort_by: ProductFilter['sortBy']
  sort_direction: ProductFilter['sortDirection']
  filters: {
    created_at?: ProductFilter['createdDates']
    updated_at?: ProductFilter['updatedDates']
    price: ProductFilter['price']
    deleted: ProductFilter['deleted']
  }
  query?: string
  page?: number
  per_page?: number
}
