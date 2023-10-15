export interface Colors<T> {
    white: T
    black: T
}

export interface Theme<T> {
    name: string
    theme: T
}

export type Themes<T> = Theme<T>[]
