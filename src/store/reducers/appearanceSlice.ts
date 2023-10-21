import { createSlice } from '@reduxjs/toolkit'
import { defaultBoardTheme } from '../../data/boardThemes.ts'
import { defaultPiecesTheme, piecesThemes } from '../../data/piecesThemes.ts'
import { possibleViews } from '../../data/boardViews.ts'
import { columnLabelPoses, rowLabelPoses } from '../../data/labelsPoses.ts'

export const appearanceSlice = createSlice({
    name: 'appearance',
    initialState: {
        boardView: possibleViews[0],
        tiles: defaultBoardTheme,
        pieces: defaultPiecesTheme,
        rowLabelPos: rowLabelPoses[0],
        columnLabelPos: columnLabelPoses[0],
    },
    reducers: {
        toggleBoardView: (state) => {
            state.boardView =
                state.boardView.name === 'Default'
                    ? possibleViews[1]
                    : possibleViews[0]
        },
        setTilesTheme: (state, action) => {
            state.tiles = action.payload
        },
        setPiecesTheme: (state, action) => {
            state.pieces = piecesThemes[action.payload.id]
        },
        setRowLabelPos: (state, action) => {
            state.rowLabelPos = action.payload
        },
        setColumnLabelPos: (state, action) => {
            state.columnLabelPos = action.payload
        },
    },
})

export const {
    setTilesTheme,
    setPiecesTheme,
    toggleBoardView,
    setRowLabelPos,
    setColumnLabelPos,
} = appearanceSlice.actions
export default appearanceSlice.reducer
