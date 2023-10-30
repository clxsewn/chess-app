import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board, TColor, TileID } from '../../types/Board.ts'
import {
    getKingPos,
    getMoveNotation,
    getPossibleMoves,
    isCheck,
    isStalemate,
    strictGetPossibleMoves,
} from '../../utils/moveLogic.ts'
import { enPassant, opposite } from '../../utils/helpers.ts'

type TColorOrNull = TColor | null

export enum GameResult {
    WhiteWon,
    BlackWon,
    Draw,
}

interface IMove {
    id: number
    move: string
}

export enum GameStatus {
    Waiting,
    Started,
    Ended,
}

interface Game {
    board: Board
    id: number
    movesHistory: IMove[]
    selected: TileID | null
    possibleMoves: TileID[]
    lastMove: [TileID, TileID] | [null, null]
    turn: TColorOrNull
    gameStatus: GameStatus
    gameResult: GameResult | null
}

let moveCounter = 0

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
    id: -1,
    movesHistory: [],
    lastMove: [null, null],
    selected: null,
    possibleMoves: [],
    gameStatus: GameStatus.Waiting,
    turn: null,
    gameResult: null,
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        select: (state, action: PayloadAction<TileID>) => {
            state.selected = action.payload
            state.possibleMoves = strictGetPossibleMoves(
                state.board,
                action.payload
            )
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
                state.gameStatus === GameStatus.Started
            ) {
                const possibleMoves = getPossibleMoves(boardCopy, fromId)

                if (possibleMoves.includes(toId)) {
                    const capture = toId in boardCopy

                    if (enPassant(from, toId)) {
                        from.piece = 'queen'
                    }

                    boardCopy[toId] = from
                    delete boardCopy[fromId]

                    const notation = getMoveNotation(
                        boardCopy,
                        from,
                        toId,
                        capture
                    )

                    if (!isCheck(getKingPos(turn, boardCopy), boardCopy)) {
                        state.movesHistory.push({
                            id: moveCounter++,
                            move: notation,
                        })

                        state.lastMove = [fromId, toId]
                        state.board = boardCopy

                        if (isStalemate(opposite(turn), boardCopy)) {
                            gameSlice.caseReducers.end(state, {
                                payload: {
                                    result: GameResult.Draw,
                                },
                                type: '',
                            })

                            return state
                        }

                        state.turn = opposite(turn)
                    }
                }
            }
            gameSlice.caseReducers.unselect(state)
        },

        start: (state) => {
            return {
                ...initialState,
                turn: 'white',
                gameStatus: GameStatus.Started,
                id: state.id + 1,
            }
        },

        end: (state, action: PayloadAction<{ result: GameResult }>) => {
            gameSlice.caseReducers.unselect(state)

            const { result } = action.payload
            const endgameNotation =
                result === GameResult.WhiteWon
                    ? '1-0'
                    : result === GameResult.BlackWon
                    ? '0-1'
                    : '1-1'

            state.turn = null
            state.movesHistory.push({
                id: moveCounter++,
                move: endgameNotation,
            })
            state.gameStatus = GameStatus.Ended
            state.gameResult = result
        },

        discard: () => initialState,
    },
})

export const { select, unselect, move, start, end, discard } = gameSlice.actions
export default gameSlice.reducer
