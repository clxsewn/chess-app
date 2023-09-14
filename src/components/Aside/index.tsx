import { TabPanel, TabView } from 'primereact/tabview'
import './styles.scss'
import { Dropdown } from 'primereact/dropdown'
import { setTilesTheme } from '../../slices/appearanceSlice.ts'
import tilesThemes from '../../boardThemes.ts'
import { useAppDispatch, useAppSelector } from '../../hooks.ts'
import { Button } from 'primereact/button'
import { start } from '../../slices/gameSlice.ts'

export default function Aside() {
    const selected = useAppSelector((state) => state.appearance.tiles)
    const dispatch = useAppDispatch()

    const startButtonHandler = () => {
        dispatch(start())
    }

    return (
        <aside>
            <TabView>
                <TabPanel header="Game">
                    <div className="tab-content">
                        <Button
                            label="Start game"
                            onClick={startButtonHandler}
                        />
                    </div>
                </TabPanel>
                <TabPanel header="Settings" leftIcon="pi pi-cog">
                    <div className="tab-content">
                        <Dropdown
                            onChange={(e) => dispatch(setTilesTheme(e.value))}
                            options={tilesThemes}
                            optionLabel="name"
                            value={selected}
                        />
                    </div>
                </TabPanel>
            </TabView>
        </aside>
    )
}
