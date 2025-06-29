# Queue (큐)

## 개요
큐는 FIFO(First In, First Out) 원칙을 따르는 선형 자료구조입니다. 먼저 들어온 데이터가 먼저 나가는 구조로, 대기열이나 작업 스케줄링에 활용됩니다.

## 파일 구조
- `QueueTypes.ts`: 큐 관련 인터페이스 정의
- `Queue.ts`: 기본 큐 구현 (FIFO)
- `PriorityQueue.ts`: 우선순위 큐 구현
- `LIFOQueue.ts`: LIFO 큐 구현 (스택과 유사)
- `example.ts`: 다양한 큐 사용 예제

## 상세 해설

### QueueTypes.ts

#### 1. PriorityItem 인터페이스
```typescript
export interface PriorityItem<T> {
    value: T;
    priority: number;
}
```

**특징**:
- 우선순위 큐에서 사용하는 아이템 구조
- `value`: 실제 데이터
- `priority`: 우선순위 (낮은 숫자가 높은 우선순위)

#### 2. IQueue 인터페이스
```typescript
export interface IQueue<T> {
    enqueue(element: T, priority?: number): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
}
```

**주요 메서드**:
- `enqueue`: 큐에 요소 추가
- `dequeue`: 큐에서 요소 제거 및 반환
- `peek`: 맨 앞 요소 확인 (제거하지 않음)
- `isEmpty`: 큐가 비어있는지 확인
- `size`: 큐의 크기 반환
- `clear`: 큐 초기화

#### 3. IPriorityQueue 인터페이스
```typescript
export interface IPriorityQueue<T> extends IQueue<T> {
    enqueue(value: T, priority: number): void;
}
```

**특징**:
- IQueue를 확장
- `enqueue` 메서드에 우선순위 매개변수 필수

### Queue.ts

#### 기본 큐 구현 (FIFO)
```typescript
export class Queue<T> implements IQueue<T> {
    private items: T[] = [];

    enqueue(element: T): void {
        this.items.push(element);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }
}
```

**특징**:
- 배열을 사용한 간단한 구현
- `push()`: 배열 끝에 추가 (O(1))
- `shift()`: 배열 앞에서 제거 (O(n) - 비효율적)
- 실제 프로덕션에서는 연결 리스트 기반 구현 권장

### PriorityQueue.ts

#### 우선순위 큐 구현
```typescript
export class PriorityQueue<T> implements IPriorityQueue<T> {
    private items: PriorityItem<T>[] = [];

    enqueue(value: T, priority: number): void {
        const item: PriorityItem<T> = { value, priority };
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            if (item.priority < this.items[i].priority) {
                this.items.splice(i, 0, item);
                added = true;
                break;
            }
        }

        if (!added) {
            this.items.push(item);
        }
    }

    dequeue(): T | undefined {
        return this.items.shift()?.value;
    }

    peek(): T | undefined {
        return this.items[0]?.value;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }
}
```

**특징**:
- 우선순위에 따라 정렬된 배열 유지
- 삽입 시 적절한 위치에 배치 (O(n))
- 가장 높은 우선순위(낮은 숫자)가 먼저 나감
- 실제로는 힙 기반 구현이 더 효율적

### LIFOQueue.ts

#### LIFO 큐 구현 (스택과 유사)
```typescript
export class LIFOQueue<T> implements IQueue<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    enqueue(element: T): void {
        this.items.push(element);
    }

    dequeue(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }
}
```

**특징**:
- LIFO(Last In, First Out) 원칙
- `pop()`: 배열 끝에서 제거 (O(1))
- 스택과 동일한 동작
- 큐 인터페이스를 구현하지만 스택처럼 동작

### example.ts

#### 사용 예제
```typescript
// 기본 큐 사용 예시
const queue = new Queue<string>();
queue.enqueue('apple');
queue.enqueue('banana');

console.log(queue.dequeue()); // apple
console.log(queue.peek()); // banana
console.log(queue.size()); // 1

// 우선순위 큐 사용 예시
const priorityQueue = new PriorityQueue<string>();
priorityQueue.enqueue('중요한 작업', 1);    // 우선순위 1 (가장 높음)
priorityQueue.enqueue('일반 작업', 2);      // 우선순위 2
priorityQueue.enqueue('덜 중요한 작업', 3);  // 우선순위 3 (가장 낮음)

console.log(priorityQueue.dequeue()); // '중요한 작업' (우선순위가 가장 높은 것)
console.log(priorityQueue.peek());    // '일반 작업'
console.log(priorityQueue.size());    // 2
```

## 큐의 특징

### FIFO 원칙
- 먼저 들어온 데이터가 먼저 나감
- 대기열과 같은 자연스러운 구조

### 주요 연산
- **Enqueue**: 큐에 요소 추가
- **Dequeue**: 큐에서 요소 제거
- **Peek/Front**: 맨 앞 요소 확인

## 시간복잡도

### 배열 기반 구현
- **Enqueue**: O(1) - 배열 끝에 추가
- **Dequeue**: O(n) - 배열 앞에서 제거 (shift)
- **Peek**: O(1) - 첫 번째 요소 접근

### 연결 리스트 기반 구현
- **Enqueue**: O(1) - 끝에 추가
- **Dequeue**: O(1) - 앞에서 제거
- **Peek**: O(1) - 첫 번째 요소 접근

## 큐의 종류

### 1. 기본 큐 (FIFO)
- 가장 일반적인 큐
- 먼저 들어온 것이 먼저 나감

### 2. 우선순위 큐
- 우선순위에 따라 나가는 순서 결정
- 힙 기반 구현이 효율적

### 3. LIFO 큐
- 마지막에 들어온 것이 먼저 나감
- 스택과 동일한 동작

### 4. 원형 큐
- 고정 크기 배열 사용
- 메모리 효율적

## 장단점

### 장점
- **단순한 구조**: 이해하기 쉬움
- **효율적인 삽입**: O(1) 시간
- **자연스러운 대기열**: FIFO 원칙

### 단점
- **제한된 접근**: 중간 요소 접근 불가
- **배열 구현의 비효율성**: shift() 연산이 O(n)
- **크기 제한**: 일부 구현에서 고정 크기

## 활용 사례
- 작업 스케줄링
- 프린터 대기열
- 브레드퍼스트 탐색 (BFS)
- 이벤트 처리 시스템
- 네트워크 패킷 처리
- 게임의 턴 기반 시스템 