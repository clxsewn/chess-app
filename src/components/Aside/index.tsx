import { TabPanel, TabView } from 'primereact/tabview'
import './styles.scss'
import { Dropdown } from 'primereact/dropdown'
import { setTilesTheme } from '../../slices/appearanceSlice.ts'
import tilesThemes from '../../boardThemes.ts'
import { useAppDispatch, useAppSelector } from '../../hooks.ts'

export default function Aside() {
    const selected = useAppSelector((state) => state.appearance.tiles)
    const dispatch = useAppDispatch()

    return (
        <aside>
            <TabView>
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
                <TabPanel header="Tab 2">
                    <div className="tab-content">
                        <p>Tab 2</p>
                    </div>
                </TabPanel>
            </TabView>
        </aside>
    )
}
