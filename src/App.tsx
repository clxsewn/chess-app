import Game from './components/Game'
import { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import Aside from './components/Aside'

function App() {
    const [sbVisible, setSbVisible] = useState(false)

    return (
        <>
            <Game />
            <Button
                id="menu-button"
                icon="pi pi-bars"
                onClick={() => setSbVisible(true)}
            />
            <Sidebar visible={sbVisible} onHide={() => setSbVisible(false)}>
                <Aside />
            </Sidebar>
        </>
    )
}

export default App
