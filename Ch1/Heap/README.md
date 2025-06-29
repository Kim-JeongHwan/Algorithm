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

**동작 원리**:
- 루트를 자식들과 비교
- 더 큰 자식과 교환하고 아래로 이동
- 힙 성질이 만족되면 중단

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

### 힙 생성
- **하향식**: O(n)
- **상향식**: O(n log n)

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