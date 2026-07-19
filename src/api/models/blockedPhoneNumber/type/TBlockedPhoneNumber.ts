export type TBlockedPhoneNumber = {
  id: number
  e164: string
  comment: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
}
