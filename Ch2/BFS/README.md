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

## 구현

### Graph 클래스

```typescript
export class Graph {
    private graph: Map<string, string[]> = new Map();

    addVertex(vertex: string) {
        this.graph.set(vertex, []);
    }

    addEdge(vertex1: string, vertex2: string) {
        if (!this.graph.has(vertex1)) {
            this.addVertex(vertex1);
        }
        if (!this.graph.has(vertex2)) {
            this.addVertex(vertex2);
        }
        
        this.graph.get(vertex1)!.push(vertex2);
        this.graph.get(vertex2)!.push(vertex1); // 무방향 그래프
    }

    getNeighbors(vertex: string): string[] {
        return this.graph.get(vertex) || [];
    }
}
```

### BFS 함수

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

## 사용 예제

### 예제 그래프

```
    A
   / \
  B   C
  |   |\
  D   G H
  |\     \
  E F     I
          |
          J
```

### 코드 실행

```typescript
// 그래프 생성
const graph = new Graph();

// 정점 추가
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
graph.addVertex("H");
graph.addVertex("I");
graph.addVertex("J");

// 간선 추가
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "G");
graph.addEdge("C", "H");
graph.addEdge("C", "I");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("I", "J");

// BFS 실행
const result = bfs(graph, "A");
console.log(result); // ["A", "B", "C", "D", "G", "H", "I", "E", "F", "J"]
```

## 실행 결과

### 시작점: A
```
방문 순서: A -> B -> C -> D -> G -> H -> I -> E -> F -> J
```

**설명:**
- 레벨 0: A
- 레벨 1: B, C (A의 이웃)
- 레벨 2: D, G, H, I (B, C의 이웃)
- 레벨 3: E, F, J (D, I의 이웃)

### 시작점: C
```
방문 순서: C -> A -> G -> H -> I -> B -> J -> D -> E -> F
```

## 활용 사례

1. **최단 경로 찾기**: 가중치가 없는 그래프에서 두 정점 간의 최단 경로
2. **웹 크롤링**: 웹페이지 간의 링크를 따라가며 탐색
3. **소셜 네트워크**: 친구 관계에서 특정 거리 내의 모든 사용자 찾기
4. **게임 AI**: 체스나 체커에서 가능한 모든 이동 경로 탐색
5. **네트워크 라우팅**: 패킷이 목적지까지 가는 최단 경로 찾기

## DFS와의 비교

| 특징 | BFS | DFS |
|------|-----|-----|
| 탐색 방식 | 레벨별 (너비 우선) | 깊이 우선 |
| 자료구조 | 큐 (Queue) | 스택 (Stack) |
| 최단 경로 | 보장됨 | 보장되지 않음 |
| 메모리 사용량 | 높음 (같은 레벨의 모든 정점 저장) | 낮음 |
| 구현 방식 | 반복문 | 재귀 또는 반복문 |

## 주의사항

1. **무한 루프 방지**: 방문한 정점을 다시 방문하지 않도록 `visited` Set 사용
2. **큐의 특성**: FIFO 방식으로 정점을 처리하여 레벨별 탐색 보장
3. **메모리 고려**: 큰 그래프에서는 메모리 사용량이 많을 수 있음

## 실행 방법

```bash
# TypeScript 파일 실행
npx ts-node BFS.ts
```

## 파일 구조

```
BFS/
├── BFS.ts      # BFS 알고리즘 구현
└── README.md   # 이 파일
``` 