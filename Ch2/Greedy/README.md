# 그리디 알고리즘 (Greedy Algorithm)

## 개요

그리디 알고리즘은 각 단계에서 가장 좋아 보이는 선택을 하는 알고리즘입니다. 전체적인 최적해를 구하기 위해 각 단계에서 지역적으로 최적인 선택을 하는 방식으로, 간단하면서도 효과적인 해결책을 제공합니다.

## 특징

- **지역 최적 선택**: 각 단계에서 가장 좋아 보이는 선택을 함
- **간단한 구현**: 복잡한 데이터 구조나 복잡한 로직이 필요하지 않음
- **빠른 실행**: 일반적으로 O(n log n) 또는 O(n)의 시간 복잡도를 가짐
- **제한사항**: 모든 문제에 적용할 수 없으며, 때로는 최적해를 보장하지 않음

## 포함된 알고리즘

이 디렉토리에는 세 가지 대표적인 그리디 알고리즘 예제가 포함되어 있습니다:

### 1. 동전 개수 최적화 문제 (Coin Change Problem)

**문제**: 주어진 금액을 만들기 위해 필요한 최소 동전 개수를 구하는 문제

**그리디 전략**: 큰 동전부터 최대한 많이 사용

**시간 복잡도**: O(n log n) (정렬) + O(n) (동전 선택) = O(n log n)

**공간 복잡도**: O(n)

**예시**:
```
동전 종류: [500, 100, 50, 1]
목표 금액: 4260원
결과: 500원×8 + 100원×2 + 50원×1 + 1원×10 = 21개
```

**핵심 코드**:
```typescript
function minCoinCount(cList: number[], target: number): number {
    let coinCount: number = 0;
    const sortedCoinList = [...cList].sort((a, b) => b - a);
    
    for (const coin of sortedCoinList) {
        if (target === 0) break;
        const currentCoinCount = Math.floor(target / coin);
        coinCount += currentCoinCount;
        target = target % coin;
    }
    
    return coinCount;
}
```

### 2. 분할 가능한 배낭 문제 (Fractional Knapsack Problem)

**문제**: 제한된 용량의 배낭에 최대 가치를 담는 문제 (아이템을 분할할 수 있음)

**그리디 전략**: 무게당 가치가 높은 아이템부터 선택

**시간 복잡도**: O(n log n) (정렬) + O(n) (선택) = O(n log n)

**공간 복잡도**: O(n)

**예시**:
```
아이템: [(10, 10), (15, 12), (20, 10), (25, 8), (30, 5)]
용량: 30
결과: 무게당 가치 순으로 정렬하여 선택
```

**핵심 코드**:
```typescript
function getMaxValue(items: Array<[number, number]>, capacity: number): KnapsackResult {
    const sortedItems: Item[] = items
        .map(([weight, value]) => ({
            weight, value,
            valuePerWeight: value / weight
        }))
        .sort((a, b) => b.valuePerWeight - a.valuePerWeight);
    
    // 그리디 선택 로직...
}
```

### 3. 작업 스케줄링 문제 (Job Scheduling Problem)

**문제**: 여러 작업을 처리할 때 전체 대기 시간을 최소화하는 순서를 찾는 문제

**그리디 전략**: 처리 시간이 짧은 작업부터 처리

**시간 복잡도**: O(n log n) (정렬) + O(n) (계산) = O(n log n)

**공간 복잡도**: O(n)

**예시**:
```
작업 처리 시간: [3, 1, 4, 3, 2]
최적 순서: [1, 2, 3, 3, 4]
총 대기 시간: 1 + 3 + 6 + 9 + 13 = 32
```

**핵심 코드**:
```typescript
function calculateTotalWaitingTime(processingTimes: number[], shouldSort: boolean = true): SchedulingResult {
    // 정렬 여부에 따라 처리 순서 결정
    const orderedTimes: number[] = shouldSort 
        ? [...processingTimes].sort((a, b) => a - b)
        : [...processingTimes];
    
    let totalWaitingTime: number = 0;
    let currentWaitingTime: number = 0;
    const individualWaitingTimes: number[] = [];
    
    for (const time of orderedTimes) {
        currentWaitingTime += time;
        totalWaitingTime += currentWaitingTime;
        individualWaitingTimes.push(currentWaitingTime);
    }
    
    return {
        totalWaitingTime,
        processingOrder: orderedTimes,
        individualWaitingTimes
    };
}
```

## 실행 방법

```bash
# TypeScript 컴파일
tsc Greedy.ts

# 실행
node Greedy.js
```

또는

```bash
# ts-node를 사용한 직접 실행
npx ts-node Greedy.ts
```

## 출력 예시

```
=== 동전 개수 최적화 테스트 ===

4260원을 만드는데 필요한 최소 동전 개수:
Coin details: [
  { coin: 500, count: 8 },
  { coin: 100, count: 2 },
  { coin: 50, count: 1 },
  { coin: 1, count: 10 }
]
결과: 21개

=== 배낭 문제 (분할 가능) 테스트 ===
아이템 목록 (무게, 가치): [[10, 10], [15, 12], [20, 10], [25, 8], [30, 5]]

최종 결과:
총 가치: 24.00
상세 내역:
  1. 무게: 10, 가치: 10, 비율: 1.00
  2. 무게: 15, 가치: 12, 비율: 1.00
  3. 무게: 20, 가치: 10, 비율: 0.25

=== 작업 스케줄링 문제 테스트 ===
원본 작업 처리 시간: [3, 1, 4, 3, 2]

최적 처리 순서 (짧은 시간부터): [1, 2, 3, 3, 4]
개별 대기 시간: [1, 3, 6, 9, 13]
총 대기 시간: 32

원본 순서로 처리했을 때: [3, 1, 4, 3, 2]
개별 대기 시간: [3, 4, 8, 11, 13]
총 대기 시간: 39

최적화로 인한 대기 시간 단축: 7 (17.9% 개선)
```

## 그리디 알고리즘의 장단점

### 장점
- **구현이 간단**: 직관적이고 이해하기 쉬움
- **빠른 실행**: 일반적으로 효율적인 시간 복잡도
- **메모리 효율적**: 추가적인 복잡한 데이터 구조가 필요하지 않음
- **실시간 처리**: 스트리밍 데이터나 실시간 시스템에 적합

### 단점
- **최적해 보장 안됨**: 모든 문제에서 최적해를 보장하지 않음
- **제한적 적용**: 특정 조건을 만족하는 문제에만 적용 가능
- **후회 불가**: 한 번 선택한 것은 되돌릴 수 없음

## 그리디 알고리즘 적용 가능 조건

1. **탐욕적 선택 특성 (Greedy Choice Property)**: 각 단계에서 지역 최적 선택이 전체 최적해로 이어짐
2. **최적 부분 구조 (Optimal Substructure)**: 문제의 최적해가 부분 문제의 최적해로 구성됨

## 추가 학습 자료

- [GeeksforGeeks - Greedy Algorithms](https://www.geeksforgeeks.org/greedy-algorithms/)
- [Wikipedia - Greedy Algorithm](https://en.wikipedia.org/wiki/Greedy_algorithm)
- [Algorithm Design Manual - Greedy Algorithms](https://www.algorist.com/)

## 관련 문제들

- **활동 선택 문제 (Activity Selection Problem)**
- **허프만 코딩 (Huffman Coding)**
- **최소 신장 트리 (Minimum Spanning Tree)**
- **최단 경로 문제 (Shortest Path Problem)**
- **회의실 배정 문제 (Meeting Room Assignment)**
