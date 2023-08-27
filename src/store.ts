import { configureStore } from '@reduxjs/toolkit'
import appearanceReducer from './slices/appearanceSlice.ts'

export const store = configureStore({
    reducer: {
        appearance: appearanceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
