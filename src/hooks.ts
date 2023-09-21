import { AppDispatch, RootState } from './store/store.ts'
import { TypedUseSelectorHook } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
