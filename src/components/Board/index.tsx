import Tile from '../Tile'
import './styles.scss'
import { useAppSelector } from '../../hooks.ts'
import { useEffect, useRef } from 'react'
import { Toast } from 'primereact/toast'
import { isBlackTile } from '../../utils/helpers.ts'

export default function Board() {
    const boardRef = useRef<HTMLDivElement | null>(null)
    const toastCenter = useRef<Toast>(null)

    const { tiles, pieces, boardView } = useAppSelector(
        (state) => state.appearance
    )

    const { view } = boardView

    const { board, turn, selected, possibleMoves, lastMove, winner } =
        useAppSelector((state) => state.game)

    useEffect(() => {
        if (winner && toastCenter.current) {
            toastCenter.current.show({
                severity: 'info',
                summary: 'Game result',
                detail: `${winner} wins!`,
                life: 5000,
            })
        }
    }, [winner])

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
        <div
            className={`board${selected ? ' tile-selected' : ''}`}
            ref={boardRef}
        >
            {view.map((t, vID) => (
                <Tile
                    key={t}
                    id={t}
                    colors={
                        isBlackTile(t)
                            ? [tiles.theme.black, tiles.theme.white]
                            : [tiles.theme.white, tiles.theme.black]
                    }
                    piece={
                        t in board
                            ? pieces.theme[board[t]!.color][board[t]!.piece]
                            : undefined
                    }
                    movable={board[t]?.color === turn}
                    highlighted={
                        selected === t || lastMove[0] === t || lastMove[1] === t
                    }
                    highlightColor={tiles.theme.highlight}
                    possible={possibleMoves.includes(t)}
                    drawColumnLabel={vID > 55}
                    selected={t === selected}
                />
            ))}

            <Toast ref={toastCenter} position="center" />
        </div>
    )
}
