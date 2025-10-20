/**
 * 최소 힙 (Min Heap) 구현
 * 
 * 힙이란?
 * - 완전 이진 트리 기반의 자료구조
 * - 배열로 구현하며, 인덱스 i의 노드에 대해:
 *   • 부모: Math.floor((i-1)/2)
 *   • 왼쪽 자식: 2*i + 1
 *   • 오른쪽 자식: 2*i + 2
 * 
 * 최소 힙의 특성:
 * - 부모 노드는 항상 자식 노드보다 작거나 같음
 * - 루트 노드(인덱스 0)가 항상 최소값
 * 
 * 왜 상향/하향 조정이 필요한가?
 * 1. push(): 새 요소를 맨 끝에 추가하면 힙 속성이 깨질 수 있음
 *    → 상향 조정(heapifyUp)으로 올바른 위치를 찾아 이동
 * 
 * 2. pop(): 루트를 제거하고 마지막 요소를 루트로 이동하면 힙 속성이 깨짐
 *    → 하향 조정(heapifyDown)으로 올바른 위치를 찾아 이동
 * 
 * 시간 복잡도:
 * - push(): O(log n)
 * - pop(): O(log n)
 * - peek (최소값 확인): O(1)
 */
class MinHeap<T> {
    private heap: [number, T][]; // [우선순위, 값] 형태로 저장

    constructor() {
        this.heap = [];
    }

    // 힙에 요소 추가
    push(priority: number, value: T): void {
        this.heap.push([priority, value]);
        this.heapifyUp();
    }

    /**
     * 최소값 제거 및 반환
     * 
     * 핵심 포인트: 
     * - 제거하려는 것: heap[0] (첫 번째 요소 = 최소값)
     * - 하지만 첫 번째를 바로 제거하면 배열에 구멍이 생김
     * - 그래서 "마지막 요소"를 "첫 번째 위치"로 옮기고, 배열 크기를 줄임
     * 
     * 단계별 동작:
     * 1. root = this.heap[0]
     *    → 반환할 최소값을 임시 저장 (예: [1, 3, 2, 7]에서 1을 저장)
     * 
     * 2. this.heap.pop()
     *    → 배열의 "마지막" 요소를 제거하고 반환 (예: 7을 제거하고 반환)
     *    → 배열 상태: [1, 3, 2] (길이가 4에서 3으로 줄어듦)
     * 
     * 3. this.heap[0] = (위에서 pop한 값)
     *    → 마지막 요소(7)를 첫 번째 위치에 덮어씀 (예: [7, 3, 2])
     * 
     * 4. this.heapifyDown()
     *    → 7을 올바른 위치로 내림 (예: [2, 3, 7])
     * 
     * 5. return root
     *    → 최초에 저장한 최소값(1)을 반환
     * 
     * 왜 이렇게 하나?
     * - 배열 중간을 제거하는 것은 O(n)의 비용
     * - 마지막 요소를 제거하는 것은 O(1)의 비용
     * - 따라서 "마지막을 제거해서 첫 번째에 넣고 재정렬"하는 것이 효율적
     */
    pop(): [number, T] | null {
        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop()!;
        }

        // 1단계: 반환할 최소값(루트)을 임시 저장
        const root = this.heap[0];
        
        // 2-3단계: 마지막 요소를 제거하여 첫 번째 위치로 이동
        //   - heap.pop(): 마지막 요소를 제거하고 반환 (배열 크기 감소)
        //   - heap[0] = ...: 그 값을 첫 번째 위치에 넣음
        this.heap[0] = this.heap.pop()!;
        
        // 4단계: 새로운 루트를 올바른 위치로 하향 조정
        this.heapifyDown();
        
