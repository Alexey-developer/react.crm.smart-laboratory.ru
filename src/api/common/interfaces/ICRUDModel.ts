import { IBaseModel } from './IBaseModel'

import type { TProject } from '@api/models/project/type/TProject'

export type ID = {
  id: number
}
// export type Fields = {
//   fields: any
// }

type TEntity = TProject

export interface ICRUDModel extends IBaseModel {
  show({ id }: ID): void
  store(entity: TEntity): void
  update(entity: TEntity /*ID & Fields*/): void
  destroy(id: number): void
  restore(id: number): void
}
