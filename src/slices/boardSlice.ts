import { createSlice } from '@reduxjs/toolkit'
import { Board } from '../types/Board.ts'

const initialState: Board = {
    // WHITE PLAYER
    a1: { piece: 'rook', color: 'white' },
    b1: { piece: 'knight', color: 'white' },
    c1: { piece: 'bishop', color: 'white' },
    d1: { piece: 'queen', color: 'white' },
    e1: { piece: 'king', color: 'white' },
    f1: { piece: 'bishop', color: 'white' },
    g1: { piece: 'knight', color: 'white' },
    h1: { piece: 'rook', color: 'white' },
    a2: { piece: 'pawn', color: 'white' },
    b2: { piece: 'pawn', color: 'white' },
    c2: { piece: 'pawn', color: 'white' },
    d2: { piece: 'pawn', color: 'white' },
    e2: { piece: 'pawn', color: 'white' },
    f2: { piece: 'pawn', color: 'white' },
    g2: { piece: 'pawn', color: 'white' },
    h2: { piece: 'pawn', color: 'white' },

    // BLACK PLAYER
    a8: { piece: 'rook', color: 'black' },
    b8: { piece: 'knight', color: 'black' },
    c8: { piece: 'bishop', color: 'black' },
    d8: { piece: 'queen', color: 'black' },
    e8: { piece: 'king', color: 'black' },
    f8: { piece: 'bishop', color: 'black' },
    g8: { piece: 'knight', color: 'black' },
    h8: { piece: 'rook', color: 'black' },
    a7: { piece: 'pawn', color: 'black' },
    b7: { piece: 'pawn', color: 'black' },
    c7: { piece: 'pawn', color: 'black' },
    d7: { piece: 'pawn', color: 'black' },
    e7: { piece: 'pawn', color: 'black' },
    f7: { piece: 'pawn', color: 'black' },
    g7: { piece: 'pawn', color: 'black' },
    h7: { piece: 'pawn', color: 'black' },
}

export const boardSlice = createSlice({
    name: 'appearance',
    initialState: initialState,
    reducers: {
        move: (state, action) => {
            // TODO: Move validation
            if (state[action.payload.to] === undefined) {
                state[action.payload.to] = { ...state[action.payload.from] }
                delete state[action.payload.from]
            }
        },
    },
})

export const { move } = boardSlice.actions
export default boardSlice.reducer
