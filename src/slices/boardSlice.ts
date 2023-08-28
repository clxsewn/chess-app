import { createSlice } from '@reduxjs/toolkit'
import { Board } from '../types/Board.ts'

const initialState: Board = {
    // WHITE PLAYER
    a1: { piece: 'r', color: 'w' },
    b1: { piece: 'n', color: 'w' },
    c1: { piece: 'b', color: 'w' },
    d1: { piece: 'q', color: 'w' },
    e1: { piece: 'k', color: 'w' },
    f1: { piece: 'b', color: 'w' },
    g1: { piece: 'n', color: 'w' },
    h1: { piece: 'r', color: 'w' },
    a2: { piece: 'p', color: 'w' },
    b2: { piece: 'p', color: 'w' },
    c2: { piece: 'p', color: 'w' },
    d2: { piece: 'p', color: 'w' },
    e2: { piece: 'p', color: 'w' },
    f2: { piece: 'p', color: 'w' },
    g2: { piece: 'p', color: 'w' },
    h2: { piece: 'p', color: 'w' },

    // BLACK PLAYER
    a8: { piece: 'r', color: 'b' },
    b8: { piece: 'n', color: 'b' },
    c8: { piece: 'b', color: 'b' },
    d8: { piece: 'q', color: 'b' },
    e8: { piece: 'k', color: 'b' },
    f8: { piece: 'b', color: 'b' },
    g8: { piece: 'n', color: 'b' },
    h8: { piece: 'r', color: 'b' },
    a7: { piece: 'p', color: 'b' },
    b7: { piece: 'p', color: 'b' },
    c7: { piece: 'p', color: 'b' },
    d7: { piece: 'p', color: 'b' },
    e7: { piece: 'p', color: 'b' },
    f7: { piece: 'p', color: 'b' },
    g7: { piece: 'p', color: 'b' },
    h7: { piece: 'p', color: 'b' },
}

export const boardSlice = createSlice({
    name: 'appearance',
    initialState: initialState,
    reducers: {},
})

// export const {} = boardSlice.actions
export default boardSlice.reducer
