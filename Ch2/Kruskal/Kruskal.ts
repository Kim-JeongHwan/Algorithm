/**
 * 크루스칼 알고리즘 (Kruskal's Algorithm)
 * 
 * 최소 신장 트리(MST: Minimum Spanning Tree)를 찾는 그리디 알고리즘
 * 
 * 최소 신장 트리란?
 * - 그래프의 모든 정점을 연결하는 간선들의 부분 집합
 * - 사이클이 없어야 함 (트리 구조)
 * - 간선들의 가중치 합이 최소
 * 
 * 알고리즘 동작 과정:
 * 1. 모든 간선을 가중치 기준으로 오름차순 정렬
 * 2. 가중치가 가장 작은 간선부터 선택
 * 3. 선택한 간선이 사이클을 만들지 않으면 MST에 포함
 * 4. 사이클을 만들면 건너뛰기
 * 5. n-1개의 간선을 선택할 때까지 반복 (n = 정점의 개수)
 * 
 * 사이클 감지 방법:
 * - Union-Find (Disjoint Set) 자료구조 사용
 * - 두 정점이 이미 같은 집합에 속하면 사이클 발생
 * 
 * 시간 복잡도:
 * - O(E log E) : 간선 정렬에 걸리는 시간
 * - E = 간선의 개수
 */

/**
 * 간선을 표현하는 타입
 * [가중치, 시작 정점, 끝 정점]
 */
type Edge = [number, string, string];

/**
 * 그래프를 표현하는 타입
 */
type KruskalGraph = {
    vertices: string[];  // 정점 배열
    edges: Edge[];       // 간선 배열
};

/**
 * Union-Find (Disjoint Set) 자료구조
 * 
 * 목적: 서로소 집합(Disjoint Set)을 효율적으로 관리
 * 
 * 주요 연산:
 * 1. find(x): x가 속한 집합의 대표(루트)를 찾음
 * 2. union(x, y): x와 y가 속한 집합을 합침
 * 
 * 최적화 기법:
 * 1. 경로 압축 (Path Compression): find 연산 시 루트를 직접 가리키도록 갱신
 * 2. 랭크 기반 합치기 (Union by Rank): 트리의 높이가 낮은 쪽을 높은 쪽에 붙임
 * 
 * 시간 복잡도:
 * - find: 거의 O(1) (아커만 함수의 역함수)
 * - union: 거의 O(1)
 */
class UnionFind {
    // parent[i]: i의 부모 노드 (자기 자신이면 루트)
    private parent: Map<string, string>;
    // rank[i]: i를 루트로 하는 트리의 높이
    private rank: Map<string, number>;

    constructor(vertices: string[]) {
        this.parent = new Map();
        this.rank = new Map();
        
        // 초기화: 각 정점을 독립적인 집합으로 설정
        for (const vertex of vertices) {
            this.parent.set(vertex, vertex);  // 자기 자신이 부모 (루트)
            this.rank.set(vertex, 0);          // 초기 랭크는 0
        }
    }

    /**
     * x가 속한 집합의 루트(대표)를 찾음
     * 경로 압축 최적화: 찾는 과정에서 모든 노드가 루트를 직접 가리키도록 함
     * 
     * 예시: A -> B -> C (C가 루트)
     *       find(A) 호출 후: A -> C, B -> C
     */
    find(x: string): string {
        // x가 루트가 아니면 재귀적으로 루트를 찾음
        if (this.parent.get(x) !== x) {
            // 경로 압축: 부모를 루트로 직접 연결
            this.parent.set(x, this.find(this.parent.get(x)!));
        }
        return this.parent.get(x)!;
    }

    /**
     * x와 y가 속한 두 집합을 하나로 합침
     * 랭크 기반 합치기: 높이가 낮은 트리를 높은 트리에 붙임
     * 
     * @returns 합쳐졌으면 true, 이미 같은 집합이면 false
     */
    union(x: string, y: string): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);

        // 이미 같은 집합에 속함 (사이클 발생!)
        if (rootX === rootY) {
            return false;
        }

        // 랭크가 낮은 트리를 높은 트리에 붙임
        const rankX = this.rank.get(rootX)!;
        const rankY = this.rank.get(rootY)!;

        if (rankX < rankY) {
            this.parent.set(rootX, rootY);
        } else if (rankX > rankY) {
            this.parent.set(rootY, rootX);
        } else {
            // 랭크가 같으면 한쪽을 다른 쪽에 붙이고 랭크 증가
            this.parent.set(rootY, rootX);
            this.rank.set(rootX, rankX + 1);
        }

        return true;
    }
}

/**
 * 크루스칼 알고리즘으로 최소 신장 트리 찾기
 * 
 * @param graph 정점과 간선 정보를 담은 그래프
 * @returns 최소 신장 트리를 구성하는 간선들
 */
