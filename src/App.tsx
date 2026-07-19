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

const DirectionsPage = lazy(() =>
  import('@pages/entities/directions/index').then(module => ({
    default: module.DirectionsPage,
  }))
)
const DirectionPage = lazy(() =>
  import('@pages/entities/directions/show').then(module => ({
    default: module.DirectionPage,
  }))
)
const CreateDirectionPage = lazy(() =>
  import('@pages/entities/directions/create').then(module => ({
    default: module.CreateDirectionPage,
  }))
)
const EditDirectionPage = lazy(() =>
  import('@pages/entities/directions/edit').then(module => ({
    default: module.EditDirectionPage,
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

const WorkTimeRangesPage = lazy(() =>
  import('@pages/entities/workTimeRanges/index').then(module => ({
    default: module.WorkTimeRangesPage,
  }))
)

const CallsPage = lazy(() =>
  import('@pages/entities/calls/index').then(module => ({
    default: module.CallsPage,
  }))
)
const CallPage = lazy(() =>
  import('@pages/entities/calls/show').then(module => ({
    default: module.CallPage,
  }))
)
const CreateCallPage = lazy(() =>
  import('@pages/entities/calls/create').then(module => ({
    default: module.CreateCallPage,
  }))
)
const EditCallPage = lazy(() =>
  import('@pages/entities/calls/edit').then(module => ({
    default: module.EditCallPage,
  }))
)

const PhoneNumbersPage = lazy(() =>
  import('@pages/entities/phoneNumbers/index').then(module => ({
    default: module.PhoneNumbersPage,
  }))
)
const PhoneNumberPage = lazy(() =>
  import('@pages/entities/phoneNumbers/show').then(module => ({
    default: module.PhoneNumberPage,
  }))
)
const CreatePhoneNumberPage = lazy(() =>
  import('@pages/entities/phoneNumbers/create').then(module => ({
    default: module.CreatePhoneNumberPage,
  }))
)
const EditPhoneNumberPage = lazy(() =>
  import('@pages/entities/phoneNumbers/edit').then(module => ({
    default: module.EditPhoneNumberPage,
  }))
)

const OperatorProfilesPage = lazy(() =>
  import('@pages/entities/operatorProfiles/index').then(module => ({
    default: module.OperatorProfilesPage,
  }))
)
const OperatorProfilePage = lazy(() =>
  import('@pages/entities/operatorProfiles/show').then(module => ({
    default: module.OperatorProfilePage,
  }))
)
const CreateOperatorProfilePage = lazy(() =>
  import('@pages/entities/operatorProfiles/create').then(module => ({
    default: module.CreateOperatorProfilePage,
  }))
)
const EditOperatorProfilePage = lazy(() =>
  import('@pages/entities/operatorProfiles/edit').then(module => ({
    default: module.EditOperatorProfilePage,
  }))
)

const BlockedPhoneNumbersPage = lazy(() =>
  import('@pages/entities/blockedPhoneNumbers/index').then(module => ({
    default: module.BlockedPhoneNumbersPage,
  }))
)
const BlockedPhoneNumberPage = lazy(() =>
  import('@pages/entities/blockedPhoneNumbers/show').then(module => ({
    default: module.BlockedPhoneNumberPage,
  }))
)
const CreateBlockedPhoneNumberPage = lazy(() =>
  import('@pages/entities/blockedPhoneNumbers/create').then(module => ({
    default: module.CreateBlockedPhoneNumberPage,
  }))
)
const EditBlockedPhoneNumberPage = lazy(() =>
  import('@pages/entities/blockedPhoneNumbers/edit').then(module => ({
    default: module.EditBlockedPhoneNumberPage,
  }))
)

const CallExtensionsPage = lazy(() =>
  import('@pages/entities/callExtensions/index').then(module => ({
    default: module.CallExtensionsPage,
  }))
)
const CallExtensionPage = lazy(() =>
  import('@pages/entities/callExtensions/show').then(module => ({
    default: module.CallExtensionPage,
  }))
)
const CreateCallExtensionPage = lazy(() =>
  import('@pages/entities/callExtensions/create').then(module => ({
    default: module.CreateCallExtensionPage,
  }))
)
const EditCallExtensionPage = lazy(() =>
  import('@pages/entities/callExtensions/edit').then(module => ({
    default: module.EditCallExtensionPage,
  }))
)

const CompanyDialNumbersPage = lazy(() =>
  import('@pages/entities/companyDialNumbers/index').then(module => ({
    default: module.CompanyDialNumbersPage,
  }))
)
const CompanyDialNumberPage = lazy(() =>
  import('@pages/entities/companyDialNumbers/show').then(module => ({
    default: module.CompanyDialNumberPage,
  }))
)
const CreateCompanyDialNumberPage = lazy(() =>
  import('@pages/entities/companyDialNumbers/create').then(module => ({
    default: module.CreateCompanyDialNumberPage,
  }))
)
const EditCompanyDialNumberPage = lazy(() =>
  import('@pages/entities/companyDialNumbers/edit').then(module => ({
    default: module.EditCompanyDialNumberPage,
  }))
)

const CustomerCompaniesPage = lazy(() =>
  import('@pages/entities/customerCompanies/index').then(module => ({
    default: module.CustomerCompaniesPage,
  }))
)
const CustomerCompanyPage = lazy(() =>
  import('@pages/entities/customerCompanies/show').then(module => ({
    default: module.CustomerCompanyPage,
  }))
)
const CreateCustomerCompanyPage = lazy(() =>
  import('@pages/entities/customerCompanies/create').then(module => ({
    default: module.CreateCustomerCompanyPage,
  }))
)
const EditCustomerCompanyPage = lazy(() =>
  import('@pages/entities/customerCompanies/edit').then(module => ({
    default: module.EditCustomerCompanyPage,
  }))
)

const WorkerProfilesPage = lazy(() =>
  import('@pages/entities/workerProfiles/index').then(module => ({
    default: module.WorkerProfilesPage,
  }))
)
const WorkerProfilePage = lazy(() =>
  import('@pages/entities/workerProfiles/show').then(module => ({
    default: module.WorkerProfilePage,
  }))
)
const CreateWorkerProfilePage = lazy(() =>
  import('@pages/entities/workerProfiles/create').then(module => ({
    default: module.CreateWorkerProfilePage,
  }))
)
const EditWorkerProfilePage = lazy(() =>
  import('@pages/entities/workerProfiles/edit').then(module => ({
    default: module.EditWorkerProfilePage,
  }))
)

const CustomerProfilesPage = lazy(() =>
  import('@pages/entities/customerProfiles/index').then(module => ({
    default: module.CustomerProfilesPage,
  }))
)
const CustomerProfilePage = lazy(() =>
  import('@pages/entities/customerProfiles/show').then(module => ({
    default: module.CustomerProfilePage,
  }))
)
const CreateCustomerProfilePage = lazy(() =>
  import('@pages/entities/customerProfiles/create').then(module => ({
    default: module.CreateCustomerProfilePage,
  }))
)
const EditCustomerProfilePage = lazy(() =>
  import('@pages/entities/customerProfiles/edit').then(module => ({
    default: module.EditCustomerProfilePage,
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
    uri: URIs.DIRECTIONS,
    indexComponent: <DirectionsPage />,
    showComponent: <DirectionPage />,
    editComponent: <EditDirectionPage />,
    createComponent: <CreateDirectionPage />,
  },
  {
    uri: URIs.TASKS,
    indexComponent: <TasksPage />,
    showComponent: <TaskPage />,
    editComponent: <TaskPage />,
    createComponent: <TaskPage />,
  },
  {
    uri: URIs.WORK_TIME_RANGES,
    indexComponent: <WorkTimeRangesPage />,
    showComponent: <WorkTimeRangesPage />,
    editComponent: <WorkTimeRangesPage />,
    createComponent: <WorkTimeRangesPage />,
  },
  {
    uri: URIs.CALLS,
    indexComponent: <CallsPage />,
    showComponent: <CallPage />,
    editComponent: <EditCallPage />,
    createComponent: <CreateCallPage />,
  },
  {
    uri: URIs.PHONE_NUMBERS,
    indexComponent: <PhoneNumbersPage />,
    showComponent: <PhoneNumberPage />,
    editComponent: <EditPhoneNumberPage />,
    createComponent: <CreatePhoneNumberPage />,
  },
  {
    uri: URIs.OPERATOR_PROFILES,
    indexComponent: <OperatorProfilesPage />,
    showComponent: <OperatorProfilePage />,
    editComponent: <EditOperatorProfilePage />,
    createComponent: <CreateOperatorProfilePage />,
  },
  {
    uri: URIs.BLOCKED_PHONE_NUMBERS,
    indexComponent: <BlockedPhoneNumbersPage />,
    showComponent: <BlockedPhoneNumberPage />,
    editComponent: <EditBlockedPhoneNumberPage />,
    createComponent: <CreateBlockedPhoneNumberPage />,
  },
  {
    uri: URIs.CALL_EXTENSIONS,
    indexComponent: <CallExtensionsPage />,
    showComponent: <CallExtensionPage />,
    editComponent: <EditCallExtensionPage />,
    createComponent: <CreateCallExtensionPage />,
  },
  {
    uri: URIs.COMPANY_DIAL_NUMBERS,
    indexComponent: <CompanyDialNumbersPage />,
    showComponent: <CompanyDialNumberPage />,
    editComponent: <EditCompanyDialNumberPage />,
    createComponent: <CreateCompanyDialNumberPage />,
  },
  {
    uri: URIs.CUSTOMER_COMPANIES,
    indexComponent: <CustomerCompaniesPage />,
    showComponent: <CustomerCompanyPage />,
    editComponent: <EditCustomerCompanyPage />,
    createComponent: <CreateCustomerCompanyPage />,
  },
  {
    uri: URIs.WORKER_PROFILES,
    indexComponent: <WorkerProfilesPage />,
    showComponent: <WorkerProfilePage />,
    editComponent: <EditWorkerProfilePage />,
    createComponent: <CreateWorkerProfilePage />,
  },
  {
    uri: URIs.CUSTOMER_PROFILES,
    indexComponent: <CustomerProfilesPage />,
    showComponent: <CustomerProfilePage />,
    editComponent: <EditCustomerProfilePage />,
    createComponent: <CreateCustomerProfilePage />,
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
