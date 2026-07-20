export type EntityFormActionsConfig = {
  tasksFilterKey?: 'project_id' | 'direction_id'
  parentEntity?: (entity: any) =>
    | { id: number; label?: string }
    | undefined
  directionEntity?: (entity: any) =>
    | { id: number; label?: string }
    | undefined
  taskEntity?: (entity: any) =>
    | { id: number; label?: string }
    | undefined
}
