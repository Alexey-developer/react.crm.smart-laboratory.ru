import { TFilter } from '@api/common/types/TFilter'

export type TDirectionFilter = TFilter & {
  sortBy:
    | 'name'
    | 'total_spent_time'
    | 'total_costs_auto'
    | 'total_costs'
    | 'total_incomes'
    | 'total_penalty_funds'
    | 'common_task_progress'
    | 'created_at'
    | 'updated_at'
}
