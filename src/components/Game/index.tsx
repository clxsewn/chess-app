import Board from '../Board'
import Aside from '../Aside'
import './styles.scss'
import Timer from '../Timer'
import { useAppSelector } from '../../hooks.ts'
import { opposite } from '../../utils.ts'

export default function Game() {
    const viewName = useAppSelector((state) => state.appearance.boardView.name)
    const bottomColor = viewName === 'Default' ? 'white' : 'black'

    return (
        <div className="game">
            <div className="board-wrapper">
                <Timer
                    duration={20}
                    key={opposite(bottomColor)}
                    forPlayer={opposite(bottomColor)}
                />
                <Board />
                <Timer
                    duration={20}
                    key={bottomColor}
                    forPlayer={bottomColor}
                />
            </div>
            <Aside />
        </div>
    )
}
