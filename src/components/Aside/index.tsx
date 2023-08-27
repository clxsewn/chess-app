import { TabPanel, TabView } from 'primereact/tabview'
import './styles.scss'

export default function Aside() {
    return (
        <aside>
            <TabView>
                <TabPanel header="Settings" leftIcon="pi pi-cog">
                    <div className="tab-content">
                        <p>Tab 1</p>
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
