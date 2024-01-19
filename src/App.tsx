import React, { Suspense, lazy } from 'react'

import { Routes, Route } from 'react-router-dom'

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
	import('./pages/ProjectsPage').then(module => ({
		default: module.ProjectsPage,
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
