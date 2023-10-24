import { FC } from 'react'
import { TabPanel, TabView } from 'primereact/tabview'
import './styles.scss'

import HistoryTab from './tabs/HistoryTab'
import GameTab from './tabs/Game'
import SettingsTab from './tabs/SettingsTab'

interface ITabItem {
    title: string
    component: FC
    icon: string
}

const tabsList: ITabItem[] = [
    {
        title: 'Game',
        component: GameTab,
        icon: 'pi-play',
    },
    {
        title: 'Settings',
        component: SettingsTab,
        icon: 'pi-cog',
    },
    {
        title: 'History',
        component: HistoryTab,
        icon: 'pi-clock',
    },
]

export default function Aside() {
    return (
        <aside>
            <TabView>
                {tabsList.map((i) => {
                    return (
                        <TabPanel
                            key={i.title}
                            header={i.title}
                            leftIcon={`pi ${i.icon} mr-6`}
                        >
                            <div className="tab-content">
                                <i.component />
                            </div>
                        </TabPanel>
                    )
                })}
            </TabView>
        </aside>
    )
}
