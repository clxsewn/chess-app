import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board, TColor, TileID } from '../../types/Board.ts'
import {
    getPossibleMoves,
    isCheck,
    opposite,
    pieceNotation,
} from '../../utils.ts'

type TColorOrNull = TColor | null

interface Game {
    board: Board
    movesHistory: string[]
    selected: TileID | null
    possibleMoves: string[]
    turn: TColorOrNull
    gameStarted: boolean
    winner: TColorOrNull
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
    movesHistory: [],
    selected: null,
    possibleMoves: [],
    gameStarted: false,
    turn: null,
    winner: null,
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        select: (state, action: PayloadAction<TileID>) => {
            state.selected = action.payload
            state.possibleMoves = getPossibleMoves(state.board, action.payload)
        },

        unselect: (state) => {
            state.selected = null
            state.possibleMoves = []
        },

        move: (
            state,
            action: PayloadAction<{ from: TileID | 'selected'; to: TileID }>
        ) => {
            const { board, turn } = state
            const fromId =
                action.payload.from === 'selected'
                    ? state.selected
                    : action.payload.from

            if (fromId === null) return state

            const from = board[fromId]
            const toId = action.payload.to

            const boardCopy = { ...state.board }

            if (
                from &&
                fromId !== toId &&
                from?.color === turn &&
                state.gameStarted
            ) {
                const possibleMoves = getPossibleMoves(boardCopy, fromId)

                if (possibleMoves.includes(toId)) {
                    boardCopy[toId] = from
                    delete boardCopy[fromId]

                    if (!isCheck(turn, boardCopy)) {
                        // Move notation
                        let notation: string = toId
                        if (from?.piece !== 'pawn')
                            notation = pieceNotation[from.piece] + notation

                        if (toId in board) notation = notation + 'x'

                        state.movesHistory.push(notation)
                        state.board = boardCopy
                        state.turn = opposite(turn)
                    }
                }
                gameSlice.caseReducers.unselect(state)
            }
        },

        start: (state) => {
            state.turn = 'white'
            state.gameStarted = true
        },

        end: (state, action: PayloadAction<{ winner: TColor }>) => {
            gameSlice.caseReducers.unselect(state)

            state.turn = null
            state.movesHistory.push(
                action.payload.winner === 'white' ? '1-0' : '0-1'
            )
            state.winner = action.payload.winner
        },
    },
})

export const { select, unselect, move, start, end } = gameSlice.actions
export default gameSlice.reducer
