import { TColor, TileID, TTile } from '../types/Board.ts'

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
