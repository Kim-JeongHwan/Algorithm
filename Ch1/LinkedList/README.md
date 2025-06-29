# LinkedList (연결 리스트)

## 개요
연결 리스트는 노드들이 포인터로 연결된 선형 자료구조입니다. 각 노드는 데이터와 다음 노드를 가리키는 포인터를 가지고 있습니다.

## 파일 구조
- `NodeType.ts`: 노드 인터페이스, Node 클래스, NodeManager 클래스
- `LinkedList1.ts`: 기본 연결 리스트 생성 및 순회
- `LinkedList2.ts`: 정렬된 연결 리스트에 노드 삽입
- `LinkedList3.ts`: NodeManager를 사용한 연결 리스트 조작

## 상세 해설

### NodeType.ts

#### 1. INode 인터페이스
```typescript
export interface INode {
    data: number;
    prev: INode | null;
    next: INode | null;
}
```

**특징**:
- 양방향 연결 리스트를 위한 인터페이스
- `prev`: 이전 노드 포인터
- `next`: 다음 노드 포인터

#### 2. Node 클래스
```typescript
export class Node implements INode {
    data: number;
    prev: Node | null;
    next: Node | null;

    constructor(data: number, prev: Node | null = null, next: Node | null = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}
```

**특징**:
- INode 인터페이스 구현
- 기본값으로 null 설정
- 양방향 연결 지원

#### 3. NodeManager 클래스
```typescript
export class NodeManager {
    head: Node | null;
    tail: Node | null;

    constructor(data: number) {
        this.head = new Node(data);
        this.tail = this.head;
    }
}
```

**주요 메서드들**:

**insert(data: number)**: 끝에 노드 추가
```typescript
insert(data: number): void {
    if (!this.head) {
        this.head = new Node(data);
        this.tail = this.head;
        return;
    }

    let node = this.head;
    while (node.next) {
        node = node.next;
    }
    node.next = new Node(data);
    node.next.prev = node;
    this.tail = node.next;
}
```

**insertBefore(data: number, target: number)**: 특정 값 앞에 삽입
```typescript
insertBefore(data: number, target: number): void {
    if (!this.head) {
        this.head = new Node(data);
        this.tail = this.head;
        return;
    }

    let node = this.tail;
    while(node) {
        if (node.data === target) {
            const newNode = new Node(data, node.prev, node);
            if (node.prev) {
                node.prev.next = newNode;
            }
            break;
        }
        node = node.prev;
    }
}
```

**delete(data: number)**: 특정 값 삭제
```typescript
delete(data: number): void {
    if (!this.head) {
        console.log('해당 값을 가진 노드가 없습니다.');
        return;
    }

    if (this.head.data === data) {
        this.head = this.head.next;
        return;
    }

    let node = this.head;
    while (node.next) {
        if (node.next.data === data) {
            node.next = node.next.next; 
            return;
        }
        node = node.next;
    }
}
```

**searchFromHead(data: number)**: 헤드부터 검색
```typescript
searchFromHead(data: number): Node | null {
    let node = this.head;
    while (node) {
        if (node.data === data) {
            return node;
        }
        node = node.next;
    }
    return null;
}
```

**searchFromTail(data: number)**: 테일부터 검색
```typescript
searchFromTail(data: number): Node | null {
    let node = this.tail;
    while (node) {
        if (node.data === data) {
            return node;
        }
        node = node.prev;
    }
    return null;
}
```

### LinkedList1.ts

#### 기본 연결 리스트 생성 및 순회
```typescript
// 노드 생성 및 연결
const node1 = new Node(1);
const node2 = new Node(2);
node1.next = node2;
let head: Node | null = node1;

// 3부터 9까지 노드 추가
for (let index = 3; index < 10; index++) {
    add(head, index);
}

// 연결 리스트 순회하며 출력
let node: Node | null = head;
while (node && node.next) {
    console.log(node.data);
    node = node.next;
}
if (node) {
    console.log(node.data);
}
```

**특징**:
- 수동으로 노드 생성 및 연결
- `add` 함수로 노드 추가
- 순회하여 모든 노드 출력

### LinkedList2.ts

#### 정렬된 연결 리스트에 노드 삽입
```typescript
// 노드 생성 및 연결
const node1 = new Node(1);
const node2 = new Node(2);
node1.next = node2;
let head: Node | null = node1;

for (let index = 3; index < 10; index++) {
    add(head, index);
}

const node3 = new Node(1.5);
while (head && head.next) {
    if (head.data < node3.data && head.next.data > node3.data) {
        node3.next = head.next;
        head.next = node3;
        break;
    }
    head = head.next;
}
```

**특징**:
- 정렬된 상태 유지
- 적절한 위치에 새 노드 삽입
- `1.5`를 `1`과 `2` 사이에 삽입

### LinkedList3.ts

#### NodeManager를 사용한 연결 리스트 조작
```typescript
const linkedList1 = new NodeManager(0);
linkedList1.describe();
linkedList1.insert(1);

for (let index = 2; index < 11; index++) {
    linkedList1.insert(index);
}

linkedList1.describe();
console.log(linkedList1.searchFromHead(5));

linkedList1.insertBefore(10, 5);
linkedList1.describe();
```

**특징**:
- NodeManager 클래스 활용
- 체계적인 연결 리스트 관리
- 검색 및 삽입 기능 사용

## 연결 리스트의 특징

### 장점
- **동적 크기**: 런타임에 크기 조정 가능
- **삽입/삭제 효율성**: O(1) (위치가 주어진 경우)
- **메모리 효율성**: 필요한 만큼만 사용

### 단점
- **랜덤 접근 불가**: 인덱스로 직접 접근 불가
- **메모리 오버헤드**: 포인터 저장 공간 필요
- **캐시 비효율성**: 연속된 메모리 공간 아님

## 시간복잡도

### 기본 연산
- **접근**: O(n) - 순차 접근
- **검색**: O(n) - 선형 검색
- **삽입 (시작)**: O(1)
- **삽입 (끝)**: O(1) - tail 포인터 있으면
- **삽입 (중간)**: O(n) - 위치 찾기
- **삭제**: O(n) - 위치 찾기

## 연결 리스트 종류

### 1. 단방향 연결 리스트
- `next` 포인터만 존재
- 메모리 효율적

### 2. 양방향 연결 리스트
- `prev`, `next` 포인터 모두 존재
- 역방향 순회 가능

### 3. 원형 연결 리스트
- 마지막 노드가 첫 번째 노드 연결
- 순환 구조

## 활용 사례
- LRU 캐시 구현
- 브라우저 히스토리
- 실행 취소/다시 실행
- 다항식 표현
- 스택/큐 구현 