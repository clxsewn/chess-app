import './styles.scss'

export default function Tile({
    id,
    className,
    colors,
}: {
    id: string
    className?: string
    colors: string[]
}) {
    return (
        <div
            className={`tile ${className}`}
            style={{ backgroundColor: colors[0], color: colors[1] }}
        >
            {id[0] === 'a' && <span className="str-symbol">{id[1]}</span>}
            {id[1] === '1' && <span className="col-symbol">{id[0]}</span>}
        </div>
    )
}
