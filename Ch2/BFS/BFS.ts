/**
 * 너비 우선 탐색 (Breadth-First Search) 구현
 * @param graph - 탐색할 그래프
 * @param start - 탐색을 시작할 정점
 * @returns BFS 순서로 방문한 정점들의 배열
 */
export const bfs = (graph: Graph, start: string) => {
    // 방문한 정점들을 순서대로 저장할 배열
    const result: string[] = [];
    // 방문 여부를 O(1) 시간에 확인하기 위한 Set
    const visited = new Set<string>();
    // BFS를 위한 큐 (FIFO: First In, First Out)
    const queue: string[] = [start];

    // 큐가 비어있을 때까지 반복
    while (queue.length > 0) {
        // 큐의 맨 앞에서 정점을 꺼냄 (FIFO)
        const current = queue.shift()!;
        
        // 현재 정점이 아직 방문하지 않았다면
        if (!visited.has(current)) {
            // 방문 표시
            visited.add(current);
            result.push(current);
            
            // 현재 정점의 모든 이웃들을 가져옴
            const neighbors = graph.getNeighbors(current);
            
            // 각 이웃에 대해
            for (const neighbor of neighbors) {
                // 아직 방문하지 않은 이웃이라면 큐에 추가
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
    }
    
    return result;
}

/**
 * 무방향 그래프를 표현하는 클래스
 * Map을 사용하여 각 정점과 그 이웃들을 저장
 */
export class Graph {
    // 정점을 키로 하고, 이웃 정점들의 배열을 값으로 하는 Map
    private graph: Map<string, string[]> = new Map();

    /**
     * 그래프에 새로운 정점을 추가
     * @param vertex - 추가할 정점
     */
    addVertex(vertex: string) {
        this.graph.set(vertex, []);
    }

    /**
     * 두 정점 사이에 간선을 추가 (무방향 그래프)
     * @param vertex1 - 첫 번째 정점
     * @param vertex2 - 두 번째 정점
     */
    addEdge(vertex1: string, vertex2: string) {
        // 정점이 존재하지 않으면 자동으로 추가
        if (!this.graph.has(vertex1)) {
            this.addVertex(vertex1);
        }
        if (!this.graph.has(vertex2)) {
            this.addVertex(vertex2);
        }
        
        // 양방향으로 간선 추가 (무방향 그래프이므로)
        this.graph.get(vertex1)!.push(vertex2);
        this.graph.get(vertex2)!.push(vertex1);
    }

    /**
     * 특정 정점의 모든 이웃을 반환
     * @param vertex - 이웃을 찾을 정점
     * @returns 이웃 정점들의 배열
     */
    getNeighbors(vertex: string): string[] {
        return this.graph.get(vertex) || [];
    }

    /**
     * 그래프의 구조를 콘솔에 출력 (디버깅용)
     */
    printGraph() {
        for (const [vertex, neighbors] of this.graph) {
            console.log(`${vertex}: [${neighbors.join(', ')}]`);
        }
    }
}

// 예제 그래프 생성
export const graph = new Graph();

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

// 간선 추가 (주어진 예제에 따라)
// A는 B, C와 연결
graph.addEdge("A", "B");
graph.addEdge("A", "C");
// B는 A, D와 연결 (A는 이미 위에서 추가됨)
graph.addEdge("B", "D");
// C는 A, G, H, I와 연결 (A는 이미 위에서 추가됨)
graph.addEdge("C", "G");
graph.addEdge("C", "H");
graph.addEdge("C", "I");
// D는 B, E, F와 연결 (B는 이미 위에서 추가됨)
graph.addEdge("D", "E");
graph.addEdge("D", "F");
// E는 D와 연결 (D는 이미 위에서 추가됨)
// F는 D와 연결 (D는 이미 위에서 추가됨)
// G는 C와 연결 (C는 이미 위에서 추가됨)
// H는 C와 연결 (C는 이미 위에서 추가됨)
// I는 C, J와 연결 (C는 이미 위에서 추가됨)
graph.addEdge("I", "J");
// J는 I와 연결 (I는 이미 위에서 추가됨)

// BFS 실행 예제
console.log("=== 그래프 구조 ===");
graph.printGraph();

console.log("\n=== BFS 결과 (시작점: A) ===");
const bfsResult = bfs(graph, "A");
console.log("방문 순서:", bfsResult.join(" -> "));
console.log("설명: A에서 시작하여 같은 레벨의 모든 정점을 먼저 방문한 후 다음 레벨로 이동");

console.log("\n=== BFS 결과 (시작점: C) ===");
const bfsResult2 = bfs(graph, "C");
console.log("방문 순서:", bfsResult2.join(" -> "));
console.log("설명: C에서 시작하여 같은 레벨의 모든 정점을 먼저 방문한 후 다음 레벨로 이동");