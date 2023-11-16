import { Toast } from 'primereact/toast'
import { useEffect, useRef } from 'react'
import { GameResult } from '../../store/reducers/gameSlice.ts'
import { useAppSelector } from '../../hooks.ts'

export default function EndgameToast() {
    const toastCenter = useRef<Toast>(null)
    const gameResult = useAppSelector((state) => state.game.gameResult)

    useEffect(() => {
        if (gameResult !== null && toastCenter.current) {
            const detail =
                gameResult === GameResult.WhiteWon
                    ? 'White wins!'
                    : gameResult === GameResult.BlackWon
                    ? 'Black wins!'
                    : 'Draw'

            toastCenter.current.show({
                severity: 'info',
                summary: 'Game result',
                detail: detail,
                life: 5000,
            })
        }
    }, [gameResult])

    return <Toast ref={toastCenter} position="center" />
}
