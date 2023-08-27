import Board from '../Board'
import Aside from '../Aside'
import './styles.scss'

export default function Game() {
    return (
        <div className="game">
            <Board />
            <Aside />
        </div>
    )
}
