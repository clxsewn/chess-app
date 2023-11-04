import { TColor, TileID, TTile } from '../types/Board.ts'
import { TLabelMargins } from '../store/reducers/appearanceSlice.ts'
import {
    bottomLeft,
    bottomRight,
    TColumnLabelPos,
    topLeft,
    topRight,
    TRowLabelPos,
} from '../data/labelsPoses.ts'

export function isBlackTile(id: string): boolean {
    return (id.charCodeAt(0) + parseInt(id[1])) % 2 === 0
}

export function opposite(piece: TColor): TColor {
    return piece === 'white' ? 'black' : 'white'
}

export function correctTileId(id: string): boolean {
    return id[0] >= 'a' && id[0] <= 'h' && id[1] >= '1' && id[1] <= '8'
}

export function enPassant(tile: TTile, toId: TileID): boolean {
    return (
        tile.piece === 'pawn' &&
        ((tile.color === 'white' && toId[1] === '8') ||
            (tile.color === 'black' && toId[1] === '1'))
    )
}

export function getLabelInnerPos(
    rlp: TRowLabelPos,
    clp: TColumnLabelPos
): TLabelMargins {
    if (rlp === 'Left') {
        if (clp === 'Top') {
            return {
                column: topRight,
                row: bottomLeft,
            }
        } else if (clp === 'Bottom') {
            return {
                column: bottomRight,
                row: topLeft,
            }
        } else if (clp === 'None') {
            return {
                row: topLeft,
                column: {},
            }
        }
    } else if (rlp === 'Right') {
        if (clp === 'Top') {
            return {
                column: topLeft,
                row: bottomRight,
            }
        } else if (clp === 'Bottom') {
            return {
                column: bottomLeft,
                row: topRight,
            }
        } else if (clp === 'None') {
            return {
                row: topRight,
                column: {},
            }
        }
    } else if (rlp === 'None') {
        if (clp === 'Top') {
            return {
                column: topLeft,
                row: {},
            }
        } else if (clp === 'Bottom') {
            return {
                column: bottomLeft,
                row: {},
            }
        } else if (clp === 'None') {
            return {
                row: {},
                column: {},
            }
        }
    } else
        return {
            row: {},
            column: {},
        }
}
