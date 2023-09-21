import { configureStore } from '@reduxjs/toolkit'
import appearanceReducer from './reducers/appearanceSlice.ts'
import gameReducer from './reducers/gameSlice.ts'

export const store = configureStore({
    reducer: {
        appearance: appearanceReducer,
        game: gameReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
