import { DragEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks.ts'
import { move, select, unselect } from '../../store/reducers/gameSlice.ts'
import './styles.scss'
import { TileID } from '../../types/Board.ts'
import { Color } from '../../types/Color.ts'
import { TLabelMargins } from '../../store/reducers/appearanceSlice.ts'
import useSound from 'use-sound'
import moveSfx from '../../assets/sounds/move-self.mp3'

export default function Tile({
    id,
    colors,
    piece,
    movable,
    highlighted,
    highlightColor,
    possible,
    drawRowLabel,
    drawColumnLabel,
    selected,
    labelMargins,
}: {
    id: TileID
    colors: [Color, Color]
    piece?: string
    movable: boolean
    highlighted: boolean
    highlightColor: Color
    possible: boolean
    drawRowLabel: boolean
    drawColumnLabel: boolean
    selected: boolean
    labelMargins: TLabelMargins
}) {
    const [isMovingOver, setIsMovingOver] = useState(false)

    const dispatch = useAppDispatch()

    const [play] = useSound(moveSfx)

    function dragStartHandler(e: DragEvent, id: TileID) {
        dispatch(select(id))
        e.dataTransfer.effectAllowed = 'linkMove'
        e.dataTransfer.clearData()
        e.dataTransfer.setData('startId', id)
    }

    function dragLeaveHandler(e: DragEvent) {
        e.preventDefault()
        setIsMovingOver(false)
    }

    function preventDefault(e: DragEvent) {
        e.preventDefault()
    }

    function dragEnterHandler(e: DragEvent) {
        e.preventDefault()
        setIsMovingOver(true)
    }

    function dropHandler(e: DragEvent, id: TileID) {
        e.preventDefault()
        setIsMovingOver(false)
        dispatch(
            move({ from: e.dataTransfer.getData('startId') as TileID, to: id })
        )
        play()
    }

    function onClickHandler(id: TileID) {
        if (possible) {
            dispatch(move({ from: 'selected', to: id }))
        } else if (!movable) {
            dispatch(unselect())
        } else dispatch(select(id))
    }

    const highlightedClass = highlighted ? ' highlighted' : ''
    const capturedClass = piece ? ' capture' : ''
    const selectedClass = selected ? ' selected' : ''

    return (
        <div
            className={`tile${highlightedClass}`}
            style={{
                backgroundColor: colors[0],
                color: colors[1],
            }}
            onClick={() => onClickHandler(id)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => preventDefault(e)}
            onDragOver={(e) => preventDefault(e)}
            onDragEnter={(e) => dragEnterHandler(e)}
            onDrop={(e) => dropHandler(e, id)}
        >
            {isMovingOver && <div className="moving-over-border" />}
            {highlighted && (
                <div
                    className="highlighted"
                    style={{ backgroundColor: highlightColor }}
                />
            )}
            {drawRowLabel && (
                <span className="str-symbol" style={labelMargins.row}>
                    {id[1]}
                </span>
            )}
            {drawColumnLabel && (
                <span className="col-symbol" style={labelMargins.column}>
                    {id[0]}
                </span>
            )}
            {possible && (
                <div
                    className={`possible${capturedClass}`}
                    style={{ backgroundColor: highlightColor }}
                >
                    <div
                        className="inner"
                        style={{ backgroundColor: colors[0] }}
                    />
                </div>
            )}
            {piece && (
                <img
                    src={piece}
                    className={`piece${selectedClass}`}
                    draggable={movable}
                    onDragStart={(e) => dragStartHandler(e, id)}
                />
            )}
        </div>
    )
}
