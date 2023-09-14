import { configureStore } from '@reduxjs/toolkit'
import appearanceReducer from './slices/appearanceSlice.ts'
import gameReducer from './slices/gameSlice.ts'

export const store = configureStore({
    reducer: {
        appearance: appearanceReducer,
        game: gameReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
