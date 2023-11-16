import Tile from '../Tile'
import './styles.scss'
import { useAppSelector } from '../../hooks.ts'
import { useEffect, useRef } from 'react'
import { getLabelInnerPos, isBlackTile } from '../../utils/helpers.ts'
import { columnLabelPoses, rowLabelPoses } from '../../data/labelsPoses.ts'
import { useDispatch } from 'react-redux'
import { LSRecords } from '../../data/localStorage.ts'
import EndgameToast from '../EndgameToast'

const ASIDE_WIDTH = 330 // px

export default function Board() {
    const dispatch = useDispatch()
    const boardRef = useRef<HTMLDivElement | null>(null)

    const { tiles, pieces, boardView, rowLabelPos, columnLabelPos } =
        useAppSelector((state) => state.appearance)

    const labelMargins = getLabelInnerPos(rowLabelPos, columnLabelPos)

    const rh = rowLabelPoses[rowLabelPos]
    const ch = columnLabelPoses[columnLabelPos]

    const { view } = boardView

    const { board, turn, selected, possibleMoves, lastMove } = useAppSelector(
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
        } else _boardResize(ASIDE_WIDTH)
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

    useEffect(() => {
        LSRecords.forEach((r) => {
            const data = localStorage.getItem(r.key)
            if (data) dispatch(r.actionCreator(data))
        })
    })

    const selectedClass = selected ? ' tile-selected' : ''

    return (
        <div className={`board${selectedClass}`} ref={boardRef}>
            {view.map((v, rID) =>
                v.map((t, cID) => (
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
                            selected === t ||
                            lastMove[0] === t ||
                            lastMove[1] === t
                        }
                        highlightColor={tiles.theme.highlight}
                        possible={possibleMoves.includes(t)}
                        drawRowLabel={rh(cID)}
                        drawColumnLabel={ch(rID)}
                        selected={t === selected}
                        labelMargins={labelMargins}
                    />
                ))
            )}

            <EndgameToast />
        </div>
    )
}
