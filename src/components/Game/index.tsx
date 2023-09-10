import Board from '../Board'
import Aside from '../Aside'
import './styles.scss'
import Timer from '../Timer'
import { useTimer } from 'react-timer-hook'

export default function Game() {
    const time = new Date()
    time.setSeconds(time.getSeconds() + 180) // 10 minutes timer
    const { seconds, minutes, resume } = useTimer({
        expiryTimestamp: time,
        autoStart: false,
        onExpire: () => {
            console.log('EXPIRED')
        },
    })

    return (
        <div className="game">
            <Board />
            <Aside />
            <Timer minutes={minutes} seconds={seconds} />
            <button onClick={resume}>Start game</button>
        </div>
    )
}
