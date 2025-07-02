// 정렬된 배열 생성 (이진 검색을 위해 정렬 필요)
export const sortedArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);

// 이진 검색
export const binarySearch = (data: number[], search: number): boolean => {
  if (data.length === 0 || data === null) {
    return false;
  } else if (data.length === 1 && data[0] !== search) {
    return false;
  } else if (data.length === 1 && data[0] === search) {
    return true;
  } else {
    const mid = Math.floor(data.length / 2);
    if (data[mid] === search) {
      return true;
    } else if (data[mid] < search) {
      return binarySearch(data.slice(mid + 1), search);
    } else {
      return binarySearch(data.slice(0, mid), search);
    }
  }
};

// 테스트
console.log('정렬된 배열:', sortedArr);
console.log('검색 결과 (50):', binarySearch(sortedArr, 50));
console.log('검색 결과 (첫 번째 요소):', binarySearch(sortedArr, sortedArr[0]));
console.log('검색 결과 (마지막 요소):', binarySearch(sortedArr, sortedArr[sortedArr.length - 1]));
