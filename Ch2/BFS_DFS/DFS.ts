import { Graph } from "./Graph";

/**
 * 깊이 우선 탐색 (Depth-First Search, DFS) 알고리즘
 * 
 * DFS는 그래프나 트리를 탐색하는 알고리즘으로, 한 경로를 끝까지 탐색한 후
 * 다른 경로로 돌아가서 탐색하는 방식입니다. 스택(Stack) 자료구조를 사용하여 구현됩니다.
 * 
 * @param graph - 탐색할 그래프 객체
 * @param start - 탐색을 시작할 정점
 * @returns 방문한 정점들의 순서 배열
 * 
 * @example
 * ```typescript
 * const graph = new Graph();
 * graph.addEdge("A", "B");
 * graph.addEdge("A", "C");
 * const result = dfs(graph, "A"); // ["A", "C", "B"]
 * ```
 */
export const dfs = (graph: Graph, start: string): string[] => {
    // 방문한 정점들을 저장할 배열 (결과 반환용)
    const result: string[] = [];
    
    // 이미 방문한 정점들을 추적하기 위한 Set (중복 방문 방지)
    const visited = new Set<string>();
    
    // DFS를 위한 스택 (LIFO: Last In, First Out)
    // 시작 정점을 스택에 추가
    const stack: string[] = [start];

    // 스택이 비어있을 때까지 반복 (모든 정점을 탐색할 때까지)
    while (stack.length > 0) {
        // 스택의 맨 위에서 정점을 꺼냄 (가장 최근에 추가된 정점)
        const current = stack.pop()!;

        // 현재 정점을 아직 방문하지 않았다면
        if (!visited.has(current)) {
            // 방문 표시
            visited.add(current);
            
            // 결과 배열에 추가 (방문 순서 기록)
            result.push(current);

            // 현재 정점의 모든 이웃을 가져옴
            const neighbors = graph.getNeighbors(current);
            
            // 이웃들을 스택에 추가 (Python 예제와 같은 순서를 위해 정순으로 추가)
            for (const neighbor of neighbors) {
                // 아직 방문하지 않은 이웃만 스택에 추가
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
    
    return result;
};

/**
 * 재귀를 사용한 깊이 우선 탐색 (DFS) 알고리즘
 * 
 * 반복문 대신 재귀를 사용하여 구현한 DFS입니다.
 * 코드가 더 간결하고 이해하기 쉽지만, 깊이가 깊은 그래프에서는
 * 스택 오버플로우가 발생할 수 있습니다.
 * 
 * @param graph - 탐색할 그래프 객체
 * @param start - 탐색을 시작할 정점
 * @returns 방문한 정점들의 순서 배열
 */
export const dfsRecursive = (graph: Graph, start: string): string[] => {
    const result: string[] = [];
    const visited = new Set<string>();

    /**
     * 재귀적으로 DFS를 수행하는 내부 함수
     * @param vertex - 현재 방문할 정점
     */
    const dfsHelper = (vertex: string): void => {
        // 이미 방문한 정점이면 종료
        if (visited.has(vertex)) {
            return;
        }

        // 방문 표시 및 결과에 추가
        visited.add(vertex);
        result.push(vertex);

        // 모든 이웃에 대해 재귀적으로 DFS 수행
        const neighbors = graph.getNeighbors(vertex);
        for (const neighbor of neighbors) {
            dfsHelper(neighbor);
        }
    };

    // 시작 정점부터 DFS 시작
    dfsHelper(start);
    return result;
};

/**
 * 목표 정점을 찾는 깊이 우선 탐색 (DFS) 알고리즘
 * 
 * 특정 목표 정점을 찾을 때까지 DFS를 수행합니다.
 * 목표를 찾으면 즉시 탐색을 중단하고 경로를 반환합니다.
 * 
 * @param graph - 탐색할 그래프 객체
 * @param start - 탐색을 시작할 정점
 * @param target - 찾고자 하는 목표 정점
 * @returns 시작점에서 목표점까지의 경로 (목표를 찾지 못하면 빈 배열)
 */
export const dfsFindPath = (graph: Graph, start: string, target: string): string[] => {
    const visited = new Set<string>();
    
    /**
     * 경로를 찾는 재귀 함수
     * @param vertex - 현재 정점
     * @param path - 현재까지의 경로
     * @returns 목표까지의 경로 또는 null
     */
    const dfsPathHelper = (vertex: string, path: string[]): string[] | null => {
        // 목표 정점을 찾았으면 경로 반환
        if (vertex === target) {
            return [...path, vertex];
        }

        // 이미 방문한 정점이면 null 반환
        if (visited.has(vertex)) {
            return null;
        }

        // 방문 표시
        visited.add(vertex);
        
        // 모든 이웃에 대해 경로 탐색
        const neighbors = graph.getNeighbors(vertex);
        for (const neighbor of neighbors) {
            const result = dfsPathHelper(neighbor, [...path, vertex]);
            if (result) {
                return result; // 경로를 찾았으면 즉시 반환
            }
        }

        return null; // 경로를 찾지 못함
    };

    const result = dfsPathHelper(start, []);
    return result || [];
};

// ===== 예제 그래프 생성 및 테스트 =====

/**
 * 테스트용 그래프 생성
 * 
 * 다음과 같은 구조의 그래프를 생성합니다:
 * 
    A
   / \
  B   C
  |   |\\
  D   G H I
  |\      \
  E F      J
  
 */
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

// 테스트 실행 (모듈이 직접 실행될 때만)
if (require.main === module) {
    console.log("=== DFS 알고리즘 테스트 ===\n");
    
    const graph = createExampleGraph();
    
    console.log("그래프 구조:");
    graph.printGraph();
    console.log();
    
    // 반복문을 사용한 DFS
    console.log("반복문 DFS (시작점: A):");
    const dfsResult = dfs(graph, "A");
    console.log(dfsResult.join(" -> "));
    console.log();
    
    // 재귀를 사용한 DFS
    console.log("재귀 DFS (시작점: A):");
    const dfsRecursiveResult = dfsRecursive(graph, "A");
    console.log(dfsRecursiveResult.join(" -> "));
    console.log();
    
    // 경로 찾기 테스트
    console.log("경로 찾기 (A -> J):");
    const path = dfsFindPath(graph, "A", "J");
    console.log(path.join(" -> "));
    console.log();
    
    console.log("경로 찾기 (C -> F):");
    const path2 = dfsFindPath(graph, "C", "F");
    console.log(path2.join(" -> "));
}
