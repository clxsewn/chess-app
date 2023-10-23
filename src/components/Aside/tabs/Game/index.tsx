import {
    discard,
    GameStatus,
    start,
} from '../../../../store/reducers/gameSlice.ts'
import { Button } from 'primereact/button'
import { useAppDispatch, useAppSelector } from '../../../../hooks.ts'

export default function Game() {
    const dispatch = useAppDispatch()
    const gameStatus = useAppSelector((state) => state.game.gameStatus)

    const startButtonHandler = () => dispatch(start())
    const discardButtonHandler = () => dispatch(discard())

    return (
        <>
            {gameStatus === GameStatus.Started ? (
                <Button
                    label="Discard game"
                    severity="danger"
                    onClick={discardButtonHandler}
                ></Button>
            ) : (
                <Button label="New game" onClick={startButtonHandler} />
            )}
        </>
    )
}
