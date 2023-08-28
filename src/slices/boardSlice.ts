import { createSlice } from '@reduxjs/toolkit'
import { Board } from '../types/Board.ts'

const initialState: Board = {
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
}

export const boardSlice = createSlice({
    name: 'appearance',
    initialState: initialState,
    reducers: {},
})

// export const {} = boardSlice.actions
export default boardSlice.reducer
