// 랜덤 정수 배열 생성
export const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

// 퀵 정렬
export const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter((num) => num < pivot);
  const right = arr.filter((num) => num > pivot);

  return [...quickSort(left), pivot, ...quickSort(right)];
};