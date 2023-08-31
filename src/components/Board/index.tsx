import Tile from '../Tile'
import './styles.scss'
import { isBlackTile } from '../../utils.ts'
import { useAppSelector, useView } from '../../hooks.ts'

export default function Board() {
    const grid = useView()

    const { tiles, pieces } = useAppSelector((state) => state.appearance)
    const board = useAppSelector((state) => state.board)

    return (
        <div className="board">
            {grid.map((t) => (
                <Tile
                    key={t}
                    id={t}
                    colors={
                        isBlackTile(t)
                            ? [tiles.colors.black, tiles.colors.white]
                            : [tiles.colors.white, tiles.colors.black]
                    }
                    piece={
                        board[t]
                            ? pieces[board[t].color][board[t].piece]
                            : undefined
                    }
                />
            ))}
        </div>
    )
}
