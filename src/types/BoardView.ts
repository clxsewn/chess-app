import { TileID } from './Board.ts'

export interface IBoardView {
    name: 'Default' | 'Reversed'
    view: TileID[][]
}
