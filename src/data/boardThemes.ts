import { Colors, Themes } from '../types/Theme.ts'
import { Color } from '../types/Color.ts'

interface ColorsAndHighlights extends Colors<Color> {
    highlight: Color
}

export type IBoardThemes = Themes<ColorsAndHighlights>

export const tilesThemes: IBoardThemes = [
    {
        name: 'Green',
        theme: {
            black: '#779954',
            white: '#e9edcc',
            highlight: '#ffff51',
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
    {
        name: 'Brown',
        theme: {
            black: '#b88762',
            white: '#edd6b0',
            highlight: '#90e56c',
        },
    },
    {
        name: 'Sky',
        theme: {
            black: '#c4d8e4',
            white: '#f0f1f0',
            highlight: '#ece2d0',
        },
    },
    {
        name: '8-Bit',
        theme: {
            black: '#6a9b41',
            white: '#f3f3f4',
            highlight: '#ffff51',
        },
    },
]

export default tilesThemes
export const defaultBoardTheme = tilesThemes[0]
