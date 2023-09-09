import { useTimer } from 'react-timer-hook'

export default function Timer() {
    const time = new Date()
    time.setSeconds(time.getSeconds() + 60) // 10 minutes timer
    const { seconds, minutes } = useTimer({
        expiryTimestamp: time,
        onExpire: () => {
            console.log('EXPIRED')
        },
    })

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