        // 5단계: 원래의 최소값 반환
        return root;
    }

    // 힙이 비었는지 확인
    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    // 힙 크기 반환
    size(): number {
        return this.heap.length;
    }

    /**
     * 상향 조정 (Heapify Up)
     * 
     * 목적: 새로운 요소를 힙의 맨 끝에 추가한 후, 힙 속성을 복구하기 위해 사용
     * 
     * 힙 속성: 최소 힙에서는 부모 노드가 항상 자식 노드보다 작거나 같아야 함
     * 
     * 동작 과정:
     * 1. 새로 추가된 요소(맨 끝 인덱스)부터 시작
     * 2. 부모 노드와 비교 (부모 인덱스 = (현재 인덱스 - 1) / 2)
     * 3. 현재 노드가 부모보다 작으면 교환
     * 4. 루트에 도달하거나 부모보다 크거나 같을 때까지 반복
     * 
     * 예시: [1, 5, 3]에 0을 추가하면 [1, 5, 3, 0]
     *       0이 부모(5)보다 작으므로 교환 → [1, 0, 3, 5]
     *       0이 부모(1)보다 작으므로 교환 → [0, 1, 3, 5]
     */
    private heapifyUp(): void {
        let index = this.heap.length - 1; // 새로 추가된 요소의 인덱스
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2); // 부모 노드의 인덱스
            
            // 현재 노드가 부모 노드보다 작으면 교환 (최소 힙 속성)
            if (this.heap[index][0] < this.heap[parentIndex][0]) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex; // 부모 위치로 이동하여 계속 확인
            } else {
                break; // 힙 속성을 만족하면 종료
            }
        }
    }

    /**
     * 하향 조정 (Heapify Down)
     * 
     * 목적: 루트 노드를 제거한 후, 마지막 요소를 루트로 옮기고 힙 속성을 복구하기 위해 사용
     * 
     * 힙 속성: 최소 힙에서는 부모 노드가 항상 자식 노드보다 작거나 같아야 함
     * 
     * 동작 과정:
     * 1. 루트(인덱스 0)부터 시작
     * 2. 왼쪽 자식(2*i + 1), 오른쪽 자식(2*i + 2)과 비교
     * 3. 자식들 중 가장 작은 값을 찾음
     * 4. 현재 노드가 가장 작은 자식보다 크면 교환
     * 5. 리프 노드에 도달하거나 자식들보다 작거나 같을 때까지 반복
     * 
     * 예시: [1, 3, 2, 7, 5]에서 1(루트)을 제거하고 5를 루트로 이동 → [5, 3, 2, 7]
     *       5가 자식(2, 3) 중 최소값(2)보다 크므로 교환 → [2, 3, 5, 7]
     *       5가 자식(7)보다 작으므로 종료
     */
    private heapifyDown(): void {
        let index = 0; // 루트부터 시작
        
        while (true) {
            const leftChildIndex = index * 2 + 1;   // 왼쪽 자식 인덱스
            const rightChildIndex = index * 2 + 2;  // 오른쪽 자식 인덱스
            let smallest = index; // 현재 노드를 가장 작은 값으로 가정

            // 왼쪽 자식이 존재하고 현재 노드보다 작으면 smallest 업데이트
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex][0] < this.heap[smallest][0]) {
                smallest = leftChildIndex;
            }

            // 오른쪽 자식이 존재하고 현재 smallest보다 작으면 smallest 업데이트
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex][0] < this.heap[smallest][0]) {
                smallest = rightChildIndex;
            }

            // 현재 노드가 가장 작지 않으면 교환하고 계속 진행
            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                index = smallest; // 교환된 위치로 이동하여 계속 확인
            } else {
                break; // 힙 속성을 만족하면 종료
            }
        }
    }

    // 디버깅용
    getHeap(): [number, T][] {
        return [...this.heap];
    }
}

// 다익스트라 알고리즘 구현
type Graph = { [key: string]: { [key: string]: number } };

