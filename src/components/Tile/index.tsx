import { DragEvent } from 'react'
import { useAppDispatch } from '../../hooks.ts'
import { move } from '../../slices/boardSlice.ts'
import './styles.scss'

export default function Tile({
    id,
    colors,
    piece,
}: {
    id: string
    colors: string[]
    piece?: string
}) {
    const dispatch = useAppDispatch()

    function dragStartHandler(e: DragEvent, id: string) {
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

    function dropHandler(e: DragEvent, id: string) {
        e.preventDefault()
        console.log(`${e.dataTransfer.getData('startId')} > ${id}`)
        dispatch(move({ from: e.dataTransfer.getData('startId'), to: id }))
    }

    return (
        <div
            className={`tile`}
            style={{ backgroundColor: colors[0], color: colors[1] }}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, id)}
        >
            {id[0] === 'a' && <span className="str-symbol">{id[1]}</span>}
            {id[1] === '1' && <span className="col-symbol">{id[0]}</span>}
            {piece && (
                <img
                    src={piece}
                    className="piece"
                    draggable={true}
                    onDragStart={(e) => dragStartHandler(e, id)}
                />
            )}
        </div>
    )
}
