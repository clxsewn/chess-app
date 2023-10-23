import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import tilesThemes from '../../../../data/boardThemes.ts'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import {
    columnLabelPoses,
    rowLabelPoses,
} from '../../../../data/labelsPoses.ts'
import { useAppDispatch, useAppSelector } from '../../../../hooks.ts'
import {
    setColumnLabelPos,
    setRowLabelPos,
    setTilesTheme,
    toggleBoardView,
} from '../../../../store/reducers/appearanceSlice.ts'

export default function Settings() {
    const dispatch = useAppDispatch()

    const { tiles, columnLabelPos, rowLabelPos } = useAppSelector(
        (state) => state.appearance
    )

    const setTilesThemeHandler = (e: DropdownChangeEvent) => {
        dispatch(setTilesTheme(e.value))
        localStorage.setItem('tilesTheme', e.value.name)
    }

    const setColumnLabelHandle = (e: DropdownChangeEvent) => {
        dispatch(setColumnLabelPos(e.value))
    }

    const setRowLabelHandle = (e: DropdownChangeEvent) => {
        dispatch(setRowLabelPos(e.value))
    }

    const toggleViewBoardHandle = () => {
        dispatch(toggleBoardView())
    }

    return (
        <>
            <h3>Theme</h3>
            <span className="mr">Board theme:</span>
            <Dropdown
                onChange={setTilesThemeHandler}
                options={tilesThemes}
                optionLabel="name"
                value={tiles}
            />
            <Divider />
            <h3>View</h3>
            <span className="mr">Board view:</span>
            <Button
                label="Toggle"
                icon="pi pi-arrows-v"
                onClick={toggleViewBoardHandle}
            />
            <Divider />
            <h3>Label positions</h3>
            <span className="mr">Row label:</span>
            <Dropdown
                onChange={setRowLabelHandle}
                options={rowLabelPoses}
                optionLabel="name"
                value={rowLabelPos}
            />
            <br />
            <span className="mr">Column label:</span>
            <Dropdown
                onChange={setColumnLabelHandle}
                options={columnLabelPoses}
                optionLabel="name"
                value={columnLabelPos}
            />
        </>
    )
}
