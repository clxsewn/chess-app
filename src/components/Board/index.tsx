import Tile from '../Tile'
import './styles.scss'
import { isBlackTile } from '../../utils.ts'
import { useAppSelector, useView } from '../../hooks.ts'

export default function Board() {
    const grid = useView()

    const colors = useAppSelector((state) => state.appearance.tiles)
    console.log(colors)

    return (
        <div className="board">
            {grid.map((t) => (
                <Tile
                    key={t}
                    id={t}
                    colors={
                        isBlackTile(t)
                            ? [colors.colors.black, colors.colors.white]
                            : [colors.colors.white, colors.colors.black]
                    }
                />
            ))}
        </div>
    )
}
