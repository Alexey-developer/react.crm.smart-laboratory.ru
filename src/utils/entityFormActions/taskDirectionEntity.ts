type TEntityWithDirection = {
  direction?: { id: number; name: string }
  direction_id?: number
}

export const taskDirectionEntity = (entity: TEntityWithDirection) => {
  if (entity.direction) {
    return {
      id: entity.direction.id,
      label: `#${entity.direction.id} ${entity.direction.name}`,
    }
  }

  if (entity.direction_id) {
    return { id: entity.direction_id }
  }
}
