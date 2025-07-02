# 이진 검색 (Binary Search)

이 폴더는 이진 검색 알고리즘의 구현을 포함합니다.

## 파일 목록

### BinarySearch.ts
이진 검색 알고리즘의 구현과 테스트 코드입니다.

#### 구현된 함수들:

- **binarySearch(data, search)**: 이진 검색 알고리즘
- **sortedArr**: 테스트용 정렬된 랜덤 배열

## 이진 검색 알고리즘

### 알고리즘 설명
이진 검색은 **정렬된 배열**에서 특정 값을 효율적으로 찾는 알고리즘입니다. 배열의 중간 요소와 비교하여 검색 범위를 절반씩 줄여가며 검색합니다.

### 전제 조건
- **정렬된 배열**: 이진 검색은 반드시 정렬된 배열에서만 사용 가능
- **비교 가능한 데이터**: 숫자, 문자열 등 비교 연산이 가능한 데이터

### 동작 원리

1. **중간 요소 확인**: 배열의 중간 인덱스 요소를 확인
2. **비교**: 검색값과 중간 요소를 비교
3. **범위 축소**: 
   - 검색값 < 중간값: 왼쪽 절반에서 검색
   - 검색값 > 중간값: 오른쪽 절반에서 검색
   - 검색값 = 중간값: 검색 완료
4. **재귀 반복**: 범위가 1개 이하가 될 때까지 반복

### 구현
```typescript
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
```

### 코드 분석

#### 1. 기저 케이스들
```typescript
if (data.length === 0 || data === null) {
  return false;
}
```
- 빈 배열이나 null인 경우 false 반환

```typescript
else if (data.length === 1 && data[0] !== search) {
  return false;
}
```
- 배열에 요소가 1개이고 검색값과 다른 경우 false 반환

```typescript
else if (data.length === 1 && data[0] === search) {
  return true;
}
```
- 배열에 요소가 1개이고 검색값과 같은 경우 true 반환

#### 2. 중간 인덱스 계산
```typescript
const mid = Math.floor(data.length / 2);
```
- `Math.floor()`: 소수점 이하를 버림하여 정수 인덱스 생성
- Python의 `//` 연산자와 동일한 역할

#### 3. 검색값과 중간값 비교
```typescript
if (data[mid] === search) {
  return true;
} else if (data[mid] < search) {
  return binarySearch(data.slice(mid + 1), search);
} else {
  return binarySearch(data.slice(0, mid), search);
}
```
- **같은 경우**: 검색 완료, true 반환
- **중간값 < 검색값**: 오른쪽 절반에서 재귀 검색
- **중간값 > 검색값**: 왼쪽 절반에서 재귀 검색

#### 4. 배열 분할
```typescript
data.slice(mid + 1)  // 오른쪽 절반
data.slice(0, mid)   // 왼쪽 절반
```
- Python의 `data[mid + 1:]`와 `data[:mid]`와 동일한 역할

### 실행 과정 예시

```
정렬된 배열: [11, 22, 25, 34, 64, 90]
검색값: 34

1단계: [11, 22, 25, 34, 64, 90]
       mid = 2, data[2] = 25
       25 < 34 → 오른쪽 절반 검색

2단계: [34, 64, 90]
       mid = 1, data[1] = 64
       64 > 34 → 왼쪽 절반 검색

3단계: [34]
       mid = 0, data[0] = 34
       34 === 34 → 검색 완료!

결과: true
```

### 시간 복잡도

- **O(log n)**: 매 단계마다 검색 범위가 절반씩 줄어듦
- **선형 검색 대비**: O(n) → O(log n)으로 성능 향상

### 공간 복잡도

- **재귀적 구현**: O(log n) - 재귀 호출 스택
- **반복적 구현**: O(1) - 추가 메모리 불필요

### 장단점

#### 장점
1. **효율성**: O(log n)의 빠른 검색 속도
2. **예측 가능**: 정렬된 데이터에서 일정한 성능
3. **메모리 효율**: 반복적 구현 시 O(1) 공간 복잡도

#### 단점
1. **정렬 필요**: 검색 전에 배열을 정렬해야 함
2. **정렬 비용**: 정렬에 O(n log n) 시간 소요
3. **단일 검색**: 여러 번 검색할 때만 효율적

### 최적화 방안

1. **반복적 구현**
   - 재귀 호출 스택 제거로 공간 복잡도 개선

2. **인덱스 기반 구현**
   - 배열 복사 대신 인덱스로 범위 관리

3. **조건 최적화**
   - 불필요한 조건문 제거

### 사용법

```typescript
import { binarySearch, sortedArr } from './BinarySearch';

console.log('정렬된 배열:', sortedArr);
console.log('검색 결과 (50):', binarySearch(sortedArr, 50));
console.log('검색 결과 (첫 번째 요소):', binarySearch(sortedArr, sortedArr[0]));
```

### 다른 검색 알고리즘과의 비교

| 알고리즘 | 시간 복잡도 | 공간 복잡도 | 전제 조건 |
|---------|------------|------------|----------|
| 이진 검색 | O(log n) | O(log n) | 정렬된 배열 |
| 선형 검색 | O(n) | O(1) | 없음 |
| 해시 테이블 | O(1) 평균 | O(n) | 없음 |

### 이진 검색의 활용

1. **정렬된 배열에서 값 찾기**
2. **정렬된 배열에서 삽입 위치 찾기**
3. **이진 탐색 트리에서 검색**
4. **수치 해석에서 근 찾기**
5. **게임에서 최적해 찾기**

### 주의사항

1. **정렬 필수**: 반드시 정렬된 배열에서만 사용
2. **중복 처리**: 중복된 값이 있을 때 첫 번째 또는 마지막 위치 결정 필요
3. **오버플로우**: 큰 배열에서 중간값 계산 시 오버플로우 주의 