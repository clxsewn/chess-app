import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board } from '../types/Board.ts'
import { mov } from '../utils.ts'

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
    name: 'board',
    initialState: initialState,
    reducers: {
        move: (state, action: PayloadAction<{ from: string; to: string }>) => {
            const from = state[action.payload.from]
            const { from: fromId, to: toId } = action.payload

            // TODO: Move validation
            if (action.payload.from !== action.payload.to) {
                let possibleMoves = new Set<string>()
                const direction = from.color === 'white' ? 'up' : 'down'
                switch (from.piece) {
                    case 'pawn':
                        if (!(toId in state)) {
                            possibleMoves.add(mov(fromId, [direction]))
                            if (
                                ((fromId[1] === '2' &&
                                    from.color === 'white') ||
                                    (fromId[1] === '7' &&
                                        from.color === 'black')) &&
                                !(mov(fromId, [direction]) in state)
                            ) {
                                possibleMoves.add(
                                    mov(fromId, [direction, direction])
                                )
                            }
                        } else {
                            if (mov(fromId, [direction, 'left']) in state) {
                                possibleMoves.add(
                                    mov(fromId, [direction, 'left'])
                                )
                            }
                            if (mov(fromId, [direction, 'right']) in state) {
                                possibleMoves.add(
                                    mov(fromId, [direction, 'right'])
                                )
                            }
                        }

                        break

                    case 'rook':
                        break

                    case 'knight':
                        possibleMoves
                            .add(mov(fromId, ['up', 'up', 'left']))
                            .add(mov(fromId, ['up', 'up', 'right']))
                            .add(mov(fromId, ['right', 'right', 'up']))
                            .add(mov(fromId, ['right', 'right', 'down']))
                            .add(mov(fromId, ['down', 'down', 'right']))
                            .add(mov(fromId, ['down', 'down', 'left']))
                            .add(mov(fromId, ['left', 'left', 'down']))
                            .add(mov(fromId, ['left', 'left', 'up']))
                        break

                    case 'bishop':
                        break

                    case 'queen':
                        break

                    case 'king':
                        possibleMoves
                            .add(mov(fromId, ['up']))
                            .add(mov(fromId, ['up', 'right']))
                            .add(mov(fromId, ['right']))
                            .add(mov(fromId, ['right', 'down']))
                            .add(mov(fromId, ['down']))
                            .add(mov(fromId, ['down', 'left']))
                            .add(mov(fromId, ['left']))
                            .add(mov(fromId, ['left', 'up']))
                        break
                }

                possibleMoves = new Set(
                    [...possibleMoves].filter(
                        (m) =>
                            (!(m in state) || state[m].color !== from.color) &&
                            m[0] >= 'a' &&
                            m[0] <= 'h' &&
                            m[1] >= '1' &&
                            m[1] <= '8'
                    )
                )

                if (possibleMoves.has(toId)) {
                    state[toId] = from
                    delete state[fromId]
                }
            }
        },
    },
})

export const { move } = boardSlice.actions
export default boardSlice.reducer
