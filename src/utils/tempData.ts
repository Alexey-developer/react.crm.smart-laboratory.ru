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
  }
  return project
}