function dijkstra(graph: Graph, start: string): { [key: string]: number } {
    // 각 노드까지의 최단 거리를 저장
    const distances: { [key: string]: number } = {};
    
    // 모든 노드의 거리를 무한대로 초기화
    for (const node in graph) {
        distances[node] = Infinity;
    }
    distances[start] = 0;

    // 우선순위 큐 (최소 힙)
    const pq = new MinHeap<string>();
    pq.push(0, start);

    // 방문한 노드 집합
    const visited = new Set<string>();

    while (!pq.isEmpty()) {
        const current = pq.pop();
        if (!current) break;

        const [currentDistance, currentNode] = current;

        // 이미 방문한 노드는 스킵
        if (visited.has(currentNode)) {
            continue;
        }

        visited.add(currentNode);

        // 현재 노드와 연결된 모든 이웃 노드 확인
        for (const neighbor in graph[currentNode]) {
            const weight = graph[currentNode][neighbor];
            const distance = currentDistance + weight;

            // 더 짧은 경로를 찾으면 업데이트
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.push(distance, neighbor);
            }
        }
    }

    return distances;
}

/**
 * 다익스트라 알고리즘 (상세 로그 버전)
 * 각 단계를 콘솔에 출력하여 알고리즘의 동작을 이해하기 쉽게 함
 */
function dijkstraWithLog(graph: Graph, start: string): { [key: string]: number } {
    console.log('\n========================================');
    console.log('다익스트라 알고리즘 단계별 실행');
    console.log('========================================\n');
    
    // 각 노드까지의 최단 거리를 저장
    const distances: { [key: string]: number } = {};
    
    // 모든 노드의 거리를 무한대로 초기화
    console.log('📋 초기화 단계:');
    for (const node in graph) {
        distances[node] = Infinity;
    }
    distances[start] = 0;
    
    const distancesStr = Object.entries(distances)
        .map(([k, v]) => `${k}: ${v === Infinity ? '∞' : v}`)
        .join(', ');
    console.log(`  거리 배열: { ${distancesStr} }`);
    console.log(`  시작 노드: ${start}\n`);

    // 우선순위 큐 (최소 힙)
    const pq = new MinHeap<string>();
    pq.push(0, start);
    console.log(`  우선순위 큐에 (0, ${start}) 추가\n`);

    // 방문한 노드 집합
    const visited = new Set<string>();
    
    let step = 1;

    while (!pq.isEmpty()) {
        const current = pq.pop();
        if (!current) break;

        const [currentDistance, currentNode] = current;
        
        console.log(`${'='.repeat(40)}`);
        console.log(`🔍 Step ${step}: 노드 ${currentNode} 처리`);
        console.log(`${'='.repeat(40)}`);
        console.log(`  큐에서 꺼낸 값: (거리: ${currentDistance}, 노드: ${currentNode})`);

        // 이미 방문한 노드는 스킵
        if (visited.has(currentNode)) {
            console.log(`  ⏭️  이미 방문한 노드 → 스킵\n`);
            continue;
        }

        visited.add(currentNode);
        console.log(`  ✅ 노드 ${currentNode} 방문 처리`);
        console.log(`  현재 방문한 노드들: [${Array.from(visited).join(', ')}]`);

        // 현재 노드와 연결된 모든 이웃 노드 확인
        const neighbors = graph[currentNode];
        console.log(`\n  📍 노드 ${currentNode}의 이웃들 확인:`);
        
        let hasUpdate = false;
        for (const neighbor in neighbors) {
            const weight = neighbors[neighbor];
            const distance = currentDistance + weight;
            
            const oldDistance = distances[neighbor];
            const oldDistanceStr = oldDistance === Infinity ? '∞' : oldDistance;
            
            console.log(`\n    → 이웃 노드: ${neighbor}`);
            console.log(`      간선 가중치: ${currentNode} → ${neighbor} = ${weight}`);
            console.log(`      새로운 거리: ${currentDistance} + ${weight} = ${distance}`);
            console.log(`      기존 거리: ${oldDistanceStr}`);

            // 더 짧은 경로를 찾으면 업데이트
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.push(distance, neighbor);
                console.log(`      ✨ 업데이트! ${oldDistanceStr} → ${distance}`);
                console.log(`      우선순위 큐에 (${distance}, ${neighbor}) 추가`);
                console.log(`      💡 힙이 자동으로 우선순위(거리)에 따라 정렬!`);
                hasUpdate = true;
            } else {
                console.log(`      ❌ 업데이트 없음 (${distance} >= ${oldDistanceStr})`);
            }
        }
        
        if (!hasUpdate) {
            console.log(`\n  ℹ️  거리 업데이트 없음`);
        }
        
        // 현재 거리 배열 상태
        console.log(`\n  📊 현재 거리 배열:`);
        const currentDistancesStr = Object.entries(distances)
            .map(([k, v]) => {
                const distStr = v === Infinity ? '∞' : v;
                const mark = visited.has(k) ? '✓' : ' ';
                return `${k}: ${distStr}${mark}`;
            })
            .join(', ');
        console.log(`     { ${currentDistancesStr} }`);
        console.log(`     (✓ = 방문 완료)`);
        
        // 우선순위 큐 상태
        const pqState = pq.getHeap();
        if (pqState.length > 0) {
            const pqStr = pqState.map(([d, n]) => `(${d}, ${n})`).join(', ');
            console.log(`\n  📦 우선순위 큐 상태: [${pqStr}]`);
            
            // 최소값 표시
            const minValue = pqState[0];
            console.log(`     → 다음에 꺼낼 값: (${minValue[0]}, ${minValue[1]}) ← 가장 작은 거리!`);
            
            if (pqState.length > 1) {
                console.log(`     💡 힙은 최소값을 루트(첫 번째)에 유지합니다`);
                console.log(`        추가 순서와 상관없이 우선순위(거리)가 작은 것이 앞으로!`);
            }
        } else {
            console.log(`\n  📦 우선순위 큐: 비어있음`);
        }
        
        console.log();
        step++;
    }

    console.log(`${'='.repeat(40)}`);
    console.log('🎉 알고리즘 완료!');
    console.log(`${'='.repeat(40)}`);
    console.log('\n📊 최종 결과 (최단 거리):');
    for (const node in distances) {
        const dist = distances[node];
        const distStr = dist === Infinity ? '∞ (도달 불가)' : dist.toString();
        console.log(`  ${start} → ${node}: ${distStr}`);
    }
    console.log();

    return distances;
}

