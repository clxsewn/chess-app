export type TPiece = 'p' | 'r' | 'n' | 'b' | 'q' | 'k'
export type TColor = 'w' | 'h'

export interface TTile {
    piece: TPiece
    color: TColor
}

export interface Board {
    [index: string]: TTile
}
