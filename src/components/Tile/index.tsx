import { DragEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks.ts'
import { move, select, unselect } from '../../store/reducers/gameSlice.ts'
import './styles.scss'
import { TileID } from '../../types/Board.ts'
import { Color } from '../../types/Color.ts'

export default function Tile({
    id,
    colors,
    piece,
    movable,
    highlighted,
    highlightColor,
    possible,
    drawColumnLabel,
    selected,
}: {
    id: TileID
    colors: [Color, Color]
    piece?: string
    movable: boolean
    highlighted: boolean
    highlightColor: Color
    possible: boolean
    drawColumnLabel: boolean
    selected: boolean
}) {
    const [isMovingOver, setIsMovingOver] = useState(false)

    const dispatch = useAppDispatch()

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
    }

    function onClickHandler(id: TileID) {
        if (possible) {
            dispatch(move({ from: 'selected', to: id }))
        } else if (!movable) {
            dispatch(unselect())
        } else dispatch(select(id))
    }

    return (
        <div
            className={`tile${highlighted ? ' highlighted' : ''}`}
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
            {id[0] === 'a' && <span className="str-symbol">{id[1]}</span>}
            {drawColumnLabel && <span className="col-symbol">{id[0]}</span>}
            {possible && (
                <div
                    className={`possible ${piece ? 'capture' : ''}`}
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
                    className={`piece${selected ? ' selected' : ''}`}
                    draggable={movable}
                    onDragStart={(e) => dragStartHandler(e, id)}
                />
            )}
        </div>
    )
}
