# 병합 정렬 (Merge Sort)

이 폴더는 병합 정렬 알고리즘의 구현을 포함합니다.

## 파일 목록

### MergeSort.ts
병합 정렬 알고리즘의 구현과 테스트 코드입니다.

#### 구현된 함수들:

- **mergeSort(arr)**: 병합 정렬 메인 함수
- **merge(left, right)**: 두 정렬된 배열을 병합하는 함수
- **arr**: 테스트용 랜덤 배열

## 병합 정렬 알고리즘

### 알고리즘 설명
병합 정렬은 **분할 정복(Divide and Conquer)** 방식의 정렬 알고리즘입니다. 배열을 두 개의 균등한 부분으로 분할하고, 각 부분을 재귀적으로 정렬한 후 병합합니다.

### 동작 원리

1. **분할(Divide)**: 배열을 두 개의 균등한 부분으로 분할
2. **정복(Conquer)**: 각 부분을 재귀적으로 정렬
3. **병합(Merge)**: 정렬된 두 부분을 하나의 정렬된 배열로 병합

### 구현

#### 메인 함수
```typescript
export const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
};
```

#### 병합 함수
```typescript
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
```

### 코드 분석

#### 1. 기저 케이스
```typescript
if (arr.length <= 1) return arr;
```
- 배열의 길이가 1 이하일 때는 이미 정렬된 상태로 간주

#### 2. 분할
```typescript
const mid = Math.floor(arr.length / 2);
const left = arr.slice(0, mid);
const right = arr.slice(mid);
```
- `Math.floor(arr.length / 2)`: 중간 인덱스 계산
- `slice(0, mid)`: 왼쪽 부분 (0부터 mid-1까지)
- `slice(mid)`: 오른쪽 부분 (mid부터 끝까지)

#### 3. 재귀 호출
```typescript
return merge(mergeSort(left), mergeSort(right));
```
- 왼쪽과 오른쪽 부분을 각각 재귀적으로 정렬
- 정렬된 두 부분을 병합 함수로 전달

#### 4. 병합 과정
```typescript
while (i < left.length && j < right.length) {
  if (left[i] < right[j]) {
    result.push(left[i]);
    i++;
  } else {
    result.push(right[j]);
    j++;
  }
}
```
- 두 배열의 요소를 비교하여 작은 것부터 결과 배열에 추가
- 각 배열의 인덱스를 개별적으로 관리

#### 5. 남은 요소 처리
```typescript
return result.concat(left.slice(i)).concat(right.slice(j));
```
- 병합 과정에서 남은 요소들을 결과 배열에 추가
- `slice(i)`: i 인덱스부터 끝까지의 요소들

### 실행 과정 예시

```
원본 배열: [64, 34, 25, 12, 22, 11, 90]

분할 과정:
[64, 34, 25, 12, 22, 11, 90]
├── [64, 34, 25] ──┐
│   ├── [64] ──┐   │
│   │   └── [34, 25] ──┐
│   │       ├── [34]   │
│   │       └── [25]   │
│   └── [25, 34] ──┐   │
└── [12, 22, 11, 90] ──┘
    ├── [12, 22] ──┐
    │   ├── [12]   │
    │   └── [22]   │
    │   └── [12, 22] ──┐
    └── [11, 90] ──┘
        ├── [11]   │
        └── [90]   │
        └── [11, 90] ──┘

병합 과정:
[25, 34] + [64] → [25, 34, 64]
[12, 22] + [11, 90] → [11, 12, 22, 90]
[25, 34, 64] + [11, 12, 22, 90] → [11, 12, 22, 25, 34, 64, 90]

최종 결과: [11, 12, 22, 25, 34, 64, 90]
```

### 시간 복잡도

- **모든 케이스**: O(n log n)
  - 분할: O(log n) 단계
  - 각 단계에서 병합: O(n)
  - 총 시간: O(n log n)

### 공간 복잡도

- **O(n)**: 병합 과정에서 임시 배열이 필요
- 재귀 호출 스택: O(log n)
- 총 공간: O(n)

### 장단점

#### 장점
1. **안정적 성능**: 최악 케이스에서도 O(n log n) 보장
2. **안정 정렬**: 같은 값의 상대적 순서가 유지됨
3. **예측 가능**: 입력 데이터에 관계없이 일정한 성능
4. **병렬화 가능**: 분할된 부분을 병렬로 처리 가능

#### 단점
1. **추가 메모리**: O(n)의 추가 공간 필요
2. **캐시 비효율**: 배열 접근 패턴이 캐시에 불리함
3. **작은 배열에서 비효율**: 작은 배열에서는 삽입 정렬보다 느림

### 최적화 방안

1. **작은 배열 처리**
   - 작은 배열(예: 10개 이하)은 삽입 정렬 사용

2. **제자리 병합**
   - 추가 메모리 없이 병합하는 방법

3. **병렬 처리**
   - 분할된 부분을 병렬로 정렬

4. **자연 병합 정렬**
   - 이미 정렬된 부분을 활용

### 사용법

```typescript
import { mergeSort, arr } from './MergeSort';

console.log('원본 배열:', arr);
const sortedArr = mergeSort(arr);
console.log('정렬된 배열:', sortedArr);
```

### 다른 정렬 알고리즘과의 비교

| 알고리즘 | 평균 시간 | 최악 시간 | 공간 복잡도 | 안정성 |
|---------|----------|----------|------------|--------|
| 병합 정렬 | O(n log n) | O(n log n) | O(n) | 안정 |
| 퀵 정렬 | O(n log n) | O(n²) | O(log n) | 불안정 |
| 힙 정렬 | O(n log n) | O(n log n) | O(1) | 불안정 |
| 삽입 정렬 | O(n²) | O(n²) | O(1) | 안정 |

### 병합 정렬의 특징

1. **분할 정복**: 문제를 작은 부분으로 나누어 해결
2. **안정 정렬**: 같은 값의 순서가 유지됨
3. **외부 정렬**: 대용량 데이터 정렬에 적합
4. **재귀적**: 자연스러운 재귀 구조 