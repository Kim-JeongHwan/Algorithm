export const arr = [5, 2, 3, 1, 4]

export const bubbleSort = (arr: number[]) => {
    let n = arr.length
    if (n == 0) {
        return
    }

    for (let i = 0; i < n - 1; i++) {
        let swap = true
        for (let index = 0; index < n - 1 - i; index++) {
            if (arr[index] > arr[index + 1]) {
                [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]] // swap 할 때 배열 구조 분해 할당 사용
                swap = false
            }
        }
        if (swap) {
            break
        }   
    }
}

bubbleSort(arr)
console.log(arr)