// ============================================
// 테스트 코드
// ============================================

const testGraph: Graph = {
    'A': { 'B': 2, 'C': 5 },
    'B': { 'A': 2, 'C': 3, 'D': 1 },
    'C': { 'A': 5, 'B': 3, 'D': 2 },
    'D': { 'B': 1, 'C': 2 }
};

console.log('\n');
console.log('╔════════════════════════════════════════╗');
console.log('║   다익스트라 알고리즘 상세 설명 버전   ║');
console.log('╚════════════════════════════════════════╝');
console.log('\n그래프 구조:');
console.log('  A --2--> B --1--> D');
console.log('  |        |        |');
console.log('  5        3        2');
console.log('  |        |        |');
console.log('  └------> C <------┘');
console.log('\n간선 정보:', JSON.stringify(testGraph, null, 2));

// 상세 로그 버전 실행
dijkstraWithLog(testGraph, 'A');

// ============================================
// MinHeap 참고 자료 (필요시 주석 해제)
// ============================================
console.log('\n\n');
console.log('╔════════════════════════════════════════╗');
console.log('║      MinHeap 간단 동작 확인           ║');
console.log('╚════════════════════════════════════════╝\n');

const queue = new MinHeap<string>();
queue.push(2, 'A');
queue.push(5, 'B');
queue.push(1, 'C');
queue.push(7, 'D');

