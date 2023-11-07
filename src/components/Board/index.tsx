import Tile from '../Tile'
import './styles.scss'
import { useAppSelector } from '../../hooks.ts'
import { useEffect, useRef } from 'react'
import { Toast } from 'primereact/toast'
import { getLabelInnerPos, isBlackTile } from '../../utils/helpers.ts'
import { columnLabelPoses, rowLabelPoses } from '../../data/labelsPoses.ts'
import { useDispatch } from 'react-redux'
import {
    setColumnLabelPos,
    setRowLabelPos,
    setTilesTheme,
} from '../../store/reducers/appearanceSlice.ts'
import tilesThemes from '../../data/boardThemes.ts'
import { GameResult } from '../../store/reducers/gameSlice.ts'

const ASIDE_WIDTH = 330 // px

export default function Board() {
    const dispatch = useDispatch()
    const boardRef = useRef<HTMLDivElement | null>(null)
    const toastCenter = useRef<Toast>(null)

    const { tiles, pieces, boardView, rowLabelPos, columnLabelPos } =
        useAppSelector((state) => state.appearance)

    const labelMargins = getLabelInnerPos(rowLabelPos, columnLabelPos)

    const [rh, ch] = [
        rowLabelPoses[rowLabelPos],
        columnLabelPoses[columnLabelPos],
    ]

    const { view } = boardView

    const { board, turn, selected, possibleMoves, lastMove, gameResult } =
        useAppSelector((state) => state.game)

    useEffect(() => {
        if (gameResult !== null && toastCenter.current) {
            const detail =
                gameResult === GameResult.WhiteWon
                    ? 'White wins!'
                    : gameResult === GameResult.BlackWon
                    ? 'Black wins!'
                    : 'Draw'

            toastCenter.current.show({
                severity: 'info',
                summary: 'Game result',
                detail: detail,
                life: 5000,
            })
        }
    }, [gameResult])

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
        const rowLabelPos = localStorage.getItem('rowLabelPos')
        if (rowLabelPos) dispatch(setRowLabelPos(rowLabelPos))

        const columnLabelPos = localStorage.getItem('columnLabelPos')
        if (columnLabelPos) dispatch(setColumnLabelPos(columnLabelPos))

        const tilesTheme = localStorage.getItem('tilesTheme')
        if (tilesTheme) {
            dispatch(
                setTilesTheme(tilesThemes.find((t) => t.name === tilesTheme))
            )
        }
    })

    const selectedClass = selected ? ' tile-selected' : ''

    return (
        <div className={`board${selectedClass}`} ref={boardRef}>
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
                    drawRowLabel={rh(vID)}
                    drawColumnLabel={ch(vID)}
                    selected={t === selected}
                    labelMargins={labelMargins}
                />
            ))}

            <Toast ref={toastCenter} position="center" />
        </div>
    )
}
