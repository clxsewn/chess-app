import { ILabelPos } from '../types/LabelPos.ts'

export const rowLabelPoses: ILabelPos[] = [
    {
        name: 'Left',
        handler: (id: number) => id % 8 === 0,
    },
    {
        name: 'Right',
        handler: (id: number) => id % 8 === 7,
    },
    {
        name: 'None',
        handler: () => false,
    },
]

export const columnLabelPoses: ILabelPos[] = [
    {
        name: 'Bottom',
        handler: (id: number) => id > 55,
    },
    {
        name: 'Top',
        handler: (id: number) => id < 8,
    },
    {
        name: 'None',
        handler: () => false,
    },
]
