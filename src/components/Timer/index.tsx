import { useAppDispatch, useAppSelector } from '../../hooks.ts'
import { useEffect } from 'react'
import { useTimer } from 'react-timer-hook'
import { end, GameResult } from '../../store/reducers/gameSlice.ts'
import { TColor } from '../../types/Board.ts'
import './styles.scss'
import { opposite } from '../../utils/helpers.ts'

function getGameResultPayload(winner: TColor) {
    return {
        result: winner === 'white' ? GameResult.WhiteWon : GameResult.BlackWon,
    }
}

export default function Timer({
    duration,
    forPlayer,
}: {
    duration: number
    forPlayer: TColor
}) {
    const dispatch = useAppDispatch()
    const turn = useAppSelector((state) => state.game.turn)

    const time = new Date()
    time.setSeconds(time.getSeconds() + duration)

    const { totalSeconds, seconds, minutes, resume, pause } = useTimer({
        expiryTimestamp: time,
        autoStart: false,
        onExpire: () => {
            dispatch(end(getGameResultPayload(opposite(forPlayer))))
        },
    })

    useEffect(() => {
        if (turn === forPlayer) resume()
        else pause()
    }, [turn])

    const isActive = turn === forPlayer
    const activeClass = isActive ? ' active' : ''
    const dangerTimeClass = totalSeconds < 15 && isActive ? ' danger-time' : ''

    return (
        <div className={`timer ${forPlayer + activeClass + dangerTimeClass}`}>
            <div>{isActive && <i className="pi pi-stopwatch"></i>}</div>
            <span className="time">
                <span className="digit">{Math.floor(minutes / 10)}</span>
                <span className="digit">{minutes % 10}</span>
                <span className="colon">:</span>
                <span className="digit">{Math.floor(seconds / 10)}</span>
                <span className="digit">{seconds % 10}</span>
            </span>
        </div>
    )
}
