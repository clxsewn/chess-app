import './styles.scss'
import styled from 'styled-components'

export const CTile = styled(Tile)`
    background-color: ${(props) => props.theme.colors.black};

    &:nth-child(2n) {
        color: red;
    }
`

export default function Tile({
    id,
    className,
}: {
    id: string
    className: string
}) {
    return <div className={`tile ${className}`}>{id}</div>
}