console.log('요소 추가 순서: (2,A) → (5,B) → (1,C) → (7,D)');
console.log('힙 상태:', queue.getHeap());
console.log('\n💡 중요: 추가한 순서는 2 → 5 → 1 → 7 이었지만,');
console.log('         힙은 자동으로 최소값 1을 루트에 배치!');
console.log('         이것이 heapifyUp()의 역할입니다.\n');
console.log('트리 구조:');
console.log('       1(C)');
console.log('      /    \\');
console.log('   5(B)    2(A)');
console.log('   /');
console.log('7(D)');
console.log('\n→ 최소값이 루트에 위치: (1,C)');
console.log('→ 부모 < 자식 규칙 만족: 1<5, 1<2, 5<7\n');

console.log('pop() 순서 (최소값부터):');
while (!queue.isEmpty()) {
    console.log('  ', queue.pop());
}

// ============================================
// 아래는 Heap의 상세 동작 설명입니다.
// 필요하지 않다면 주석 처리할 수 있습니다.
// ============================================

/* 
// pop() 연산 상세 설명 예제
console.log('\n\n=== pop() 연산 단계별 설명 ===');
const demoHeap = new MinHeap<string>();
demoHeap.push(1, 'A');
demoHeap.push(3, 'B');
demoHeap.push(2, 'C');
demoHeap.push(7, 'D');

console.log('초기 힙 상태:', demoHeap.getHeap());
console.log('→ [[1,"A"], [3,"B"], [2,"C"], [7,"D"]]');
console.log('→ 트리 구조:      1(A)');
console.log('                 /    \\');
console.log('              3(B)    2(C)');
console.log('              /');
console.log('           7(D)');

console.log('\npop() 호출 시 내부 동작:');
console.log('1단계: root = heap[0] → 1(A)를 임시 저장 (나중에 반환할 값)');
console.log('2단계: heap.pop() → 마지막 요소 7(D) 제거, 배열 크기 줄어듦');
console.log('       현재 배열: [[1,"A"], [3,"B"], [2,"C"]]');
console.log('3단계: heap[0] = 7(D) → 첫 번째 위치에 7(D) 덮어쓰기');
console.log('       현재 배열: [[7,"D"], [3,"B"], [2,"C"]]');
console.log('4단계: heapifyDown() → 7(D)를 올바른 위치로 내림');
console.log('       7 > 3, 2 중 최소값 2 → 교환 → [[2,"C"], [3,"B"], [7,"D"]]');
console.log('5단계: return root → 1(A) 반환');

const popped = demoHeap.pop();
console.log('\npop() 결과:', popped);
console.log('pop() 후 힙 상태:', demoHeap.getHeap());
console.log('→ 최소값 1(A)는 제거되고, 나머지는 힙 속성을 유지');

console.log('\n핵심: heap[0]에 저장했던 값(1)과 heap.pop()으로 얻은 값(7)은 다름!');
console.log('     → heap[0]는 "첫 번째" 요소 (최소값)');
console.log('     → heap.pop()은 "마지막" 요소를 제거');
console.log('     → 마지막 요소를 첫 번째 위치로 옮기는 트릭!');

// 두 번째 pop 연산 상세 설명
console.log('\n\n=== 두 번째 pop() 연산 (질문한 케이스) ===');
console.log('현재 힙 상태: [[2,"C"], [3,"B"], [5,"?"], [7,"D"]]');
console.log('→ 트리 구조:      2(C)');
console.log('                 /    \\');
console.log('              3(B)    5(?)');
console.log('              /');
console.log('           7(D)');

// 실제 힙을 재구성해서 테스트
const testHeap2 = new MinHeap<string>();
testHeap2.push(2, 'C');
testHeap2.push(3, 'B');
testHeap2.push(5, 'X');
testHeap2.push(7, 'D');

console.log('\n초기 상태:', testHeap2.getHeap());
console.log('\npop() 호출 시 내부 동작:');
console.log('1단계: root = heap[0] → 2(C)를 임시 저장');
console.log('2단계: heap.pop() → 마지막 요소 7(D) 제거');
console.log('       배열: [[2,"C"], [3,"B"], [5,"X"]] (크기 4→3)');
console.log('3단계: heap[0] = 7(D) → 첫 번째 위치에 덮어쓰기');
console.log('       배열: [[7,"D"], [3,"B"], [5,"X"]]');
console.log('\n4단계: heapifyDown() 시작');
console.log('  → index = 0 (값 7)');
console.log('  → leftChildIndex = 0*2+1 = 1 (값 3)');
console.log('  → rightChildIndex = 0*2+2 = 2 (값 5)');
console.log('  → smallest = 0 (처음엔 현재 인덱스)');
console.log('  → 3 < 7 이므로 smallest = 1');
console.log('  → 5 > 3 이므로 smallest는 그대로 1');
console.log('  → smallest(1) ≠ index(0) 이므로 교환!');
console.log('  → [[3,"B"], [7,"D"], [5,"X"]]');
console.log('  → index = 1로 이동');
console.log('  → leftChildIndex = 1*2+1 = 3 (범위 밖!)');
console.log('  → 종료');
console.log('\n5단계: return root → 2(C) 반환');

const secondPop = testHeap2.pop();
console.log('\npop() 결과:', secondPop);
console.log('pop() 후 힙 상태:', testHeap2.getHeap());
console.log('\n✅ 맞습니다! 순서는 [3, 7, 5]가 됩니다!');
console.log('   → 3이 루트 (최소값)');
console.log('   → 7과 5는 3의 자식들');
console.log('   → 힙 속성: 3 < 7 and 3 < 5 ✓');

// 왼쪽/오른쪽 자식의 크기 관계 설명
console.log('\n\n=== 중요: 왼쪽과 오른쪽 자식의 크기 관계 ===');
console.log('현재 힙: [3, 7, 5]');
console.log('→ leftChild(7) > rightChild(5) ← 왼쪽이 오른쪽보다 큼!');
console.log('\n❓ 이게 괜찮은가요?');
console.log('✅ 네! 완전히 괜찮습니다!');
console.log('\n힙의 규칙:');
console.log('  1. 부모는 자식들보다 작아야 함 (최소 힙)');
console.log('  2. 왼쪽 자식과 오른쪽 자식 간의 크기는 상관없음!');
console.log('\n검증:');
console.log('  → 부모(3) < 왼쪽자식(7) ? YES ✓');
console.log('  → 부모(3) < 오른쪽자식(5) ? YES ✓');
console.log('  → 왼쪽(7) vs 오른쪽(5) ? 상관없음! ✓');
console.log('\n다른 예시들:');

// 예시 1: 왼쪽이 오른쪽보다 작은 경우
const example1 = new MinHeap<string>();
example1.push(1, 'A');
example1.push(2, 'B');
example1.push(5, 'C');
console.log('\n예시 1: [1, 2, 5] - 왼쪽(2) < 오른쪽(5)');
console.log('  힙 상태:', example1.getHeap());
console.log('  트리:   1');
console.log('         / \\');
console.log('        2   5');
console.log('  ✓ 유효한 힙');

// 예시 2: 왼쪽이 오른쪽보다 큰 경우  
const example2 = new MinHeap<string>();
example2.push(1, 'A');
example2.push(5, 'B');
example2.push(2, 'C');
console.log('\n예시 2: [1, 5, 2] - 왼쪽(5) > 오른쪽(2)');
console.log('  힙 상태:', example2.getHeap());
console.log('  트리:   1');
console.log('         / \\');
console.log('        5   2');
console.log('  ✓ 유효한 힙 (1 < 5 이고 1 < 2 이므로)');

console.log('\n핵심: 힙은 "부모-자식" 관계만 중요하고, "형제" 간 관계는 무시!');
console.log('     → 이것이 힙이 "부분 정렬" 자료구조인 이유');
console.log('     → 완전 정렬이 아니라서 O(log n)에 삽입/삭제 가능!');
*/

console.log('\n\n💡 힙의 상세 동작이 궁금하다면 위의 주석을 해제하세요!');