import { ThemeProvider } from 'styled-components'
import { ReactNode } from 'react'
import { defaultBoardTheme } from '../../boardThemes.ts'

export default function Theme({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={defaultBoardTheme}>{children}</ThemeProvider>
}
