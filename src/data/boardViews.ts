import { IBoardView } from '../types/BoardView.ts'
import { TileID } from '../types/Board.ts'

const r1: TileID[] = ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
const r2: TileID[] = ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2']
const r3: TileID[] = ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3']
const r4: TileID[] = ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4']
const r5: TileID[] = ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5']
const r6: TileID[] = ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6']
const r7: TileID[] = ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7']
const r8: TileID[] = ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8']

export const possibleViews: IBoardView[] = [
    {
        name: 'Default',
        view: [r8, r7, r6, r5, r4, r3, r2, r1],
    },
    {
        name: 'Reversed',
        view: [r1, r2, r3, r4, r5, r6, r7, r8],
    },
]
