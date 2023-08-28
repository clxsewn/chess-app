import './styles.scss'
import { piecesTheme } from '../../piecesThemes.ts'

export default function Tile({
    id,
    colors,
    piece,
}: {
    id: string
    colors: string[]
    piece?: string
}) {
    return (
        <div
            className={`tile`}
            style={{ backgroundColor: colors[0], color: colors[1] }}
        >
            {id[0] === 'a' && <span className="str-symbol">{id[1]}</span>}
            {id[1] === '1' && <span className="col-symbol">{id[0]}</span>}
            {piece && <img src={piece} className="piece" draggable={false} />}
        </div>
    )
}
