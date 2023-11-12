import Board from '../Board'
import Aside from '../Aside'
import './styles.scss'
import Timer from '../Timer'
import { useAppSelector } from '../../hooks.ts'
import { opposite } from '../../utils/helpers.ts'

export default function Game() {
    const viewName = useAppSelector((state) => state.appearance.boardView.name)
    const { id } = useAppSelector((state) => state.game)
    const { seconds } = useAppSelector((state) => state.game.initialTime)
    const bottomColor = viewName === 'Default' ? 'white' : 'black'

    return (
        <div className="game">
            <div className="board-wrapper">
                <Timer
                    duration={seconds}
                    key={`${opposite(bottomColor)}${id}${seconds}`}
                    forPlayer={opposite(bottomColor)}
                />
                <Board />
                <Timer
                    duration={seconds}
                    key={`${bottomColor}${id}${seconds}`}
                    forPlayer={bottomColor}
                />
            </div>
            <Aside />
        </div>
    )
}
