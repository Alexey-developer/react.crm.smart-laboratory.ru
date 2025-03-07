import { IBaseModel } from './IBaseModel'

export type ID = {
  id: number
}
export type Fields = {
  fields: any
}

export interface ICRUDModel extends IBaseModel {
  show({ id }: ID): void
  store(): void
  update({ id, fields }: ID & Fields): void
  destroy(id: number): void
  restore(id: number): void
}
