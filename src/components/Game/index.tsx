import Board from '../Board'
import Aside from '../Aside'
import './styles.scss'
import Timer from '../Timer'

export default function Game() {
    return (
        <div className="game">
            <Board />
            <Aside />
            <Timer />
        </div>
    )
}
