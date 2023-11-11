import {
    discard,
    GameStatus,
    start,
    setTimeMark,
} from '../../../../store/reducers/gameSlice.ts'
import { Button } from 'primereact/button'
import { useAppDispatch, useAppSelector } from '../../../../hooks.ts'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { timeVariants } from '../../../../data/timeVariants.ts'

export default function GameTab() {
    const dispatch = useAppDispatch()
    const { gameStatus, initialTime } = useAppSelector((state) => state.game)

    const startButtonHandler = () => dispatch(start())
    const discardButtonHandler = () => dispatch(discard())
    const selectTimeMarkHandler = (e: DropdownChangeEvent) =>
        dispatch(setTimeMark(e.value.seconds))

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
                    <div className="view-formatter">
                        <span className="mr">Time:</span>
                        <Dropdown
                            options={timeVariants}
                            value={initialTime}
                            optionLabel="title"
                            onChange={selectTimeMarkHandler}
                        />
                    </div>
                    <div className="divider" />
                    <Button label="New game" onClick={startButtonHandler} />
                </>
            )}
        </>
    )
}
