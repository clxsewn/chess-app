import './App.css'
import {defaultPiecesTheme as dpt} from './piecesThemes.ts'

function App() {

    const pieces = Object.keys(dpt)

  return (
    <>
        { pieces.map((p) => <img key={p} src={dpt[p]} />) }
    </>
  )
}

export default App
