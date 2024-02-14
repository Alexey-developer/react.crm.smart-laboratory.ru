export const getTaskStatuses = () => {
  const taskStatuses = [
    {
      id: 1,
      name: 'planned',
      class: 'Апельсин',
    },
    {
      id: 2,
      name: 'in_progress',
      class: 'Апельсин',
    },
    {
      id: 3,
      name: 'went_beyond_planned_time',
      class: 'Апельсин',
    },
    {
      id: 4,
      name: 'expired',
      class: 'Апельсин',
    },
    {
      id: 5,
      name: 'completed',
      class: 'Апельсин',
    },
  ]
  return taskStatuses
}

export const getProject = () => {
  const project = {
    id: 1,
    name: 'Апельсин',
    description: 'Laravel (Backend API) + React (Frontend)',
    createdAt: '31-07-2022 | 00:24:01',
    totalTime: '1536 ч. 0 м.',
    incomes: 1817875,
    costsAuto: 888210,
    costs: 818446,
    penalty: 41800,
    progress: 89,
    employees: [
      {
        id: 1,
        name: 'Алексей',
        surname: 'Деревенсков',
      },
      {
        id: 2,
        name: 'Дмитрий',
        surname: 'Андреев',
      },
      {
        id: 3,
        name: 'Эльдар',
        surname: 'Насиров',
      },
      {
        id: 4,
        name: 'Алмаз',
        surname: 'Маратович',
      },
    ],
    tasks: [
      {
        id: 1,
        name: 'Задача',
        status: getTaskStatuses()[0].name,
        statusClass: 'transparent',
      },
      {
        id: 2,
        name: 'Задача',
        status: getTaskStatuses()[1].name,
        statusClass: 'warning transparent',
      },
      {
        id: 3,
        name: 'Задача',
        status: getTaskStatuses()[2].name,
        statusClass: 'danger transparent',
      },
      {
        id: 4,
        name: 'Задача',
        status: getTaskStatuses()[3].name,
        statusClass: 'danger transparent',
      },
      {
        id: 5,
        name: 'Задача',
        status: getTaskStatuses()[4].name,
        statusClass: 'success transparent',
      },
      {
        id: 6,
        name: 'Задача',
        status: getTaskStatuses()[1].name,
        statusClass: 'warning transparent',
      },
      {
        id: 7,
        name: 'Задача',
        status: getTaskStatuses()[1].name,
        statusClass: 'warning transparent',
      },
    ],
  }
  return project
}
