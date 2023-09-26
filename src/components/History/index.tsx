import { useAppSelector } from '../../hooks.ts'

export default function History() {
    const history = useAppSelector((state) => state.game.movesHistory)
    console.log(history)

    return (
        <div>
            {history.map((h) => (
                <div>{h}</div>
            ))}
        </div>
    )
}
