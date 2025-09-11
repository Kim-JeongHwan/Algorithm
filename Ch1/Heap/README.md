# Heap (힙)

## 개요
힙은 완전 이진 트리 기반의 자료구조로, 부모 노드가 자식 노드보다 항상 크거나 작은 특성을 가집니다. 주로 우선순위 큐 구현에 사용됩니다.

## 파일 구조
- `HeapType.ts`: 최대 힙(Max Heap) 구현
- `Heap.ts`: 힙 사용 예제

## 상세 해설

### HeapType.ts

#### 1. Heap 클래스 구조
```typescript
export class Heap {
    heap: number[];
    
    constructor() {
        this.heap = [];
    }
}
```

**특징**:
- 배열로 완전 이진 트리 구현
- 최대 힙: 부모 노드가 자식 노드보다 큼
- 인덱스 관계: `parent = Math.floor((i-1)/2)`, `left = 2*i+1`, `right = 2*i+2`

#### 2. 삽입 연산 (insert)
```typescript
insert(data: number) {
    this.heap.push(data);
    this.heapifyUp();
}
```

**과정**:
1. 배열 끝에 새 요소 추가
2. `heapifyUp()` 호출하여 힙 성질 복원

#### 3. 힙화 위로 (heapifyUp)
```typescript
heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[index] > this.heap[parentIndex]) {
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        } else {
            break;
        }
    }
}
```

**동작 원리**:
- 새로 추가된 요소를 부모와 비교
- 부모보다 크면 교환하고 위로 이동
- 부모보다 작으면 중단

#### 4. 삭제 연산 (pop)
```typescript
pop() {
    if (this.heap.length === 0) {
        return null;
    }

    const root = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return root;
}
```

**과정**:
1. 루트(최대값) 저장
2. 마지막 요소를 루트로 이동
3. 마지막 요소 제거
4. `heapifyDown()` 호출하여 힙 성질 복원

#### 5. 힙화 아래로 (heapifyDown)
```typescript
heapifyDown() {
    let index = 0;
    while (index < this.heap.length) {
        const leftChildIndex = index * 2 + 1;
        const rightChildIndex = index * 2 + 2;

        if (leftChildIndex >= this.heap.length) {
            break;
        }

        const leftChild = this.heap[leftChildIndex] || 0;
        const rightChild = this.heap[rightChildIndex] || 0;

        if (rightChildIndex >= this.heap.length) {
            if (leftChild > this.heap[index]) {
                [this.heap[index], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[index]];
                index = leftChildIndex;
            }
            break;
        }

        if (leftChild > rightChild && leftChild > this.heap[index]) {
            [this.heap[index], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[index]];
            index = leftChildIndex;
        } else if (rightChild > leftChild && rightChild > this.heap[index]) {
            [this.heap[index], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[index]];
            index = rightChildIndex;
        } else {
            break;
        }
    }
}
```

**heapifyDown의 상세한 동작 원리**:

1. **초기화**: `index = 0` (루트 노드부터 시작)

2. **자식 노드 인덱스 계산**:
   - `leftChildIndex = index * 2 + 1`
   - `rightChildIndex = index * 2 + 2`
   - 이는 완전 이진 트리의 배열 표현에서 자식 노드의 위치를 계산하는 공식

3. **완전 이진 트리 특성 확인**:
   ```typescript
   if (leftChildIndex >= this.heap.length) {
       break;
   }
   ```
   - 왼쪽 자식이 존재하지 않으면 (인덱스가 배열 길이보다 크거나 같으면) 리프 노드
   - 완전 이진 트리에서는 왼쪽 자식이 없으면 오른쪽 자식도 없음
   - 따라서 더 이상 내려갈 곳이 없으므로 종료

4. **자식 노드 값 가져오기**:
   ```typescript
   const leftChild = this.heap[leftChildIndex] || 0;
   const rightChild = this.heap[rightChildIndex] || 0;
   ```
   - `|| 0`은 오른쪽 자식이 존재하지 않을 때를 대비한 기본값

5. **오른쪽 자식이 없는 경우 처리**:
   ```typescript
   if (rightChildIndex >= this.heap.length) {
       if (leftChild > this.heap[index]) {
           // 교환
           index = leftChildIndex;
       }
       break;
   }
   ```
   - **왜 이 경우를 별도로 처리하는가?**
   - 오른쪽 자식이 없으면 왼쪽 자식과 현재 노드만 비교하면 됨
   - 두 자식이 모두 있는 경우와 달리, "더 큰 자식"을 선택할 필요가 없음
   - 단순히 왼쪽 자식이 현재 노드보다 크면 교환

6. **두 자식이 모두 있는 경우 처리**:
   ```typescript
   if (leftChild > rightChild && leftChild > this.heap[index]) {
       // 왼쪽 자식과 교환
   } else if (rightChild > leftChild && rightChild > this.heap[index]) {
       // 오른쪽 자식과 교환
   } else {
       break;
   }
   ```
   - **교환 조건의 의미**:
     - `leftChild > rightChild`: 왼쪽 자식이 오른쪽 자식보다 큼
     - `leftChild > this.heap[index]`: 왼쪽 자식이 현재 노드보다 큼
     - **두 조건을 모두 만족해야 교환하는 이유**: 최대 힙에서는 부모가 자식보다 커야 하므로, 현재 노드보다 큰 자식 중에서 가장 큰 자식과 교환해야 함

