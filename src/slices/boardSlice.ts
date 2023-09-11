import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board, TColor } from '../types/Board.ts'
import { getPossibleMoves, opposite } from '../utils.ts'

interface Game {
    board: Board
    turn: TColor
}

const initialState: Game = {
    board: {
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
    },
    turn: 'white',
}

export const boardSlice = createSlice({
    name: 'board',
    initialState: initialState,
    reducers: {
        move: (state, action: PayloadAction<{ from: string; to: string }>) => {
            const { board, turn } = state
            const from = board[action.payload.from]
            const { from: fromId, to: toId } = action.payload

            if (fromId !== toId && board[fromId].color === turn) {
                const possibleMoves = new Set(
                    getPossibleMoves(board, fromId, toId).filter(
                        (m) =>
                            (!(m in state) || board[m].color !== from.color) &&
                            m[0] >= 'a' &&
                            m[0] <= 'h' &&
                            m[1] >= '1' &&
                            m[1] <= '8'
                    )
                )

                if (possibleMoves.has(toId)) {
                    board[toId] = from
                    delete board[fromId]

                    state.turn = opposite(turn)
                }
            }
        },
    },
})

export const { move } = boardSlice.actions
export default boardSlice.reducer
