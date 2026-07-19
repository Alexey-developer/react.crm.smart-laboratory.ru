export type TEntityAbilities = {
  update?: boolean
  delete?: boolean
  restore?: boolean
}

export type TEntityBaseModel = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  /** Lazy instance ACL from policies — UI hints only. */
  can?: TEntityAbilities
}
