import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board, TColor } from '../types/Board.ts'
import { getPossibleMoves, opposite } from '../utils.ts'

type TColorOrNone = TColor | 'none'

interface Game {
    board: Board
    selected: string
    possibleMoves: string[]
    turn: TColorOrNone
    gameStarted: boolean
    winner: TColorOrNone
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
    selected: 'none',
    possibleMoves: [],
    gameStarted: false,
    turn: 'none',
    winner: 'none',
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        select: (state, action: PayloadAction<string>) => {
            state.selected = action.payload
            state.possibleMoves = getPossibleMoves(state.board, action.payload)
        },
        unselect: (state) => {
            state.selected = 'none'
            state.possibleMoves = []
        },
        move: (state, action: PayloadAction<{ from: string; to: string }>) => {
            const { board, turn } = state
            const fromId =
                action.payload.from === 'selected'
                    ? state.selected
                    : action.payload.from

            if (fromId === 'none') return state

            const from = board[fromId]
            const toId = action.payload.to

            if (
                fromId !== toId &&
                board[fromId].color === turn &&
                state.gameStarted
            ) {
                const possibleMoves = getPossibleMoves(board, fromId)

                if (possibleMoves.includes(toId)) {
                    board[toId] = from
                    delete board[fromId]

                    state.turn = opposite(turn)
                }
                gameSlice.caseReducers.unselect(state)
            }
        },
        start: (state) => {
            state.turn = 'white'
            state.gameStarted = true
        },
        end: (state, action: PayloadAction<TColor>) => {
            gameSlice.caseReducers.unselect(state)
            state.turn = 'none'
            state.winner = action.payload
        },
    },
})

export const { select, unselect, move, start, end } = gameSlice.actions
export default gameSlice.reducer
