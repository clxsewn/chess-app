import Board from '../Board'
import Aside from '../Aside'
import './styles.scss'
import Timer from '../Timer'

export default function Game() {
    return (
        <div className="game">
            <div className="board-wrapper">
                <Timer duration={20} forPlayer={'black'} />
                <Board />
                <Timer duration={20} forPlayer={'white'} />
            </div>
            <Aside key={'aside1'} />
        </div>
    )
}
