type TEntityWithProject = {
  project?: { id: number; name: string }
  project_id?: number
}

export const projectParentEntity = (entity: TEntityWithProject) => {
  if (entity.project) {
    return {
      id: entity.project.id,
      label: `#${entity.project.id} ${entity.project.name}`,
    }
  }

  if (entity.project_id) {
    return { id: entity.project_id }
  }
}
