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
import { discard, GameStatus, start } from '../../store/reducers/gameSlice.ts'
import { Divider } from 'primereact/divider'
import History from '../History'

export default function Aside() {
    const dispatch = useAppDispatch()

    const selected = useAppSelector((state) => state.appearance.tiles)
    const gameStatus = useAppSelector((state) => state.game.gameStatus)

    const startButtonHandler = () => dispatch(start())
    const discardButtonHandler = () => dispatch(discard())

    return (
        <aside>
            <TabView>
                <TabPanel header="Game" leftIcon="pi pi-play mr">
                    <div className="tab-content">
                        {gameStatus === GameStatus.Started ? (
                            <Button
                                label="Discard game"
                                severity="danger"
                                onClick={discardButtonHandler}
                            ></Button>
                        ) : (
                            <Button
                                label="New game"
                                onClick={startButtonHandler}
                            />
                        )}
                    </div>
                </TabPanel>
                <TabPanel header="Settings" leftIcon="pi pi-cog mr">
                    <div className="tab-content">
                        <span>Board theme:</span>
                        <Dropdown
                            onChange={(e) => dispatch(setTilesTheme(e.value))}
                            options={tilesThemes}
                            optionLabel="name"
                            value={selected}
                        />
                        <Divider />
                        <span>Board view:</span>
                        <Button
                            label="Toggle"
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
