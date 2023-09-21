import Board from '../Board'
import Aside from '../Aside'
import './styles.scss'
import Timer from '../Timer'
import { Button } from 'primereact/button'
import { useAppDispatch } from '../../hooks.ts'
import { toggleBoardView } from '../../store/reducers/appearanceSlice.ts'

export default function Game() {
    const dispatch = useAppDispatch()

    return (
        <div className="game">
            <div className="board-wrapper">
                <Timer duration={20} forPlayer={'black'} />
                <Board />
                <Timer duration={20} forPlayer={'white'} />
            </div>
            <Aside />
            <Button onClick={() => dispatch(toggleBoardView())} />
        </div>
    )
}
