//
export function useView(): string[] {
    const str = ['8', '7', '6', '5', '4', '3', '2', '1']
    const col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    const grid: string[] = []

    str.forEach((s) => {
        col.forEach((c) => {
            grid.push(c + s)
        })
    })

    return grid
}
