import { Themes } from '../types/Theme.ts'

export type IBoardThemes = Themes<string>

const tilesThemes: IBoardThemes = [
    {
        name: 'Default',
        theme: {
            black: '#779954',
            white: '#e9edcc',
        },
    },
    {
        name: 'Aqua',
        theme: {
            black: '#006699',
            white: '#99CCFF',
        },
    },
]

export default tilesThemes
export const defaultBoardTheme = tilesThemes[0]
