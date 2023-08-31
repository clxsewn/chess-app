import { IPieces, IPiecesTheme } from '../piecesThemes.ts'

export type TPiece = keyof IPieces
export type TColor = keyof IPiecesTheme

export interface TTile {
    piece: TPiece
    color: TColor
}

export interface Board {
    [index: string]: TTile
}
