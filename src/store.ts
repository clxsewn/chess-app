import { configureStore } from '@reduxjs/toolkit'
import appearanceReducer from './slices/appearanceSlice.ts'
import boardReducer from './slices/boardSlice.ts'

export const store = configureStore({
    reducer: {
        appearance: appearanceReducer,
        board: boardReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
