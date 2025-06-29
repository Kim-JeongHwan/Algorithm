# Stack (스택)

## 개요
스택은 LIFO(Last In, First Out) 원칙을 따르는 선형 자료구조입니다. 마지막에 들어온 데이터가 먼저 나가는 구조로, 함수 호출, 괄호 검사, 실행 취소 등에 활용됩니다.

## 파일 구조
- `Stack.ts`: 스택 클래스 구현 및 사용 예제

## 상세 해설

### Stack.ts

#### 1. IStack 인터페이스
```typescript
interface IStack<T> {
    push(element: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
}
```

**주요 메서드**:
- `push`: 스택에 요소 추가
- `pop`: 스택에서 요소 제거 및 반환
- `peek`: 맨 위 요소 확인 (제거하지 않음)
- `isEmpty`: 스택이 비어있는지 확인
- `size`: 스택의 크기 반환
- `clear`: 스택 초기화

#### 2. Stack 클래스 구현
```typescript
export class Stack<T> implements IStack<T> {
    private items: T[] = [];

    push(element: T): void {
        this.items.push(element);
    }

    pop(): T | undefined {
        return this.items.pop();
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

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
}
```

**특징**:
- 제네릭 타입 `<T>` 사용으로 다양한 타입 지원
- 배열을 내부 저장소로 사용
- `push()`: 배열 끝에 추가 (O(1))
- `pop()`: 배열 끝에서 제거 (O(1))
- `peek()`: 배열의 마지막 요소 접근 (O(1))

#### 3. 사용 예제
```typescript
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack);
stack.pop();
console.log(stack);
console.log(stack.peek());
console.log(stack.isEmpty());
console.log(stack.size());
stack.clear();
console.log(stack);
```

**실행 결과**:
- `stack.push(1)`: 스택에 1 추가
- `stack.push(2)`: 스택에 2 추가
- `stack.pop()`: 2 제거 및 반환
- `stack.peek()`: 현재 맨 위 요소 (1) 확인
- `stack.isEmpty()`: false (1이 남아있음)
- `stack.size()`: 1
- `stack.clear()`: 스택 초기화

## 스택의 특징

### LIFO 원칙
- 마지막에 들어온 데이터가 먼저 나감
- 접시 쌓기와 같은 자연스러운 구조

### 주요 연산
- **Push**: 스택에 요소 추가
- **Pop**: 스택에서 요소 제거
- **Peek/Top**: 맨 위 요소 확인

### 스택 포인터
- 현재 스택의 맨 위를 가리키는 포인터
- 배열 구현에서는 `length - 1` 인덱스

## 시간복잡도

### 모든 연산이 O(1)
- **Push**: O(1) - 배열 끝에 추가
- **Pop**: O(1) - 배열 끝에서 제거
- **Peek**: O(1) - 마지막 요소 접근
- **isEmpty**: O(1) - 길이 확인
- **Size**: O(1) - 길이 반환

## 스택의 장단점

### 장점
- **빠른 연산**: 모든 연산이 O(1) 시간복잡도
- **단순한 구조**: 이해하기 쉬움
- **메모리 효율성**: 필요한 만큼만 사용
- **타입 안전성**: 제네릭으로 타입 보장

### 단점
- **제한된 접근**: 맨 위 요소만 접근 가능
- **크기 제한**: 일부 구현에서 고정 크기
- **순서 제약**: LIFO 원칙으로 인한 제약

## 스택의 활용 사례

### 1. 함수 호출 스택
```typescript
function factorial(n: number): number {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```
- 재귀 함수 호출 시 스택 프레임 관리
- 각 함수 호출이 스택에 쌓임

### 2. 괄호 검사
```typescript
function isValidParentheses(s: string): boolean {
    const stack: string[] = [];
    const pairs = { '(': ')', '{': '}', '[': ']' };
    
    for (const char of s) {
        if (pairs[char]) {
            stack.push(char);
        } else {
            const top = stack.pop();
            if (!top || pairs[top] !== char) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}
```

### 3. 실행 취소 (Undo)
```typescript
class TextEditor {
    private undoStack: string[] = [];
    private redoStack: string[] = [];
    
    type(text: string) {
        this.undoStack.push(text);
        this.redoStack = []; // 새로운 입력 시 redo 스택 초기화
    }
    
    undo(): string | undefined {
        const text = this.undoStack.pop();
        if (text) {
            this.redoStack.push(text);
        }
        return text;
    }
    
    redo(): string | undefined {
        const text = this.redoStack.pop();
        if (text) {
            this.undoStack.push(text);
        }
        return text;
    }
}
```

### 4. 깊이 우선 탐색 (DFS)
```typescript
function dfs(graph: number[][], start: number): number[] {
    const visited: boolean[] = new Array(graph.length).fill(false);
    const stack: number[] = [start];
    const result: number[] = [];
    
    while (stack.length > 0) {
        const current = stack.pop()!;
        
        if (!visited[current]) {
            visited[current] = true;
            result.push(current);
            
            // 인접 노드들을 스택에 추가 (역순으로)
            for (let i = graph[current].length - 1; i >= 0; i--) {
                const neighbor = graph[current][i];
                if (!visited[neighbor]) {
                    stack.push(neighbor);
                }
            }
        }
    }
    
    return result;
}
```

### 5. 후위 표기법 계산
```typescript
function evaluatePostfix(expression: string): number {
    const stack: number[] = [];
    
    for (const token of expression.split(' ')) {
        if (/\d+/.test(token)) {
            stack.push(parseInt(token));
        } else {
            const b = stack.pop()!;
            const a = stack.pop()!;
            
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(a / b); break;
            }
        }
    }
    
    return stack.pop()!;
}
```

## 스택 구현 방식

### 1. 배열 기반 구현 (현재 구현)
- **장점**: 간단하고 직관적
- **단점**: 크기 제한 가능성

### 2. 연결 리스트 기반 구현
- **장점**: 동적 크기, 메모리 효율적
- **단점**: 포인터 오버헤드

### 3. 동적 배열 기반 구현
- **장점**: 자동 크기 조정
- **단점**: 재할당 비용

## 스택 오버플로우
- 스택이 가득 찬 상태에서 push 시도
- 재귀 함수에서 무한 호출 시 발생
- 메모리 부족으로 프로그램 중단 가능 