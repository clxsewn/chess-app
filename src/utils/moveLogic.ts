import { Board, TColor, TileID, TTile } from '../types/Board.ts'
import { correctTileId, opposite } from './helpers.ts'

export type direction = 'up' | 'down' | 'left' | 'right'

// the board is assumed to be positioned
// so that the white pieces are at the bottom
export function mov(pos: TileID, moves: direction[]): TileID {
    const resultPos = moves.reduce((curPos: string, mv) => {
        switch (mv) {
            case 'up':
                return `${curPos[0]}${String.fromCharCode(
                    curPos.charCodeAt(1) + 1
                )}`
            case 'down':
                return `${curPos[0]}${String.fromCharCode(
                    curPos.charCodeAt(1) - 1
                )}`
            case 'left':
                return `${String.fromCharCode(curPos.charCodeAt(0) - 1)}${
                    curPos[1]
                }`
            case 'right':
                return `${String.fromCharCode(curPos.charCodeAt(0) + 1)}${
                    curPos[1]
                }`
        }
    }, pos)

    return correctTileId(resultPos) ? (resultPos as TileID) : pos
}

function repeat(pos: TileID, direction: direction[], board: Board): TileID[] {
    const returnArr: TileID[] = []
    let currentPos = pos

    const color = board[pos]?.color

    for (let i = 0; i < 8; i++) {
        currentPos = mov(currentPos, direction)
        if (correctTileId(currentPos)) {
            if (!(currentPos in board)) {
                returnArr.push(currentPos)
            } else if (board[currentPos]?.color !== color) {
                returnArr.push(currentPos)
                return returnArr
            } else return returnArr
        } else return returnArr
    }

    return returnArr
}

// this function returns the real possibleMoves with CHECK validation (using in logic)
function strictGetPossibleMoves(board: Board, id: TileID): TileID[] {
    const color = board[id]!.color
    const kingPos = getKingPos(color, board)

    const pm = getPossibleMoves(board, id)

    const boardCopy = { ...board }
    delete boardCopy[id]
    const strictPossibleMoves: TileID[] = []

    pm.forEach((m) => {
        boardCopy[m] = board[id]

        if (!isCheck(kingPos, boardCopy)) strictPossibleMoves.push(m)

        delete boardCopy[m]
    })

    return strictPossibleMoves
}

// this function does not validate check (using to show possible moves to user)
export function getPossibleMoves(board: Board, id: TileID): TileID[] {
    return [
        ...new Set(
            _getPossibleMoves(board, id).filter(
                (m) => !(m in board) || board[m]?.color !== board[id]?.color
            )
        ),
    ]
}

function _getPossibleMoves(board: Board, id: TileID): TileID[] {
    const { piece, color } = board[id]!
    const possibleMoves: TileID[] = []

    const forward = color === 'white' ? 'up' : 'down'
    switch (piece) {
        case 'pawn':
            if (!(mov(id, [forward]) in board)) {
                possibleMoves.push(mov(id, [forward]))
                if (
                    ((id[1] === '2' && color === 'white') ||
                        (id[1] === '7' && color === 'black')) &&
                    !(mov(id, [forward, forward]) in board)
                ) {
                    possibleMoves.push(mov(id, [forward, forward]))
                }
            }

            if (board[mov(id, [forward, 'left'])]?.color === opposite(color)) {
                possibleMoves.push(mov(id, [forward, 'left']))
            }

            if (board[mov(id, [forward, 'right'])]?.color === opposite(color)) {
                possibleMoves.push(mov(id, [forward, 'right']))
            }

            return possibleMoves

        case 'rook':
            return [
                ...repeat(id, ['up'], board),
                ...repeat(id, ['right'], board),
                ...repeat(id, ['down'], board),
                ...repeat(id, ['left'], board),
            ]

        case 'knight':
            return [
                mov(id, ['up', 'up', 'left']),
                mov(id, ['up', 'up', 'right']),
                mov(id, ['right', 'right', 'up']),
                mov(id, ['right', 'right', 'down']),
                mov(id, ['down', 'down', 'right']),
                mov(id, ['down', 'down', 'left']),
                mov(id, ['left', 'left', 'down']),
                mov(id, ['left', 'left', 'up']),
            ]

        case 'bishop':
            return [
                ...repeat(id, ['up', 'left'], board),
                ...repeat(id, ['up', 'right'], board),
                ...repeat(id, ['down', 'right'], board),
                ...repeat(id, ['down', 'left'], board),
            ]

        case 'queen':
            return [
                ...repeat(id, ['up'], board),
                ...repeat(id, ['right'], board),
                ...repeat(id, ['down'], board),
                ...repeat(id, ['left'], board),
                ...repeat(id, ['up', 'left'], board),
                ...repeat(id, ['up', 'right'], board),
                ...repeat(id, ['down', 'right'], board),
                ...repeat(id, ['down', 'left'], board),
            ]

        case 'king': {
            const mv = [
                mov(id, ['up']),
                mov(id, ['up', 'right']),
                mov(id, ['right']),
                mov(id, ['right', 'down']),
                mov(id, ['down']),
                mov(id, ['down', 'left']),
                mov(id, ['left']),
                mov(id, ['left', 'up']),
            ]

            const { color } = board[id]!
            const startKingPos = color === 'white' ? 'e1' : 'e8'

            // King is at starting position
            if (startKingPos === id) {
                // short castling
                if (
                    !(mov(id, ['right']) in board) &&
                    !(mov(id, ['right', 'right']) in board) &&
                    board[mov(id, ['right', 'right', 'right'])]?.piece ===
                        'rook'
                ) {
                    mv.push(mov(id, ['right', 'right']))
                }

                // long castling
                if (
                    !(mov(id, ['left']) in board) &&
                    !(mov(id, ['left', 'left']) in board) &&
                    !(mov(id, ['left', 'left', 'left']) in board) &&
                    board[mov(id, ['left', 'left', 'left', 'left'])]?.piece ===
                        'rook'
                ) {
                    mv.push(mov(id, ['left', 'left']))
                }
            }

            return mv
        }
    }
}

export function isCheck(kingPos: TileID, board: Board) {
    return Object.entries(board).some(([key, value]) => {
        return (
            value.color !== board[kingPos]?.color &&
            getPossibleMoves(board, key as TileID).includes(kingPos)
        )
    })
}

export function getKingPos(color: TColor, board: Board): TileID {
    return Object.entries(board).find(
        ([, v]) => v.piece === 'king' && v.color === color
    )![0] as TileID
}

export function isExistPossibleMove(moveFor: TColor, board: Board): boolean {
    return Object.entries(board).some(([key, value]) => {
        return (
            value.color === moveFor &&
            strictGetPossibleMoves(board, key as TileID).length
        )
    })
}

export function getMoveNotation(
    board: Board,
    from: TTile,
    toID: TileID,
    capture: boolean
): string {
    let notation: string = toID

    if (!from) return notation

    if (from.piece !== 'pawn') notation = pieceNotation[from.piece] + notation
    if (capture) notation = 'x' + notation
    if (isCheck(getKingPos(opposite(from.color), board), board))
        notation = notation + '+'

    return notation
}

const pieceNotation = {
    rook: 'R',
    knight: 'N',
    bishop: 'B',
    queen: 'Q',
    king: 'K',
}
