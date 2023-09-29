import Board from '../Board'
import Aside from '../Aside'
import './styles.scss'
import Timer from '../Timer'
import { useAppSelector } from '../../hooks.ts'
import { opposite } from '../../utils.ts'

export default function Game() {
    const bottomColor = useAppSelector(
        (state) => state.appearance.boardView.bottomColor
    )

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
