# 동적 계획법 (Dynamic Programming)

이 폴더는 동적 계획법을 사용한 알고리즘들의 구현을 포함합니다.

## 파일 목록

### DynamicPlan.ts
동적 계획법을 사용한 알고리즘들의 모음입니다.

#### 구현된 함수들:

- **fibonacci(n)**: 피보나치 수열 계산 (재귀적)
- **tileWays(n)**: 2×1 타일링 문제 (재귀적)
- **triangle(num)**: 삼각형 수열 계산 (동적 계획법)

## 2×1 타일링 문제 (Dynamic Programming)

### 문제 설명
2×n 크기의 직사각형을 **2×1 타일과 1×2 타일**로 채우는 방법의 수를 구하는 문제입니다.

### 해결 방법
이 문제는 피보나치 수열과 동일한 패턴을 가집니다:

- `f(n) = f(n-1) + f(n-2)`
- `f(1) = 1` (2×1 직사각형: 세로로 1개)
- `f(2) = 2` (2×2 직사각형: 세로로 2개 또는 가로로 2개)

### 타일 배치 방법
- **2×1 타일**: 세로로 배치
- **1×2 타일**: 가로로 배치 (2개를 나란히 배치)

### 예시
- n=1: 1가지 방법 (2×1 타일 1개)
- n=2: 2가지 방법 (2×1 타일 2개 또는 1×2 타일 2개)
- n=3: 3가지 방법
- n=4: 5가지 방법
- n=5: 8가지 방법

### 구현
```typescript
const tileWays = (n: number): number => {
  if (n <= 2) return n;
  return tileWays(n - 1) + tileWays(n - 2);
};
```

## 삼각형 수열 문제 (Dynamic Programming)

### 문제 설명
삼각형 수열은 다음과 같은 점화식을 따릅니다:
- `T(n) = T(n-2) + T(n-3)`
- `T(1) = T(2) = T(3) = 1`

### 해결 방법
동적 계획법을 사용하여 중복 계산을 피하고 효율적으로 해결합니다:

1. **기저 케이스**: n ≤ 3일 때 1 반환
2. **캐시 배열**: 계산된 값을 저장할 배열 생성
3. **점진적 계산**: 4부터 n까지 순차적으로 계산

### 예시
- T(1) = 1
- T(2) = 1  
- T(3) = 1
- T(4) = T(2) + T(1) = 1 + 1 = 2
- T(5) = T(3) + T(2) = 1 + 1 = 2
- T(6) = T(4) + T(3) = 2 + 1 = 3

### 구현
```typescript
const triangle = (num: number): number => {
  // 기저 케이스
  if (num <= 3) return 1;
  
  // 캐시 배열 초기화
  const cache: number[] = [1, 1, 1];
  
  // 동적 계획법으로 계산
  for (let i = 3; i < num; i++) {
    cache.push(cache[i - 2] + cache[i - 3]);
  }
  
  return cache[num - 1];
};
```

## 사용법

```typescript
import { fibonacci, tileWays, triangle } from './DynamicPlan';

console.log(fibonacci(10)); // 55
console.log(tileWays(5)); // 8
console.log(triangle(10)); // 9
```

## 시간 복잡도

- **fibonacci**: O(2^n) (재귀적 구현)
- **tileWays**: O(2^n) (재귀적 구현)
- **triangle**: O(n) (동적 계획법 사용)

## 공간 복잡도

- **fibonacci**: O(n) (재귀 호출 스택)
- **tileWays**: O(n) (재귀 호출 스택)
- **triangle**: O(n) (캐시 배열)

## 동적 계획법의 장점

1. **중복 계산 방지**: 같은 부분 문제를 여러 번 계산하지 않음
2. **효율성 향상**: 지수적 시간 복잡도를 선형 시간 복잡도로 개선
3. **메모리 효율성**: 필요한 계산 결과만 저장 