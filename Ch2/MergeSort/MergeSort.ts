// 랜덤 정수 배열 생성
export const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

// 병합 정렬
export const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left: number[], right: number[]): number[] => {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  } 
  return result.concat(left.slice(i)).concat(right.slice(j));
};

console.log(mergeSort(arr));