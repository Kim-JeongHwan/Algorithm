# 그래프 탐색 알고리즘: BFS와 DFS

## 개요

이 폴더는 그래프나 트리를 탐색하는 두 가지 주요 알고리즘인 **너비 우선 탐색(BFS)**과 **깊이 우선 탐색(DFS)**을 구현한 코드를 포함합니다.

## 알고리즘 비교

| 특징 | BFS (Breadth-First Search) | DFS (Depth-First Search) |
|------|---------------------------|-------------------------|
| **탐색 방식** | 레벨별 (너비 우선) | 깊이 우선 |
| **자료구조** | 큐 (Queue) - FIFO | 스택 (Stack) - LIFO |
| **최단 경로** | 가중치 없는 그래프에서 보장 | 보장되지 않음 |
| **메모리 사용량** | 높음 (같은 레벨의 모든 정점 저장) | 낮음 |
| **구현 방식** | 반복문 | 재귀 또는 반복문 |
| **적합한 상황** | 최단 경로 찾기, 레벨별 탐색 | 백트래킹, 깊은 탐색 |

---

# 너비 우선 탐색 (Breadth-First Search, BFS)

## 개요

너비 우선 탐색(BFS)은 그래프나 트리를 탐색하는 알고리즘으로, 시작 정점에서 가까운 정점들을 우선적으로 방문하는 방식입니다. 큐(Queue) 자료구조를 사용하여 구현됩니다.

## 특징

- **레벨별 탐색**: 같은 레벨의 모든 정점을 먼저 방문한 후 다음 레벨로 이동
- **최단 경로**: 가중치가 없는 그래프에서 두 정점 간의 최단 경로를 찾을 수 있음
- **완전 탐색**: 연결된 모든 정점을 방문
- **큐 사용**: FIFO(First In, First Out) 방식으로 정점을 처리

## 동작 원리

1. 시작 정점을 큐에 넣고 방문 표시
2. 큐에서 정점을 꺼내고 처리
3. 해당 정점의 모든 이웃을 큐에 추가 (아직 방문하지 않은 경우)
4. 큐가 비어있을 때까지 2-3단계 반복

## 시간복잡도

- **시간복잡도**: O(V + E)
  - V: 정점(Vertex)의 개수
  - E: 간선(Edge)의 개수
- **공간복잡도**: O(V)
  - 큐와 방문 배열에 필요한 공간

## BFS 구현

```typescript
export const bfs = (graph: Graph, start: string) => {
    const result: string[] = [];
    const visited = new Set<string>();
    const queue: string[] = [start];

    while (queue.length > 0) {
        const current = queue.shift()!;
        
        if (!visited.has(current)) {
            visited.add(current);
            result.push(current);
            
            const neighbors = graph.getNeighbors(current);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
    }
    
    return result;
}
```

## BFS 실행 결과

### 시작점: A
```
방문 순서: A -> B -> C -> D -> G -> H -> I -> E -> F -> J
```

**설명:**
- 레벨 0: A
- 레벨 1: B, C (A의 이웃)
- 레벨 2: D, G, H, I (B, C의 이웃)
- 레벨 3: E, F, J (D, I의 이웃)

---

# 깊이 우선 탐색 (Depth-First Search, DFS)

## 개요

깊이 우선 탐색(DFS)은 그래프나 트리를 탐색하는 알고리즘으로, 한 경로를 끝까지 탐색한 후 다른 경로로 돌아가서 탐색하는 방식입니다. 스택(Stack) 자료구조를 사용하여 구현됩니다.

## 특징

- **깊이 우선**: 한 경로를 끝까지 탐색한 후 백트래킹
- **메모리 효율적**: 현재 경로만 저장하므로 메모리 사용량이 적음
- **백트래킹**: 탐색 실패 시 이전 정점으로 돌아가 다른 경로 시도
- **스택 사용**: LIFO(Last In, First Out) 방식으로 정점을 처리

## 동작 원리

1. 시작 정점을 스택에 넣고 방문 표시
2. 스택에서 정점을 꺼내고 처리
3. 해당 정점의 모든 이웃을 스택에 추가 (아직 방문하지 않은 경우)
4. 스택이 비어있을 때까지 2-3단계 반복

## 시간복잡도

- **시간복잡도**: O(V + E)
  - V: 정점(Vertex)의 개수
  - E: 간선(Edge)의 개수
- **공간복잡도**: O(V)
  - 스택과 방문 배열에 필요한 공간

## DFS 구현

### 반복문을 사용한 DFS

```typescript
export const dfs = (graph: Graph, start: string): string[] => {
    const result: string[] = [];
    const visited = new Set<string>();
    const stack: string[] = [start];

    while (stack.length > 0) {
        const current = stack.pop()!;

        if (!visited.has(current)) {
            visited.add(current);
            result.push(current);

            const neighbors = graph.getNeighbors(current);
            // 역순으로 추가하여 올바른 방문 순서 보장
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const neighbor = neighbors[i];
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
    
    return result;
};
```

### 재귀를 사용한 DFS

```typescript
export const dfsRecursive = (graph: Graph, start: string): string[] => {
    const result: string[] = [];
    const visited = new Set<string>();

    const dfsHelper = (vertex: string): void => {
        if (visited.has(vertex)) {
            return;
        }

        visited.add(vertex);
        result.push(vertex);

        const neighbors = graph.getNeighbors(vertex);
        for (const neighbor of neighbors) {
            dfsHelper(neighbor);
        }
    };

    dfsHelper(start);
    return result;
};
```

