import { useDispatch, useSelector } from 'react-redux'
import { setLoadingProgress } from '@redux/PageLoading/slice'
import { selectLoadingProgress } from '@redux/PageLoading/selectors'

export const StartPageLoading = () => {
	// const loadingProgress = useSelector(selectLoadingProgress)
	// const dispatch = useDispatch()

	// dispatch(setLoadingProgress(0))

	// const loading = async () => {
	// 	if (loadingProgress < 90) {
	// 		dispatch(setLoadingProgress(loadingProgress + 10))
	// 		await loading()
	// 	}
	// }

	// loading()
	return

	// let interval = null

	// while (true) {
	// 	interval = setInterval( async () => {
	// 		dispatch(setLoadingProgress(loadingProgress + 10))
	// 	}, 100)
	// }
	// return () => clearInterval(interval)
}
