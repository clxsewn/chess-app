import {
    discard,
    GameStatus,
    start,
    timeMarks,
    setTimeMark,
} from '../../../../store/reducers/gameSlice.ts'
import { Button } from 'primereact/button'
import { useAppDispatch, useAppSelector } from '../../../../hooks.ts'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

export default function GameTab() {
    const dispatch = useAppDispatch()
    const [gameStatus, initialTime] = useAppSelector((state) => [
        state.game.gameStatus,
        state.game.initialTime,
    ])

    const startButtonHandler = () => dispatch(start())
    const discardButtonHandler = () => dispatch(discard())
    const selectTimeMarkHandler = (e: DropdownChangeEvent) =>
        dispatch(setTimeMark(e.value))

    return (
        <>
            {gameStatus === GameStatus.Started ? (
                <Button
                    label="Discard game"
                    severity="danger"
                    onClick={discardButtonHandler}
                ></Button>
            ) : (
                <>
                    <Dropdown
                        options={timeMarks}
                        value={initialTime}
                        onChange={selectTimeMarkHandler}
                    />
                    <Button label="New game" onClick={startButtonHandler} />
                </>
            )}
        </>
    )
}
