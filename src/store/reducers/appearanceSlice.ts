import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultBoardTheme, IBoardTheme } from '../../data/boardThemes.ts'
import {
    defaultPiecesTheme,
    IPieces,
    piecesThemes,
} from '../../data/piecesThemes.ts'
import { possibleViews } from '../../data/boardViews.ts'
import {
    columnLabelPoses,
    rowLabelPoses,
    TColumnLabelPos,
    TRowLabelPos,
} from '../../data/labelsPoses.ts'
import { IBoardView } from '../../types/BoardView.ts'
import { Colors, Theme } from '../../types/Theme.ts'
import { CSSProperties } from 'react'

export interface TLabelMargins {
    row: CSSProperties
    column: CSSProperties
}

interface TAppearance {
    boardView: IBoardView
    tiles: IBoardTheme
    pieces: Theme<Colors<IPieces>>
    rowLabelPos: TRowLabelPos
    columnLabelPos: TColumnLabelPos
}

const initialState: TAppearance = {
    boardView: possibleViews[0],
    tiles: defaultBoardTheme,
    pieces: defaultPiecesTheme,
    rowLabelPos: 'Left',
    columnLabelPos: 'Bottom',
}

export const appearanceSlice = createSlice({
    name: 'appearance',
    initialState: initialState,
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

        setRowLabelPos: (state, action: PayloadAction<TRowLabelPos>) => {
            if (rowLabelPoses[action.payload])
                state.rowLabelPos = action.payload
        },

        setColumnLabelPos: (state, action: PayloadAction<TColumnLabelPos>) => {
            if (columnLabelPoses[action.payload])
                state.columnLabelPos = action.payload
        },
    },
})

export const {
    setTilesTheme,
    toggleBoardView,
    setRowLabelPos,
    setColumnLabelPos,
} = appearanceSlice.actions
export default appearanceSlice.reducer
