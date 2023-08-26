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
        name: 'default',
        colors: {
            black: '#779954',
            white: '#e9edcc',
        },
    },
]

export default boardThemes
export const defaultBoardTheme: boardTheme = boardThemes[0]
