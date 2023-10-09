import { Themes } from '../types/Theme.ts'
import { Color } from '../types/Color.ts'

// export type IBoardThemes = Themes<Color>

// TEMPORARY TYPE
type IBoardTheme = {
    name: string
    theme: {
        black: Color
        white: Color
        highlight: Color
    }
}

export type IBoardThemes = IBoardTheme[]

export const tilesThemes: IBoardThemes = [
    {
        name: 'Default',
        theme: {
            black: '#779954',
            white: '#e9edcc',
            highlight: '#ffff00',
        },
    },
    {
        name: 'Aqua',
        theme: {
            black: '#006699',
            white: '#99CCFF',
            highlight: '#de3ab7',
        },
    },
]

export default tilesThemes
export const defaultBoardTheme = tilesThemes[0]
