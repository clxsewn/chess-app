import { Board, TColor } from './types/Board.ts'

export function isBlackTile(id: string): boolean {
    return (id.charCodeAt(0) + parseInt(id[1])) % 2 === 0
}

export type direction = 'up' | 'down' | 'left' | 'right'

// the board is assumed to be positioned
// so that the white pieces are at the bottom
function mov(pos: string, moves: direction[]): string {
    return moves.reduce((curPos, mv) => {
        switch (mv) {
            case 'up':
                return `${curPos[0]}${parseInt(curPos[1]) + 1}`
            case 'down':
                return `${curPos[0]}${parseInt(curPos[1]) - 1}`
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
}

function repeat(pos: string, direction: direction[], state: Board): string[] {
    const returnArr: string[] = []
    let currentPos = pos

    const color = state[pos].color

    for (let i = 0; i < 8; i++) {
        currentPos = mov(currentPos, direction)
        if (correctTileId(currentPos)) {
            if (!(currentPos in state)) {
                returnArr.push(currentPos)
            } else if (state[currentPos].color !== color) {
                returnArr.push(currentPos)
                return returnArr
            } else return returnArr
        } else return returnArr
    }

    return returnArr
}

export function opposite(piece: TColor): TColor {
    return piece === 'white' ? 'black' : 'white'
}

export function correctTileId(id: string): boolean {
    return id[0] >= 'a' && id[0] <= 'h' && id[1] >= '1' && id[1] <= '8'
}

export function getPossibleMoves(board: Board, id: string, to: string) {
    const { piece, color } = board[id]
    const possibleMoves = []

    const direction = color === 'white' ? 'up' : 'down'
    switch (piece) {
        case 'pawn':
            if (!(to in board)) {
                possibleMoves.push(mov(id, [direction]))
                if (
                    ((id[1] === '2' && color === 'white') ||
                        (id[1] === '7' && color === 'black')) &&
                    !(mov(id, [direction]) in board)
                ) {
                    possibleMoves.push(mov(id, [direction, direction]))
                }
            } else {
                if (mov(id, [direction, 'left']) in board) {
                    possibleMoves.push(mov(id, [direction, 'left']))
                }
                if (mov(id, [direction, 'right']) in board) {
                    possibleMoves.push(mov(id, [direction, 'right']))
                }
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

        case 'king':
            return [
                mov(id, ['up']),
                mov(id, ['up', 'right']),
                mov(id, ['right']),
                mov(id, ['right', 'down']),
                mov(id, ['down']),
                mov(id, ['down', 'left']),
                mov(id, ['left']),
                mov(id, ['left', 'up']),
            ]
    }
}
