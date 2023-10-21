import { TileID } from './Board.ts'

export interface ILabelPos {
    name: string
    handler: (id: number) => boolean
}
