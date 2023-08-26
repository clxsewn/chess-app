import './App.css'
import { defaultPiecesTheme as dpt } from './piecesThemes.ts'
import Board from './components/Board'
import Theme from './components/Theme'

function App() {
    const pieces = Object.values(dpt)

    return (
        <Theme>
            {pieces.map((p) => (
                <img key={p} src={p} />
            ))}
            <Board />
        </Theme>
    )
}

export default App
