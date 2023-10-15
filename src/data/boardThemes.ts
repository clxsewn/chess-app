import { Colors, Themes } from '../types/Theme.ts'
import { Color } from '../types/Color.ts'

interface ColorsAndHighlights extends Colors<Color> {
    highlight: Color
}

export type IBoardThemes = Themes<ColorsAndHighlights>

export const tilesThemes: IBoardThemes = [
    {
        name: 'Default',
        theme: {
            black: '#779954',
            white: '#e9edcc',
            highlight: '#ffff3f',
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
