import Tile from '../Tile'
import './styles.scss'
import { isBlackTile } from '../../utils.ts'
import { useAppSelector, useView } from '../../hooks.ts'

export default function Board() {
    const grid = useView()

    const colors = useAppSelector((state) => state.appearance.tiles)
    const board = useAppSelector((state) => state.board)

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
                    piece={board[t] ? board[t] : null}
                />
            ))}
        </div>
    )
}
