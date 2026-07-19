import { TWorkerProfile } from '@api/models/workerProfile/type/TWorkerProfile'

export type TUser = {
  id: number
  name: string
  email: string
  is_banned: boolean
  created_at: string
  updated_at: string
  worker_profile?: Pick<TWorkerProfile, 'id'> | null
}
