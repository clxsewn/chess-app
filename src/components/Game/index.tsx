import Board from '../Board'
import Aside from '../Aside'
import './styles.scss'
import Timer from '../Timer'

export default function Game() {
    return (
        <div className="game">
            <Timer duration={5} forPlayer={'black'} />
            <Board />
            <Timer duration={5} forPlayer={'white'} />
            <Aside />
        </div>
    )
}
