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