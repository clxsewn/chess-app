export interface ITimeVariant {
    title: string
    seconds: number
}

export const timeVariants: ITimeVariant[] = [
    {
        title: '1 min',
        seconds: 60,
    },
    {
        title: '3 min',
        seconds: 180,
    },
    {
        title: '5 min',
        seconds: 300,
    },
    {
        title: '10 min',
        seconds: 600,
    },
    {
        title: '30 min',
        seconds: 1800,
    },
]
