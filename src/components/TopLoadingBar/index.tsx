import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectPageIsLoaded } from '@redux/PageLoading/selectors'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'

import { useLocation } from 'react-router-dom'

export const TopLoadingBar: React.FC = () => {
	const loadingBarRef = useRef<LoadingBarRef>(null)
	const pageIsLoaded = useSelector(selectPageIsLoaded)

	const dispatch = useDispatch()

	const location = useLocation()
	const { pathname } = location

	console.log(loadingBarRef.current)

	useEffect(() => {
		loadingBarRef.current?.continuousStart()
	}, [pathname])

	useEffect(() => {
		if (pageIsLoaded) {
			// loadingBarRef.current?.complete()
			setTimeout(() => {
				loadingBarRef.current?.complete()
			}, 200)
			dispatch(setPageIsLoaded(false))
		}
	}, [pageIsLoaded])

	return (
		<LoadingBar
			color='rgba(115, 103, 240, 0.7)'
			// color='rgb(234, 84, 85)'
			// shadow={true}
			ref={loadingBarRef}
		/>
	)
}
