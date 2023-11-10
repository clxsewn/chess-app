import Board from '../Board'
import Aside from '../Aside'
import './styles.scss'
import Timer from '../Timer'
import { useAppSelector } from '../../hooks.ts'
import { opposite } from '../../utils/helpers.ts'

export default function Game() {
    const viewName = useAppSelector((state) => state.appearance.boardView.name)
    const { id, initialTime } = useAppSelector((state) => state.game)
    const bottomColor = viewName === 'Default' ? 'white' : 'black'

    return (
        <div className="game">
            <div className="board-wrapper">
                <Timer
                    duration={initialTime}
                    key={`${opposite(bottomColor)}${id}${initialTime}`}
                    forPlayer={opposite(bottomColor)}
                />
                <Board />
                <Timer
                    duration={initialTime}
                    key={`${bottomColor}${id}${initialTime}`}
                    forPlayer={bottomColor}
                />
            </div>
            <Aside />
        </div>
    )
}
