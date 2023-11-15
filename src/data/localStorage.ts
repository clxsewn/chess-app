import {
    setColumnLabelPos,
    setRowLabelPos,
    setTilesTheme,
} from '../store/reducers/appearanceSlice.ts'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface LSRec {
    key: string
    actionCreator: ActionCreatorWithPayload<any>
}

export const LSRecords: LSRec[] = [
    {
        key: 'rowLabelPos',
        actionCreator: setRowLabelPos,
    },
    {
        key: 'columnLabelPos',
        actionCreator: setColumnLabelPos,
    },
    {
        key: 'tilesTheme',
        actionCreator: setTilesTheme,
    },
]
