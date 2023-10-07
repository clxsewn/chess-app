import { DragEvent } from 'react'
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
    possible,
    drawColumnLabel,
}: {
    id: TileID
    colors: [Color, Color]
    piece?: string
    movable: boolean
    highlighted: boolean
    possible: boolean
    drawColumnLabel: boolean
}) {
    const dispatch = useAppDispatch()

    function dragStartHandler(e: DragEvent, id: TileID) {
        dispatch(select(id))
        e.dataTransfer.effectAllowed = 'linkMove'
        e.dataTransfer.clearData()
        e.dataTransfer.setData('startId', id)
    }

    function dragLeaveHandler(e: DragEvent) {
        e.preventDefault()
    }

    function dragEndHandler(e: DragEvent) {
        e.preventDefault()
    }

    function dragOverHandler(e: DragEvent) {
        e.preventDefault()
    }

    function dropHandler(e: DragEvent, id: TileID) {
        e.preventDefault()
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
            className={`tile`}
            style={{
                backgroundColor: highlighted ? '#ffc471' : colors[0],
                color: colors[1],
            }}
            onClick={() => onClickHandler(id)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, id)}
        >
            {id[0] === 'a' && <span className="str-symbol">{id[1]}</span>}
            {drawColumnLabel && <span className="col-symbol">{id[0]}</span>}
            {possible && (
                <div className={`possible ${piece ? 'capture' : ''}`}>
                    <div
                        className="inner"
                        style={{ backgroundColor: colors[0] }}
                    />
                </div>
            )}
            {piece && (
                <img
                    src={piece}
                    className="piece"
                    draggable={movable}
                    onDragStart={(e) => dragStartHandler(e, id)}
                />
            )}
        </div>
    )
}
