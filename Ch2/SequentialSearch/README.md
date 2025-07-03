# 순차 검색 (Sequential Search)

## 개요
순차 검색은 가장 기본적인 검색 알고리즘으로, 배열의 첫 번째 요소부터 마지막 요소까지 순서대로 검색하여 원하는 값을 찾는 방법입니다.

## 알고리즘 설명

### 동작 원리
1. 배열의 첫 번째 인덱스부터 시작
2. 각 요소를 목표값과 비교
3. 일치하는 요소를 찾으면 해당 인덱스 반환
4. 배열 끝까지 검색했는데 찾지 못하면 -1 반환

### 시간 복잡도
- **최선의 경우**: O(1) - 첫 번째 요소가 목표값인 경우
- **평균의 경우**: O(n/2) - 목표값이 배열 중간에 있는 경우
- **최악의 경우**: O(n) - 목표값이 배열 끝에 있거나 없는 경우

### 공간 복잡도
- O(1) - 추가적인 메모리 공간이 필요하지 않음

## 구현

### TypeScript 구현
```typescript
export const sequentialSearch = (dataList: number[], target: number): number => {
    if (dataList.length === 0 || dataList === null) {
        return -1;
    } else {
        for (let index = 0; index < dataList.length; index++) {
            if (dataList[index] === target) {
                return index;
            }
        }
        return -1;
    }
}
```

### 사용 예시
```typescript
// 랜덤 데이터 리스트 생성
const randDataList: number[] = [];
for (let i = 0; i < 10; i++) {
    randDataList.push(Math.floor(Math.random() * 100) + 1);
}

console.log("Data List:", randDataList);
console.log("Search result for 50:", sequentialSearch(randDataList, 50));
```

## 장단점

### 장점
- 구현이 간단하고 직관적
- 정렬되지 않은 배열에서도 사용 가능
- 추가적인 메모리 공간이 필요하지 않음

### 단점
- 대용량 데이터에서는 비효율적
- 정렬된 배열에서도 전체를 검색해야 할 수 있음
- 이진 검색 등 다른 알고리즘에 비해 성능이 떨어짐

## 활용 사례
- 작은 크기의 배열에서 간단한 검색이 필요한 경우
- 정렬되지 않은 데이터에서 검색이 필요한 경우
- 알고리즘 학습 및 교육 목적
- 다른 검색 알고리즘의 성능 비교 기준

## 실행 방법
```bash
# TypeScript 컴파일
tsc SequentialSearch.ts

# Node.js로 실행
node SequentialSearch.js

# 또는 ts-node 사용
npx ts-node SequentialSearch.ts
``` 