### 경로 찾기 DFS

```typescript
export const dfsFindPath = (graph: Graph, start: string, target: string): string[] => {
    const visited = new Set<string>();
    
    const dfsPathHelper = (vertex: string, path: string[]): string[] | null => {
        if (vertex === target) {
            return [...path, vertex];
        }

        if (visited.has(vertex)) {
            return null;
        }

        visited.add(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (const neighbor of neighbors) {
            const result = dfsPathHelper(neighbor, [...path, vertex]);
            if (result) {
                return result;
            }
        }

        return null;
    };

    const result = dfsPathHelper(start, []);
    return result || [];
};
```

## DFS 실행 결과

### 시작점: A
```
방문 순서: A -> C -> I -> J -> H -> G -> B -> D -> F -> E
```

**설명:**
- A에서 시작하여 C로 이동
- C에서 I로 이동하여 J까지 깊이 탐색
- 백트래킹하여 H, G 탐색
- 다시 A로 돌아가 B로 이동하여 D, F, E 순서로 탐색

---

# 예제 그래프

다음과 같은 구조의 그래프를 사용하여 테스트합니다:

```
    A
   / \
  B   C
  |   |\\
  D   G H I
  |\      \
  E F      J
```

## 그래프 생성

```typescript
export const createExampleGraph = (): Graph => {
    const graph = new Graph();

    // 정점들 추가
    const vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    vertices.forEach(vertex => graph.addVertex(vertex));

    // 간선들 추가 (무방향 그래프)
    const edges = [
        ["A", "B"], ["A", "C"], ["B", "D"], ["C", "G"],
        ["C", "H"], ["C", "I"], ["D", "E"], ["D", "F"], ["I", "J"]
    ];
    
    edges.forEach(([v1, v2]) => graph.addEdge(v1, v2));

    return graph;
};
```

---

# 활용 사례

## BFS 활용 사례

1. **최단 경로 찾기**: 가중치가 없는 그래프에서 두 정점 간의 최단 경로
2. **웹 크롤링**: 웹페이지 간의 링크를 따라가며 탐색
3. **소셜 네트워크**: 친구 관계에서 특정 거리 내의 모든 사용자 찾기
4. **게임 AI**: 체스나 체커에서 가능한 모든 이동 경로 탐색
5. **네트워크 라우팅**: 패킷이 목적지까지 가는 최단 경로 찾기

## DFS 활용 사례

1. **백트래킹**: 퍼즐 해결, 스도쿠, N-퀸 문제
2. **위상 정렬**: 의존성이 있는 작업들의 순서 결정
3. **연결 요소 찾기**: 그래프의 연결된 부분들 찾기
4. **사이클 감지**: 그래프에서 사이클 존재 여부 확인
5. **미로 찾기**: 미로에서 출구까지의 경로 찾기

---

# 주의사항

## BFS 주의사항

1. **무한 루프 방지**: 방문한 정점을 다시 방문하지 않도록 `visited` Set 사용
2. **큐의 특성**: FIFO 방식으로 정점을 처리하여 레벨별 탐색 보장
3. **메모리 고려**: 큰 그래프에서는 메모리 사용량이 많을 수 있음

## DFS 주의사항

1. **스택 오버플로우**: 재귀 구현 시 깊이가 깊은 그래프에서 스택 오버플로우 발생 가능
2. **무한 루프 방지**: 방문한 정점을 다시 방문하지 않도록 `visited` Set 사용
3. **최단 경로 미보장**: DFS는 최단 경로를 보장하지 않음

---

# 실행 방법

```bash
# BFS 테스트 실행
npx ts-node BFS.ts

# DFS 테스트 실행
npx ts-node DFS.ts
```

## 실행 결과 예시

```
=== BFS 알고리즘 테스트 ===

그래프 구조:
A: [B, C]
B: [A, D]
C: [A, G, H, I]
D: [B, E, F]
E: [D]
F: [D]
G: [C]
H: [C]
I: [C, J]
J: [I]

BFS (시작점: A):
방문 순서: A -> B -> C -> D -> G -> H -> I -> E -> F -> J

=== DFS 알고리즘 테스트 ===

그래프 구조:
A: [B, C]
B: [A, D]
C: [A, G, H, I]
D: [B, E, F]
E: [D]
F: [D]
G: [C]
H: [C]
I: [C, J]
J: [I]

반복문 DFS (시작점: A):
방문 순서: A -> C -> I -> J -> H -> G -> B -> D -> F -> E

재귀 DFS (시작점: A):
방문 순서: A -> B -> D -> E -> F -> C -> G -> H -> I -> J

경로 찾기 (A -> J):
경로: A -> C -> I -> J

경로 찾기 (C -> F):
경로: C -> A -> B -> D -> F
```

---

# 파일 구조

```
BFS_DFS/
├── BFS.ts      # BFS 알고리즘 구현
├── DFS.ts      # DFS 알고리즘 구현 (반복문, 재귀, 경로 찾기)
├── Graph.ts    # 그래프 클래스 구현
└── README.md   # 이 파일
```

---

# 추가 학습 자료

- [BFS vs DFS - GeeksforGeeks](https://www.geeksforgeeks.org/difference-between-bfs-and-dfs/)
- [Graph Traversal - Wikipedia](https://en.wikipedia.org/wiki/Graph_traversal)
- [Breadth-First Search - Wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search)
- [Depth-First Search - Wikipedia](https://en.wikipedia.org/wiki/Depth-first_search) 