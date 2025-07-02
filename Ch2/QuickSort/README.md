# 퀵 정렬 (Quick Sort)

이 폴더는 퀵 정렬 알고리즘의 구현을 포함합니다.

## 파일 목록

### QuickSort.ts
퀵 정렬 알고리즘의 구현과 테스트 코드입니다.

#### 구현된 함수들:

- **quickSort(arr)**: 퀵 정렬 알고리즘
- **arr**: 테스트용 랜덤 배열

## 퀵 정렬 알고리즘

### 알고리즘 설명
퀵 정렬은 **분할 정복(Divide and Conquer)** 방식의 정렬 알고리즘입니다. 피벗(pivot)을 선택하여 배열을 두 부분으로 나누고, 각 부분을 재귀적으로 정렬합니다.

### 동작 원리

1. **피벗 선택**: 배열의 중간 요소를 피벗으로 선택
2. **분할**: 피벗보다 작은 요소들은 왼쪽, 큰 요소들은 오른쪽으로 분할
3. **재귀 정렬**: 왼쪽과 오른쪽 부분을 각각 재귀적으로 정렬
4. **병합**: 정렬된 왼쪽 부분 + 피벗 + 정렬된 오른쪽 부분

### 구현
```typescript
export const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter((num) => num < pivot);
  const right = arr.filter((num) => num > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
};
```

### 코드 분석

#### 1. 기저 케이스
```typescript
if (arr.length <= 1) return arr;
```
- 배열의 길이가 1 이하일 때는 이미 정렬된 상태로 간주

#### 2. 피벗 선택
```typescript
const pivot = arr[Math.floor(arr.length / 2)];
```
- 배열의 중간 인덱스 요소를 피벗으로 선택
- `Math.floor(arr.length / 2)`: 중간 인덱스 계산

#### 3. 분할
```typescript
const left = arr.filter((num) => num < pivot);
const right = arr.filter((num) => num > pivot);
```
- `filter()` 메서드를 사용하여 피벗보다 작은/큰 요소들을 분리
- 피벗과 같은 값은 제외 (중복 처리)

#### 4. 재귀 및 병합
```typescript
return [...quickSort(left), pivot, ...quickSort(right)];
```
- 스프레드 연산자(`...`)를 사용하여 배열 병합
- 왼쪽 부분과 오른쪽 부분을 각각 재귀적으로 정렬

### 실행 과정 예시

```
원본 배열: [64, 34, 25, 12, 22, 11, 90]
피벗: 12 (중간 요소)

분할:
- left: [11] (12보다 작은 요소들)
- pivot: 12
- right: [64, 34, 25, 22, 90] (12보다 큰 요소들)

재귀 호출:
- quickSort([11]) → [11]
- quickSort([64, 34, 25, 22, 90]) → [22, 25, 34, 64, 90]

최종 결과: [11, 12, 22, 25, 34, 64, 90]
```

### 시간 복잡도

- **평균 케이스**: O(n log n)
- **최악 케이스**: O(n²) - 이미 정렬된 배열이나 모든 요소가 같은 경우
- **최선 케이스**: O(n log n) - 피벗이 항상 중간값인 경우

### 공간 복잡도

- **평균 케이스**: O(log n) - 재귀 호출 스택
- **최악 케이스**: O(n) - 불균형한 분할의 경우

### 장단점

#### 장점
1. **평균적으로 빠름**: 대부분의 경우 O(n log n) 성능
2. **제자리 정렬**: 추가 메모리 사용량이 적음
3. **캐시 친화적**: 지역성(locality)이 좋음
4. **병렬화 가능**: 분할된 부분을 병렬로 처리 가능

#### 단점
1. **불안정 정렬**: 같은 값의 상대적 순서가 바뀔 수 있음
2. **최악 케이스**: 이미 정렬된 배열에서 O(n²) 성능
3. **피벗 선택의 중요성**: 잘못된 피벗 선택 시 성능 저하

### 최적화 방안

1. **피벗 선택 개선**
   - 삼중 중간값(median-of-three) 방법
   - 랜덤 피벗 선택

2. **작은 배열 처리**
   - 작은 배열(예: 10개 이하)은 삽입 정렬 사용

3. **중복 요소 처리**
   - 피벗과 같은 요소들을 별도로 처리

### 사용법

```typescript
import { quickSort, arr } from './QuickSort';

console.log('원본 배열:', arr);
const sortedArr = quickSort(arr);
console.log('정렬된 배열:', sortedArr);
```

### 다른 정렬 알고리즘과의 비교

| 알고리즘 | 평균 시간 | 최악 시간 | 공간 복잡도 | 안정성 |
|---------|----------|----------|------------|--------|
| 퀵 정렬 | O(n log n) | O(n²) | O(log n) | 불안정 |
| 병합 정렬 | O(n log n) | O(n log n) | O(n) | 안정 |
| 힙 정렬 | O(n log n) | O(n log n) | O(1) | 불안정 |
| 삽입 정렬 | O(n²) | O(n²) | O(1) | 안정 | 