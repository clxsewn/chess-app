import { TabPanel, TabView } from 'primereact/tabview'
import './styles.scss'

import History from './tabs/History'
import Game from './tabs/Game'
import Settings from './tabs/Settings'

export default function Aside() {
    return (
        <aside>
            <TabView>
                <TabPanel header="Game" leftIcon="pi pi-play mr-6">
                    <div className="tab-content">
                        <Game />
                    </div>
                </TabPanel>
                <TabPanel header="Settings" leftIcon="pi pi-cog mr-6">
                    <div className="tab-content">
                        <Settings />
                    </div>
                </TabPanel>
                <TabPanel header="History" leftIcon="pi pi-clock mr-6">
                    <div className="tab-content">
                        <History />
                    </div>
                </TabPanel>
            </TabView>
        </aside>
    )
}
