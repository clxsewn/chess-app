import kw1 from '../assets/piecesSet1/kw.svg'
import qw1 from '../assets/piecesSet1/qw.svg'
import rw1 from '../assets/piecesSet1/rw.svg'
import bw1 from '../assets/piecesSet1/bw.svg'
import nw1 from '../assets/piecesSet1/nw.svg'
import pw1 from '../assets/piecesSet1/pw.svg'
import kb1 from '../assets/piecesSet1/kb.svg'
import qb1 from '../assets/piecesSet1/qb.svg'
import rb1 from '../assets/piecesSet1/rb.svg'
import bb1 from '../assets/piecesSet1/bb.svg'
import nb1 from '../assets/piecesSet1/nb.svg'
import pb1 from '../assets/piecesSet1/pb.svg'
import { Colors, Themes } from '../types/Theme.ts'

export interface IPieces {
    king: string
    queen: string
    rook: string
    bishop: string
    knight: string
    pawn: string
}

export type IPiecesThemes = Themes<Colors<IPieces>>

export const piecesThemes: IPiecesThemes = [
    {
        name: 'Default',
        theme: {
            white: {
                king: kw1,
                queen: qw1,
                rook: rw1,
                bishop: bw1,
                knight: nw1,
                pawn: pw1,
            },
            black: {
                king: kb1,
                queen: qb1,
                rook: rb1,
                bishop: bb1,
                knight: nb1,
                pawn: pb1,
            },
        },
    },
]

export default piecesThemes
export const defaultPiecesTheme = piecesThemes[0]
