import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import tilesThemes from '../../../../data/boardThemes.ts'
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

import './styles.scss'

export default function SettingsTab() {
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
            <div className="view-formatter">
                <span className="mr">Board theme:</span>
                <Dropdown
                    onChange={setTilesThemeHandler}
                    options={tilesThemes}
                    optionLabel="name"
                    value={tiles}
                />
            </div>
            <div className="divider" />
            <h3>View</h3>
            <div className="view-formatter">
                <span className="mr">Board view:</span>
                <Button
                    label="Toggle"
                    icon="pi pi-arrows-v"
                    onClick={toggleViewBoardHandle}
                />
            </div>
            <div className="divider" />
            <h3>Label positions</h3>
            <div className="view-formatter">
                <span className="mr">Row label:</span>
                <Dropdown
                    onChange={setRowLabelHandle}
                    options={Object.keys(rowLabelPoses)}
                    value={rowLabelPos}
                />
                <span className="mr">Column label:</span>
                <Dropdown
                    onChange={setColumnLabelHandle}
                    options={Object.keys(columnLabelPoses)}
                    value={columnLabelPos}
                />
            </div>
        </>
    )
}
