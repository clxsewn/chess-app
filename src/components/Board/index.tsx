import Tile from '../Tile'
import './styles.scss'
import { isBlackTile } from '../../utils.ts'
import { useAppSelector, useView } from '../../hooks.ts'
import { useEffect, useRef } from 'react'

export default function Board() {
    const boardRef = useRef<HTMLDivElement | null>(null)
    const grid = useView()

    const { tiles, pieces } = useAppSelector((state) => state.appearance)
    const { board, turn, selected, possibleMoves } = useAppSelector(
        (state) => state.game
    )

    function _boardResize(asideWidth: number) {
        if (boardRef.current) {
            if (window.innerWidth - asideWidth > window.innerHeight - 120) {
                boardRef.current.style.height = window.innerHeight - 140 + 'px'
                boardRef.current.style.width = 'auto'
            } else {
                boardRef.current.style.height = 'auto'
                boardRef.current.style.width =
                    window.innerWidth - 20 - asideWidth + 'px'
            }
        }
    }

    function boardResize() {
        if (window.innerWidth < 980) {
            _boardResize(0)
        } else _boardResize(330)
    }

    useEffect(() => {
        if (boardRef.current) {
            boardResize()

            window.addEventListener('resize', boardResize)
        }
        return () => {
            window.removeEventListener('resize', boardResize)
        }
    })

    return (
        <div className="board" ref={boardRef}>
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
                    movable={board[t]?.color === turn}
                    selected={selected === t}
                    possible={possibleMoves.includes(t)}
                />
            ))}
        </div>
    )
}
