export const arr = [12, 11, 13, 5, 6]

export const selectionSort = (arr: number[]) => {
    let n = arr.length
    if (n == 0) {
        return
    }

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
}

selectionSort(arr)
console.log(arr)