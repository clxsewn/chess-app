import { createSlice } from '@reduxjs/toolkit'
import { defaultBoardTheme } from '../boardThemes.ts'
import { defaultPiecesTheme, piecesThemes } from '../piecesThemes.ts'

export const appearanceSlice = createSlice({
    name: 'appearance',
    initialState: {
        tiles: defaultBoardTheme,
        pieces: defaultPiecesTheme,
    },
    reducers: {
        setTilesTheme: (state, action) => {
            state.tiles = action.payload
        },
        setPiecesTheme: (state, action) => {
            state.pieces = piecesThemes[action.payload.id]
        },
    },
})

export const { setTilesTheme, setPiecesTheme } = appearanceSlice.actions
export default appearanceSlice.reducer
