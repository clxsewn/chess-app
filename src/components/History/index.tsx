import { useAppSelector } from '../../hooks.ts'
import './styles.scss'

export default function History() {
    const history = useAppSelector((state) => state.game.movesHistory)

    return (
        <div className="history">
            {history.map((h) => (
                <div className="history-item" key={h.id}>
                    {h.move}
                </div>
            ))}
        </div>
    )
}
