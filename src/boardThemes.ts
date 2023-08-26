export type Color = string

export interface boardTheme {
    name: string
    colors: {
        black: string
        white: string
    }
}

const boardThemes: boardTheme[] = [
    {
        name: 'Default',
        colors: {
            black: '#779954',
            white: '#e9edcc',
        },
    },
    {
        name: 'Mono',
        colors: {
            black: '#000',
            white: '#fff',
        },
    },
]

export default boardThemes
export const defaultBoardTheme: boardTheme = boardThemes[0]
