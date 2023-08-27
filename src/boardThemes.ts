export type Color = string

export interface tilesTheme {
    name: string
    colors: {
        black: string
        white: string
    }
}

const tilesThemes: tilesTheme[] = [
    {
        name: 'Default',
        colors: {
            black: '#779954',
            white: '#e9edcc',
        },
    },
    {
        name: 'Aqua',
        colors: {
            black: 'rgb(0, 102, 153)',
            white: 'rgb(153, 204, 255)',
        },
    },
]

export default tilesThemes
export const defaultBoardTheme: tilesTheme = tilesThemes[0]
