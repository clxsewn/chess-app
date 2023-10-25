export const rowLabelPoses = {
    Left: (id: number) => id % 8 === 0,
    Right: (id: number) => id % 8 === 7,
    None: () => false,
}

export type TRowLabelPos = keyof typeof rowLabelPoses

export const columnLabelPoses = {
    Bottom: (id: number) => id > 55,
    Top: (id: number) => id < 8,
    None: () => false,
}

export type TColumnLabelPos = keyof typeof columnLabelPoses
