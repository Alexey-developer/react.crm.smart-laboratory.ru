import { lazy } from 'react'

import { Routes, Route } from 'react-router-dom'

import { MainLayout } from '@layouts/MainLayout'

import { HomePage } from '@pages/HomePage'

import * as URIs from '@utils/constants/routes'

// import { ProjectsPage } from './Pages/ProjectsPage'

// const ProjectsPage = Loadable({
// 	loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
// 	loading: () => <div>Идёт загрузка корзины...</div>,
// })

// const ProjectsPage = lazy(
// 	() => import(/* webpackChunkName: "FullPizza" */ './Pages/ProjectsPage')
// )

const ProjectsPage = lazy(() =>
  import('@pages/entities/projects/index').then(module => ({
    default: module.ProjectsPage,
  }))
)
const ProjectPage = lazy(() =>
  import('@pages/entities/projects/show').then(module => ({
    default: module.ProjectPage,
  }))
)
const CreateProjectPage = lazy(() =>
  import('@pages/entities/projects/create').then(module => ({
    default: module.CreateProjectPage,
  }))
)
const EditProjectPage = lazy(() =>
  import('@pages/entities/projects/edit').then(module => ({
    default: module.EditProjectPage,
  }))
)

const TasksPage = lazy(() =>
  import('@pages/entities/tasks/index').then(module => ({
    default: module.TasksPage,
  }))
)
const TaskPage = lazy(() =>
  import('@pages/entities/tasks/show').then(module => ({
    default: module.TaskPage,
  }))
)

type IRoute = {
  uri: string
  indexComponent: React.ReactNode //LazyExoticComponent<FC>
  showComponent: React.ReactNode
  editComponent: React.ReactNode
  createComponent: React.ReactNode
}
const readyRoutes: React.ReactElement[] = []

const formCRUDRoutes = (route: IRoute) => {
  readyRoutes.push(
    <Route
      key={readyRoutes.length}
      path={route.uri}
      element={route.indexComponent}
    />
  )
  readyRoutes.push(
    <Route
      key={readyRoutes.length}
      path={`${route.uri}/:entityId`}
      element={route.showComponent}
    />
  )
  readyRoutes.push(
    <Route
      key={readyRoutes.length}
      path={`${route.uri}/:entityId/${URIs.COMMON_EDITING}`}
      element={route.editComponent}
    />
  )
  readyRoutes.push(
    <Route
      key={readyRoutes.length}
      path={`${route.uri}/${URIs.COMMON_CREATING}`}
      element={route.createComponent}
    />
  )
}

const routes: IRoute[] = [
  {
    uri: URIs.PROJECTS,
    indexComponent: <ProjectsPage />,
    showComponent: <ProjectPage />,
    editComponent: <EditProjectPage />,
    createComponent: <CreateProjectPage />,
  },
  {
    uri: URIs.TASKS,
    indexComponent: <TasksPage />,
    showComponent: <TaskPage />,
    editComponent: <TaskPage />,
    createComponent: <TaskPage />,
  },
]

routes.map(route => formCRUDRoutes(route))

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<HomePage />} />

        {readyRoutes.map(readyRoute => readyRoute)}
        {/* <Route path='projects' element={<ProjectsPage />} />
        <Route path='projects/:id' element={<ProjectPage />} />
        <Route
          path={'projects/:id/' + COMMON_EDITING}
          element={<ProjectPage />}
        />
        <Route
          path={'projects/' + COMMON_CREATING}
          element={<CreateProjectPage />}
        /> */}
        {/* <Route path='tasks' element={<TasksPage />} />
        <Route path='tasks/:id' element={<TaskPage />} />
        <Route path={'tasks/:id/' + COMMON_EDITING} element={<TaskPage />} />
        <Route path={'tasks/' + COMMON_CREATING} element={<TaskPage />} /> */}
        {/* <Route
					path='*'
					element={
						<Suspense fallback={<div>Идёт загрузка...</div>}>
							<NotFound />
						</Suspense>
					}
				/> */}
      </Route>
      <Route path='auth' element={<MainLayout />} />
    </Routes>
  )
}

export default App
