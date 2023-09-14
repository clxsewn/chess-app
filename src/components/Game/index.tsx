import Board from '../Board'
import Aside from '../Aside'
import './styles.scss'
import Timer from '../Timer'
import { start } from '../../slices/gameSlice.ts'
import { useAppDispatch } from '../../hooks.ts'

export default function Game() {
    const dispath = useAppDispatch()
    const startButtonHandler = () => {
        dispath(start())
    }

    return (
        <div className="game">
            <Board />
            <Timer duration={5} forPlayer={'white'} />
            <Timer duration={5} forPlayer={'black'} />
            <Aside />
            <button onClick={startButtonHandler}>Start game</button>
        </div>
    )
}
