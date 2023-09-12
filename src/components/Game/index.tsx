import Board from '../Board'
import Aside from '../Aside'
import './styles.scss'
import Timer from '../Timer'
import { useTimer } from 'react-timer-hook'
import { useAppDispatch } from '../../hooks.ts'
import { start } from '../../slices/boardSlice.ts'

export default function Game() {
    const dispath = useAppDispatch()

    const time = new Date()
    time.setSeconds(time.getSeconds() + 180) // 10 minutes timer
    const { seconds, minutes, resume } = useTimer({
        expiryTimestamp: time,
        autoStart: false,
        onExpire: () => {
            console.log('EXPIRED')
        },
    })

    const startButtonHandler = () => {
        resume()
        dispath(start())
    }

    return (
        <div className="game">
            <Board />
            <Aside />
            <Timer minutes={minutes} seconds={seconds} />
            <button onClick={startButtonHandler}>Start game</button>
        </div>
    )
}