7. **교환 후 인덱스 업데이트**:
   - 교환이 일어나면 `index`를 해당 자식의 인덱스로 업데이트
   - 다음 반복에서 그 위치에서 다시 heapifyDown 수행

**시간복잡도가 O(log n)인 이유**:

1. **트리의 높이**: 완전 이진 트리의 높이는 ⌊log₂(n)⌋ + 1
2. **최악의 경우**: 루트에서 리프까지 모든 레벨을 거쳐야 함
3. **각 레벨에서의 작업**: 
   - 자식 노드 인덱스 계산: O(1)
   - 값 비교: O(1) 
   - 교환: O(1)
4. **총 시간복잡도**: 높이 × 각 레벨의 작업 = O(log n) × O(1) = O(log n)

**예시로 이해하기**:
```
힙: [1, 8, 7, 6, 5, 4, 3] (루트가 1로 힙 성질 위반)

1단계: index=0, leftChild=8, rightChild=7
      8 > 7이고 8 > 1이므로 1과 8 교환
      결과: [8, 1, 7, 6, 5, 4, 3]

2단계: index=1, leftChild=6, rightChild=5  
      6 > 5이고 6 > 1이므로 1과 6 교환
      결과: [8, 6, 7, 1, 5, 4, 3]

3단계: index=3, leftChildIndex=7 >= heap.length이므로 종료
```

### Heap.ts

#### 사용 예제
```typescript
const heap = new Heap();
heap.insert(15);
heap.insert(10);
heap.insert(8);
heap.insert(5);
heap.insert(4);
heap.insert(20);

console.log(heap.heap);
```

## 힙의 특징

### 완전 이진 트리
- 모든 레벨이 채워져 있고 마지막 레벨은 왼쪽부터 채워짐
- 배열로 효율적으로 구현 가능

### 힙 성질
- **최대 힙**: 부모 노드 ≥ 자식 노드
- **최소 힙**: 부모 노드 ≤ 자식 노드

### 인덱스 관계
- `parent(i) = Math.floor((i-1)/2)`
- `left(i) = 2*i + 1`
- `right(i) = 2*i + 2`

## 시간복잡도

### 기본 연산
- **삽입**: O(log n) - heapifyUp
- **삭제**: O(log n) - heapifyDown
- **최대값 확인**: O(1) - 루트 노드

### 시간복잡도 상세 분석

#### 1. 삽입 연산 O(log n)
- **heapifyUp 과정**: 새로 추가된 요소가 루트까지 올라갈 수 있는 최대 거리
- **완전 이진 트리의 높이**: ⌊log₂(n)⌋ + 1
- **최악의 경우**: 새 요소가 루트까지 올라가야 함
- **각 단계**: 부모와 비교 및 교환 O(1)
- **총 시간**: 높이 × 각 단계 = O(log n)

#### 2. 삭제 연산 O(log n)
- **heapifyDown 과정**: 루트에서 리프까지 내려갈 수 있는 최대 거리
- **완전 이진 트리의 높이**: ⌊log₂(n)⌋ + 1
- **최악의 경우**: 루트에서 리프까지 모든 레벨을 거쳐야 함
- **각 단계**: 자식들과 비교 및 교환 O(1)
- **총 시간**: 높이 × 각 단계 = O(log n)

#### 3. 최대값 확인 O(1)
- **이유**: 최대 힙에서 최대값은 항상 루트에 위치
- **접근**: 배열의 첫 번째 요소에 직접 접근
- **시간**: O(1)

### 힙 생성
- **하향식**: O(n) - 모든 노드를 한 번씩 heapifyDown
- **상향식**: O(n log n) - 각 요소를 삽입하며 heapifyUp

#### 하향식 힙 생성이 O(n)인 이유
- **직관적 이해**: 대부분의 노드는 트리의 하단에 위치
- **heapifyDown 비용**: 높이가 낮은 노드일수록 heapifyDown 비용이 적음
- **수학적 증명**: 
  - 높이 h에 있는 노드 수: ⌈n/2^(h+1)⌉
  - 각 노드의 heapifyDown 비용: O(h)
  - 총 비용: Σ(h=0 to log n) h × ⌈n/2^(h+1)⌉ = O(n)

## 장단점

### 장점
- **우선순위 큐**: 최대/최소값 빠른 접근
- **정렬**: 힙 정렬 구현 가능
- **효율적인 삽입/삭제**: O(log n)

### 단점
- **검색 비효율**: 특정 값 검색 시 O(n)
- **순서 없음**: 같은 우선순위의 순서 보장 안됨
- **메모리 오버헤드**: 완전 이진 트리 구조

## 활용 사례
- 우선순위 큐
- 힙 정렬
- 다익스트라 알고리즘
- 작업 스케줄링
- 이벤트 처리 시스템 