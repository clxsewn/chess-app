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

export type SVGpath = string

export interface piecesTheme {
    kw: SVGpath
    qw: SVGpath
    rw: SVGpath
    bw: SVGpath
    nw: SVGpath
    pw: SVGpath
    kb: SVGpath
    qb: SVGpath
    rb: SVGpath
    bb: SVGpath
    nb: SVGpath
    pb: SVGpath
}

export const piecesThemes: piecesTheme[] = [
    {
        kw: kw1,
        qw: qw1,
        rw: rw1,
        bw: bw1,
        nw: nw1,
        pw: pw1,
        kb: kb1,
        qb: qb1,
        rb: rb1,
        bb: bb1,
        nb: nb1,
        pb: pb1,
    },
]

export default piecesThemes
export const defaultPiecesTheme: piecesTheme = piecesThemes[0]
