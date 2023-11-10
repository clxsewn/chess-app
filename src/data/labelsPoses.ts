import { CSSProperties } from 'react'

interface IPoses {
    [name: string]: (id: number) => boolean
}

export const rowLabelPoses: IPoses = {
    Left: (columnID: number) => columnID === 0,
    Right: (columnID: number) => columnID === 7,
    None: () => false,
}

export const rowLabelPosList = Object.keys(rowLabelPoses)
export type TRowLabelPos = keyof typeof rowLabelPoses

export const columnLabelPoses: IPoses = {
    Top: (rowID: number) => rowID === 0,
    Bottom: (rowID: number) => rowID === 7,
    None: () => false,
}

export const columnLabelPosList = Object.keys(columnLabelPoses)
export type TColumnLabelPos = keyof typeof columnLabelPoses

export const topLeft: CSSProperties = {
    top: '10%',
    left: '10%',
    bottom: 'auto',
    right: 'auto',
}

export const topRight: CSSProperties = {
    top: '10%',
    right: '10%',
    bottom: 'auto',
    left: 'auto',
}

export const bottomRight: CSSProperties = {
    bottom: '10%',
    right: '10%',
    top: 'auto',
    left: 'auto',
}

export const bottomLeft: CSSProperties = {
    bottom: '10%',
    left: '10%',
    top: 'auto',
    right: 'auto',
}
