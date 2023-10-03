import { useAppDispatch, useAppSelector } from '../../hooks.ts'
import { useState } from 'react'
import { useTimer } from 'react-timer-hook'
import { end } from '../../store/reducers/gameSlice.ts'
import { TColor } from '../../types/Board.ts'
import { opposite } from '../../utils.ts'
import './styles.scss'

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

    let animatedClass = ''
    if (currTurn !== turn) {
        if (turn === forPlayer) {
            resume()
            if (seconds < 15) animatedClass = 'danger-time'
        } else {
            pause()
            animatedClass = ''
        }
        setCurrTurn(turn)
    }

    return (
        <div
            className={`timer ${forPlayer} ${animatedClass}`}
            style={{ backgroundColor: forPlayer }}
        >
            <i className="pi pi-stopwatch"></i>
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
