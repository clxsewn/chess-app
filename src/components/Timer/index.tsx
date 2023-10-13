import { useAppDispatch, useAppSelector } from '../../hooks.ts'
import { useState } from 'react'
import { useTimer } from 'react-timer-hook'
import { end } from '../../store/reducers/gameSlice.ts'
import { TColor } from '../../types/Board.ts'
import './styles.scss'
import { opposite } from '../../utils/helpers.ts'

export default function Timer({
    duration,
    forPlayer,
}: {
    duration: number
    forPlayer: TColor
}) {
    const dispatch = useAppDispatch()
    const turn = useAppSelector((state) => state.game.turn)

    const [currTurn, setCurrTurn] = useState<TColor | null>(null)

    const time = new Date()
    time.setSeconds(time.getSeconds() + duration)

    const { seconds, minutes, resume, pause } = useTimer({
        expiryTimestamp: time,
        autoStart: false,
        onExpire: () => {
            dispatch(end({ winner: opposite(forPlayer) }))
        },
    })

    if (currTurn !== turn) {
        if (turn === forPlayer) {
            resume()
        } else {
            pause()
        }
        setCurrTurn(turn)
    }

    const isActive = turn === forPlayer

    const activeClass = isActive ? ' active' : ''
    const animatedClass = seconds < 15 && isActive ? ' danger-time' : ''

    return (
        <div className={`timer ${forPlayer + activeClass + animatedClass}`}>
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
