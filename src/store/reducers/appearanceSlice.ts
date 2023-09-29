import { createSlice } from '@reduxjs/toolkit'
import { defaultBoardTheme } from '../../data/boardThemes.ts'
import { defaultPiecesTheme, piecesThemes } from '../../data/piecesThemes.ts'
import { defaultBoard, reversedBoard } from '../../data/board.ts'
import { TColor, TileID } from '../../types/Board.ts'

interface BoardView {
    name: 'Default' | 'Reversed'
    bottomColor: TColor
    view: TileID[]
}

const possibleViews: BoardView[] = [
    {
        name: 'Default',
        bottomColor: 'white',
        view: defaultBoard,
    },
    {
        name: 'Reversed',
        bottomColor: 'black',
        view: reversedBoard,
    },
]

export const appearanceSlice = createSlice({
    name: 'appearance',
    initialState: {
        boardView: possibleViews[0],
        tiles: defaultBoardTheme,
        pieces: defaultPiecesTheme,
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
    },
})

export const { setTilesTheme, setPiecesTheme, toggleBoardView } =
    appearanceSlice.actions
export default appearanceSlice.reducer
