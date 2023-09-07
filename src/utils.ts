import { Board, TColor } from './types/Board.ts'

export function isBlackTile(id: string): boolean {
    return (id.charCodeAt(0) + parseInt(id[1])) % 2 === 0
}

export type direction = 'up' | 'down' | 'left' | 'right'

// the board is assumed to be positioned
// so that the white pieces are at the bottom
export function mov(pos: string, moves: direction[]): string {
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

export function repeat(
    pos: string,
    direction: direction[],
    state: Board
): string[] {
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
