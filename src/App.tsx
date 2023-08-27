import './App.css'
import { defaultPiecesTheme as dpt } from './piecesThemes.ts'
import Game from './components/Game'
import Theme from './components/Theme'

function App() {
    const pieces = Object.values(dpt)

    return (
        <Theme>
            {pieces.map((p) => (
                <img key={p} src={p} />
            ))}
            <Game />
        </Theme>
    )
}

export default App
