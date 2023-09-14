import { useAppDispatch, useAppSelector } from '../../hooks.ts'
import { useState } from 'react'
import { useTimer } from 'react-timer-hook'
import { end } from '../../slices/gameSlice.ts'
import { TColor } from '../../types/Board.ts'
import { opposite } from '../../utils.ts'

export default function Timer({
    duration,
    forPlayer,
}: {
    duration: number
    forPlayer: TColor
}) {
    const dispatch = useAppDispatch()
    const turn = useAppSelector((state) => state.game.turn)

    const [currTurn, setCurrTurn] = useState('none')

    const time = new Date()
    time.setSeconds(time.getSeconds() + duration)

    const { seconds, minutes, resume, pause } = useTimer({
        expiryTimestamp: time,
        autoStart: false,
        onExpire: () => {
            dispatch(end(opposite(forPlayer)))
            console.log(opposite(forPlayer), ' wins!')
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

    const secondsPrefix = seconds < 10 ? '0' : ''
    const minutePrefix = minutes < 10 ? '0' : ''

    return (
        <div>
            {minutePrefix}
            {minutes}:{secondsPrefix}
            {seconds}
        </div>
    )
}
