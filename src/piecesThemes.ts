import kw1 from './assets/piecesSet1/kw.svg'
import qw1 from './assets/piecesSet1/qw.svg'
import rw1 from './assets/piecesSet1/rw.svg'
import bw1 from './assets/piecesSet1/bw.svg'
import nw1 from './assets/piecesSet1/nw.svg'
import pw1 from './assets/piecesSet1/pw.svg'
import kb1 from './assets/piecesSet1/kb.svg'
import qb1 from './assets/piecesSet1/qb.svg'
import rb1 from './assets/piecesSet1/rb.svg'
import bb1 from './assets/piecesSet1/bb.svg'
import nb1 from './assets/piecesSet1/nb.svg'
import pb1 from './assets/piecesSet1/pb.svg'


export type SVGpath = string;

export interface piecesTheme {
    kingW: SVGpath,
    queenW: SVGpath,
    rookW: SVGpath,
    bishopW: SVGpath,
    knightW: SVGpath,
    pawnW: SVGpath,
    kingB: SVGpath,
    queenB: SVGpath,
    rookB: SVGpath,
    bishopB: SVGpath,
    knightB: SVGpath,
    pawnB: SVGpath,
}

export const piecesThemes: piecesTheme[] =
[
    {
        kingW: kw1,
        queenW: qw1,
        rookW: rw1,
        bishopW: bw1,
        knightW: nw1,
        pawnW: pw1,
        kingB: kb1,
        queenB: qb1,
        rookB: rb1,
        bishopB: bb1,
        knightB: nb1,
        pawnB: pb1,
    }
];

export default piecesThemes;
export const defaultPiecesTheme: piecesTheme = piecesThemes[0];
