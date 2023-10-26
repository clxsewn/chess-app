interface IPoses {
    [name: string]: (id: number) => boolean
}

export const rowLabelPoses: IPoses = {
    Left: (id: number) => id % 8 === 0,
    Right: (id: number) => id % 8 === 7,
    None: () => false,
}

export const rowLabelPosList = Object.keys(rowLabelPoses)
export type TRowLabelPos = keyof typeof rowLabelPoses

export const columnLabelPoses: IPoses = {
    Bottom: (id: number) => id > 55,
    Top: (id: number) => id < 8,
    None: () => false,
}

export const columnLabelPosList = Object.keys(columnLabelPoses)
export type TColumnLabelPos = keyof typeof columnLabelPoses
