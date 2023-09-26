import { TabPanel, TabView } from 'primereact/tabview'
import './styles.scss'
import { Dropdown } from 'primereact/dropdown'
import {
    setTilesTheme,
    toggleBoardView,
} from '../../store/reducers/appearanceSlice.ts'
import tilesThemes from '../../data/boardThemes.ts'
import { useAppDispatch, useAppSelector } from '../../hooks.ts'
import { Button } from 'primereact/button'
import { start } from '../../store/reducers/gameSlice.ts'
import { Divider } from 'primereact/divider'
import History from '../History'

export default function Aside() {
    const selected = useAppSelector((state) => state.appearance.tiles)
    const dispatch = useAppDispatch()

    const startButtonHandler = () => {
        dispatch(start())
    }

    return (
        <aside>
            <TabView>
                <TabPanel header="Game" leftIcon="pi pi-play mr">
                    <div className="tab-content">
                        <Button label="New game" onClick={startButtonHandler} />
                    </div>
                </TabPanel>
                <TabPanel header="Settings" leftIcon="pi pi-cog mr">
                    <div className="tab-content">
                        <Dropdown
                            onChange={(e) => dispatch(setTilesTheme(e.value))}
                            options={tilesThemes}
                            optionLabel="name"
                            value={selected}
                        />
                        <Divider />
                        <Button
                            label="Toggle view"
                            icon="pi pi-arrows-v"
                            onClick={() => dispatch(toggleBoardView())}
                        />
                    </div>
                </TabPanel>
                <TabPanel header="History" leftIcon="pi pi-clock mr">
                    <History />
                </TabPanel>
            </TabView>
        </aside>
    )
}
