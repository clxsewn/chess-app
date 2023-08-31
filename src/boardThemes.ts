export type Color = string

export interface tilesTheme {
    name: string
    colors: {
        black: Color
        white: Color
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
            black: '#006699',
            white: '#99CCFF',
        },
    },
]

export default tilesThemes
export const defaultBoardTheme: tilesTheme = tilesThemes[0]