function kruskal(graph: KruskalGraph): Edge[] {
    const mst: Edge[] = [];  // Minimum Spanning Tree를 구성할 간선들
    const uf = new UnionFind(graph.vertices); // Union-Find 자료구조 생성 (초기화)

    // 1단계: 모든 간선을 가중치 기준으로 오름차순 정렬
    const sortedEdges = [...graph.edges].sort((a, b) => a[0] - b[0]);

    console.log("=== 간선 정렬 완료 ===");
    console.log("가중치 순서:", sortedEdges.map(e => `(${e[0]}, ${e[1]}-${e[2]})`).join(", "));
    console.log();

    // 2단계: 간선을 하나씩 확인하며 MST 구성
    for (const edge of sortedEdges) {
        const [weight, vertex1, vertex2] = edge;

        // 3단계: 사이클 확인 (두 정점이 이미 같은 집합에 속하는지)
        if (uf.union(vertex1, vertex2)) {
            // 사이클이 없으면 MST에 추가
            mst.push(edge);
            console.log(`✅ 간선 추가: ${vertex1} - ${vertex2} (가중치: ${weight})`);
            console.log(`   현재 MST 간선 수: ${mst.length}`);
        } else {
            // 사이클이 발생하면 건너뛰기
            console.log(`❌ 사이클 발생으로 건너뜀: ${vertex1} - ${vertex2} (가중치: ${weight})`);
        }

        // 4단계: n-1개의 간선을 선택했으면 종료
        if (mst.length === graph.vertices.length - 1) {
            console.log("\n🎉 MST 완성! (n-1개 간선 선택 완료)");
            break;
        }
    }

    return mst;
}

/**
 * 최소 신장 트리의 총 가중치 계산
 */
function calculateTotalWeight(mst: Edge[]): number {
    return mst.reduce((sum, edge) => sum + edge[0], 0);
}

// ============================================
// 테스트 코드
// ============================================

// 테스트 그래프 정의
const myGraph: KruskalGraph = {
    vertices: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    edges: [
        [7, 'A', 'B'],
        [5, 'A', 'D'],
        [8, 'B', 'C'],
        [9, 'B', 'D'],
        [7, 'B', 'E'],
        [5, 'C', 'E'],
        [7, 'D', 'E'],
        [6, 'D', 'F'],
        [8, 'E', 'F'],
        [9, 'E', 'G'],
        [11, 'F', 'G']
    ]
};

console.log('\n');
console.log('╔════════════════════════════════════════╗');
console.log('║     크루스칼 알고리즘 (Kruskal MST)    ║');
console.log('╚════════════════════════════════════════╝');
console.log('\n그래프 정보:');
console.log('정점:', myGraph.vertices.join(', '));
console.log('간선 수:', myGraph.edges.length);
console.log('\n간선 목록 (가중치, 시작점, 끝점):');
myGraph.edges.forEach((edge: Edge) => {
    console.log(`  ${edge[1]} - ${edge[2]}: ${edge[0]}`);
});

console.log('\n');
console.log('========================================');
console.log('크루스칼 알고리즘 실행');
console.log('========================================\n');

const mst = kruskal(myGraph);

console.log('\n');
console.log('========================================');
console.log('최종 결과');
console.log('========================================');
console.log('\n최소 신장 트리 (MST):');
mst.forEach((edge: Edge, index: number) => {
    console.log(`  ${index + 1}. ${edge[1]} - ${edge[2]}: ${edge[0]}`);
});

const totalWeight = calculateTotalWeight(mst);
console.log(`\n총 가중치: ${totalWeight}`);
console.log(`간선 개수: ${mst.length} (정점 수 ${myGraph.vertices.length} - 1)`);

// ============================================
// 추가 예제: 간단한 그래프
// ============================================

console.log('\n\n');
console.log('╔════════════════════════════════════════╗');
console.log('║         간단한 예제 그래프             ║');
console.log('╚════════════════════════════════════════╝\n');

const simpleGraph: KruskalGraph = {
    vertices: ['A', 'B', 'C', 'D'],
    edges: [
        [1, 'A', 'B'],
        [3, 'A', 'C'],
        [2, 'B', 'C'],
        [4, 'B', 'D'],
        [5, 'C', 'D']
    ]
};

console.log('그래프 구조:');
console.log('  A --1-- B');
console.log('  |   \\   |');
console.log('  3    2  4');
console.log('  |     \\ |');
console.log('  C --5-- D');
console.log();

const simpleMst = kruskal(simpleGraph);

console.log('\n최소 신장 트리:');
simpleMst.forEach((edge: Edge, index: number) => {
    console.log(`  ${index + 1}. ${edge[1]} - ${edge[2]}: ${edge[0]}`);
});
console.log(`\n총 가중치: ${calculateTotalWeight(simpleMst)}`);

console.log('\n\n💡 크루스칼 알고리즘의 핵심:');
console.log('  1. 간선을 가중치 순으로 정렬');
console.log('  2. 가중치가 작은 간선부터 선택');
console.log('  3. 사이클이 생기지 않는 간선만 추가');
console.log('  4. Union-Find로 사이클 효율적으로 감지');
console.log('  5. n-1개 간선 선택 시 완료\n');