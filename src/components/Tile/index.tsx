import './styles.scss'
import styled from 'styled-components'

export const CTile = styled(Tile)`
    background-color: ${(props) =>
        props.type === 'white'
            ? props.theme.colors.white
            : props.theme.colors.black};

    color: ${(props) =>
        props.type === 'white'
            ? props.theme.colors.black
            : props.theme.colors.white};
`

export default function Tile({
    id,
    className,
    type,
}: {
    id: string
    className?: string
    type: 'white' | 'black'
}) {
    return (
        <div className={`tile ${type} ${className}`}>
            {id[0] === 'a' && <span className="str-symbol">{id[1]}</span>}
            {id[1] === '1' && <span className="col-symbol">{id[0]}</span>}
        </div>
    )
}
