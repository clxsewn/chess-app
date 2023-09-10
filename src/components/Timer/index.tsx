import { useTimer } from 'react-timer-hook'

export default function Timer({
    seconds,
    minutes,
}: {
    seconds: number
    minutes: number
}) {
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
