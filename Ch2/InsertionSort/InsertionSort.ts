export const arr: number[] = [12, 11, 13, 5, 6]

export const insertionSort = (arr: number[]) => {
    let n = arr.length
    if (n == 0) {
        return
    }

    for (let i = 1; i < n; i++) {
        let key = arr[i] 
        let j = i - 1
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]
            j = j - 1
        }
        arr[j + 1] = key
    }
}

insertionSort(arr)
console.log(arr)