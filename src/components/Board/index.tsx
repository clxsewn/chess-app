import { useView } from '../../useView.ts'

import { CTile } from '../Tile'
import './styles.scss'

export default function Board() {
    const grid = useView()

    return (
        <div className="board">
            {grid.map((t) => (
                <CTile key={t} id={t} />
            ))}
        </div>
    )
}
