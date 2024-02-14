import React, { Suspense, lazy } from 'react'

import { Routes, Route } from 'react-router-dom'

import { constants } from '@utils/constants.json'

import { MainLayout } from '@layouts/MainLayout'

import { HomePage } from '@pages/HomePage'
// import { ProjectsPage } from './Pages/ProjectsPage'

// const ProjectsPage = Loadable({
// 	loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
// 	loading: () => <div>Идёт загрузка корзины...</div>,
// })

// const ProjectsPage = lazy(
// 	() => import(/* webpackChunkName: "FullPizza" */ './Pages/ProjectsPage')
// )

const ProjectsPage = lazy(() =>
  import('@pages/ProjectsPage').then(module => ({
    default: module.ProjectsPage,
  }))
)
const ProjectPage = lazy(() =>
  import('@pages/ProjectPage').then(module => ({
    default: module.ProjectsPage,
  }))
)

const TasksPage = lazy(() =>
  import('@pages/TasksPage').then(module => ({
    default: module.TasksPage,
  }))
)

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<HomePage />} />
        <Route
          path='projects'
          element={
            <Suspense fallback={<div>Идёт загрузка страницы проекта...</div>}>
              <ProjectsPage />
            </Suspense>
          }
        />
        <Route
          path='projects/:id'
          element={
            <Suspense fallback={<div>Идёт загрузка страницы проекта...</div>}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route
          path={'projects/:id/' + constants.routes.editing}
          element={
            <Suspense fallback={<div>Идёт загрузка страницы проекта...</div>}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route
          path={'projects/' + constants.routes.creating}
          element={
            <Suspense fallback={<div>Идёт загрузка страницы проекта...</div>}>
              <ProjectPage />
            </Suspense>
          }
        />

        <Route
          path='tasks'
          element={
            <Suspense fallback={<div>Идёт загрузка страницы проекта...</div>}>
              <TasksPage />
            </Suspense>
          }
        />
        {/* <Route
          path='tasks/:id'
          element={
            <Suspense fallback={<div>Идёт загрузка страницы проекта...</div>}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route
          path={'tasks/:id/' + constants.routes.editing}
          element={
            <Suspense fallback={<div>Идёт загрузка страницы проекта...</div>}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route
          path={'tasks/' + constants.routes.creating}
          element={
            <Suspense fallback={<div>Идёт загрузка страницы проекта...</div>}>
              <ProjectPage />
            </Suspense>
          }
        /> */}

        {/* <Route
					path='projects/31'
					element={
						<Suspense fallback={<div>Идёт загрузка страницы проекта...</div>}>
							<ProjectsPage />
						</Suspense>
					}
				/> */}
        {/* <Route
					path='*'
					element={
						<Suspense fallback={<div>Идёт загрузка...</div>}>
							<NotFound />
						</Suspense>
					}
				/> */}
      </Route>
    </Routes>
  )
}

export default App
