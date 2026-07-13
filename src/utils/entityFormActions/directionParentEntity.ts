import type { TDirection } from '@api/models/direction/type/TDirection'

import { projectParentEntity } from './projectParentEntity'

export const directionParentEntity = (direction: TDirection) =>
  projectParentEntity(direction)
