export type Color = string;

export interface boardTheme {
    blackTile: Color,
    whiteTile: Color,
}

const boardThemes: boardTheme[] =
[
    {
        blackTile: '#779954',
        whiteTile: '#e9edcc',
    },
];

export default boardThemes;
export const defaultBoardTheme: boardTheme = boardThemes[0];
