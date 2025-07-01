# 재귀 알고리즘 (Recursive Algorithms)

이 폴더는 순수한 재귀 알고리즘들의 구현을 포함합니다.

## 파일 목록

### Recursive.ts
기본적인 재귀 알고리즘들의 모음입니다.

#### 구현된 함수들:

- **factorial(n)**: 팩토리얼 계산
- **listRecursion(list)**: 배열 요소들의 합을 재귀적으로 계산
- **palindrome(str)**: 문자열이 팰린드롬인지 확인
- **collatz(n)**: 콜라츠 추측 알고리즘
- **countWays(n)**: n을 1, 2, 3의 합으로 나타내는 방법의 수

## 팩토리얼 (Factorial)

### 문제 설명
n! = n × (n-1) × (n-2) × ... × 1을 계산하는 문제입니다.

### 재귀적 해결 방법
- **기저 케이스**: n ≤ 1일 때 1 반환
- **재귀 케이스**: n × factorial(n-1)

### 구현
```typescript
export const factorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};
```

### 예시
- factorial(5) = 5 × 4 × 3 × 2 × 1 = 120
- factorial(3) = 3 × 2 × 1 = 6

## 리스트 재귀 (List Recursion)

### 문제 설명
배열의 모든 요소를 재귀적으로 더하는 문제입니다.

### 재귀적 해결 방법
- **기저 케이스**: 빈 배열일 때 0 반환
- **재귀 케이스**: 첫 번째 요소 + 나머지 배열의 합

### 구현
```typescript
export const listRecursion = (list: number[]): number => {
  if (list.length === 0) return 0;
  return list[0] + listRecursion(list.slice(1));
};
```

### 예시
- listRecursion([1, 2, 3, 4]) = 1 + 2 + 3 + 4 = 10
- listRecursion([5, 10]) = 5 + 10 = 15

## 팰린드롬 (Palindrome)

### 문제 설명
문자열이 앞뒤로 읽어도 같은지 확인하는 문제입니다.

### 재귀적 해결 방법
- **기저 케이스**: 문자열 길이가 1 이하일 때 true
- **재귀 케이스**: 첫 글자와 마지막 글자가 같고, 나머지 부분이 팰린드롬

### 구현
```typescript
export const palindrome = (str: string): boolean => {
  if (str.length <= 1) return true;
  return str[0] === str[str.length - 1] && palindrome(str.slice(1, -1));
};
```

### 예시
- palindrome("racecar") = true
- palindrome("hello") = false
- palindrome("anna") = true

## 콜라츠 추측 (Collatz Conjecture)

### 문제 설명
주어진 수에 대해 다음 규칙을 적용하여 1이 될 때까지의 단계 수를 계산합니다:
- 짝수면 2로 나누기
- 홀수면 3을 곱하고 1 더하기

### 재귀적 해결 방법
- **기저 케이스**: n이 1일 때 1 반환
- **재귀 케이스**: 짝수면 n/2, 홀수면 3n+1에 대해 재귀 호출

### 구현
```typescript
export const collatz = (n: number): number => {
  if (n === 1) return 1;
  if (n % 2 === 0) return collatz(n / 2);
  return collatz(3 * n + 1);
};
```

### 예시
- collatz(6) → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 (8단계)
- collatz(7) → 22 → 11 → 34 → 17 → 52 → 26 → 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1 (16단계)

## 카운트 웨이즈 (Count Ways)

### 문제 설명
n을 1, 2, 3의 합으로 나타내는 방법의 수를 계산하는 문제입니다.

### 재귀적 해결 방법
- **기저 케이스**: n이 0일 때 1, n이 음수일 때 0
- **재귀 케이스**: countWays(n-1) + countWays(n-2) + countWays(n-3)

### 구현
```typescript
export const countWays = (n: number): number => {
  if (n === 0) return 1;
  if (n < 0) return 0;
  return countWays(n - 1) + countWays(n - 2) + countWays(n - 3);
};
```

### 예시
- countWays(3) = 4
  - 1+1+1, 1+2, 2+1, 3
- countWays(4) = 7
  - 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2, 1+3, 3+1

## 사용법

```typescript
import { factorial, listRecursion, palindrome, collatz, countWays } from './Recursive';

console.log(factorial(5)); // 120
console.log(listRecursion([1, 2, 3, 4])); // 10
console.log(palindrome("racecar")); // true
console.log(collatz(6)); // 8
console.log(countWays(3)); // 4
```

## 시간 복잡도

- **factorial**: O(n)
- **listRecursion**: O(n)
- **palindrome**: O(n)
- **collatz**: O(log n) (평균적으로)
- **countWays**: O(3^n) (지수적)

## 공간 복잡도

모든 함수는 재귀 호출 스택으로 인해 O(n)의 공간 복잡도를 가집니다.

## 재귀의 장단점

### 장점
1. **직관적**: 문제를 자연스럽게 분해
2. **간결**: 복잡한 반복문 없이 구현 가능
3. **수학적**: 수학적 정의와 일치

### 단점
1. **스택 오버플로우**: 깊은 재귀 시 메모리 부족
2. **성능**: 중복 계산으로 인한 비효율성
3. **디버깅**: 복잡한 호출 스택으로 인한 어려움 