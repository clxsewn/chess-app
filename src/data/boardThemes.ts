import { Themes } from '../types/Theme.ts'
import { Color } from '../types/Color.ts'

export type IBoardThemes = Themes<Color>

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
