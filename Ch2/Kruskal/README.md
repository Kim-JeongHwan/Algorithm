# 크루스칼 알고리즘 (Kruskal's Algorithm)

## 목차
- [개념](#개념)
- [최소 신장 트리(MST)란?](#최소-신장-트리mst란)
- [특징](#특징)
- [동작 원리](#동작-원리)
- [Union-Find 자료구조](#union-find-자료구조)
  - [기본 개념](#기본-개념)
  - [주요 연산](#주요-연산)
  - [경로 압축 (Path Compression)](#경로-압축-path-compression)
  - [재귀 실행 과정 상세 설명](#재귀-실행-과정-상세-설명)
  - [랭크 기반 합치기 (Union by Rank)](#랭크-기반-합치기-union-by-rank)
- [알고리즘 구현](#알고리즘-구현)
- [시간 복잡도](#시간-복잡도)
- [실행 예시](#실행-예시)
- [장점과 단점](#장점과-단점)
- [실행 방법](#실행-방법)

---

## 개념

크루스칼 알고리즘은 **가중치가 있는 무방향 그래프**에서 **최소 신장 트리(Minimum Spanning Tree, MST)**를 찾는 그리디 알고리즘입니다.

간선을 가중치 순으로 정렬한 후, 사이클을 만들지 않는 간선들을 선택하여 최소 비용으로 모든 정점을 연결합니다.

## 최소 신장 트리(MST)란?

**신장 트리(Spanning Tree)**
- 그래프의 모든 정점을 포함하는 트리
- n개의 정점을 가진 그래프의 신장 트리는 n-1개의 간선을 가짐
- 사이클이 없어야 함

**최소 신장 트리(Minimum Spanning Tree)**
- 여러 신장 트리 중에서 간선 가중치의 합이 최소인 트리
- 네트워크 설계, 도로 건설, 통신망 구축 등에 활용

### 예시
```
원본 그래프:
  A --7-- B
  |       |
  5       8
  |       |
  C --9-- D

가능한 신장 트리들:
1. A-B(7), A-C(5), C-D(9) = 총 21
2. A-B(7), A-C(5), B-D(8) = 총 20  ← 최소 신장 트리!
3. A-C(5), B-D(8), C-D(9) = 총 22
```

## 특징

- **알고리즘 종류**: 그리디 알고리즘
- **시간 복잡도**: O(E log E) - E는 간선의 개수
- **공간 복잡도**: O(V) - V는 정점의 개수
- **적용 대상**: 가중치가 있는 무방향 그래프
- **핵심 자료구조**: Union-Find (Disjoint Set)
- **결과**: 항상 최적해를 보장

## 동작 원리

크루스칼 알고리즘은 다음 5단계로 동작합니다:

### 1. 간선 정렬
모든 간선을 가중치 기준으로 **오름차순 정렬**

```
정렬 전: [(7,A,B), (5,A,D), (8,B,C), (9,B,D)]
정렬 후: [(5,A,D), (7,A,B), (8,B,C), (9,B,D)]
```

### 2. 초기화
각 정점을 독립적인 집합으로 초기화 (Union-Find 자료구조 사용)

```
초기 상태: {A}, {B}, {C}, {D}
```

### 3. 간선 선택
정렬된 간선을 순서대로 확인하며, **사이클을 만들지 않는 간선만 선택**

```
간선 (5,A,D): A와 D가 다른 집합 → 선택! ✅
    → 집합 상태: {A,D}, {B}, {C}

간선 (7,A,B): A와 B가 다른 집합 → 선택! ✅
    → 집합 상태: {A,B,D}, {C}

간선 (8,B,C): B와 C가 다른 집합 → 선택! ✅
    → 집합 상태: {A,B,C,D}

간선 (9,B,D): B와 D가 같은 집합 → 사이클 발생! ❌ 건너뜀
```

### 4. 종료 조건
**n-1개의 간선**을 선택하면 알고리즘 종료 (n = 정점의 개수)

```
4개 정점 → 3개 간선 선택 시 종료
```

### 5. 결과
선택된 간선들이 최소 신장 트리를 구성

```
MST: [(5,A,D), (7,A,B), (8,B,C)]
총 가중치: 5 + 7 + 8 = 20
```

## Union-Find 자료구조

크루스칼 알고리즘의 핵심은 **사이클 감지**입니다. 이를 효율적으로 수행하기 위해 **Union-Find (Disjoint Set)** 자료구조를 사용합니다.

### 기본 개념

Union-Find는 **서로소 집합(Disjoint Set)**을 관리하는 자료구조입니다.

```
초기 상태: 각 원소가 독립적인 집합
{A}, {B}, {C}, {D}, {E}

union(A, B) 후:
{A, B}, {C}, {D}, {E}

union(C, D) 후:
{A, B}, {C, D}, {E}

union(A, C) 후:
{A, B, C, D}, {E}
```

### 주요 연산

#### 1. find(x): x가 속한 집합의 대표(루트) 찾기

```typescript
find(x: string): string {
    if (this.parent.get(x) !== x) {
        // 경로 압축: 부모를 루트로 직접 연결
        this.parent.set(x, this.find(this.parent.get(x)!));
    }
    return this.parent.get(x)!;
}
```

**동작 방식:**
```
A → B → C → D (D가 루트)

find(A) 호출 시:
1. A의 부모는 B → find(B) 재귀 호출
2. B의 부모는 C → find(C) 재귀 호출
3. C의 부모는 D → find(D) 재귀 호출
4. D의 부모는 D → D 반환 (루트 발견!)
5. 재귀가 돌아오면서 모든 노드를 D에 직접 연결

결과: A → D, B → D, C → D (경로 압축 완료!)
```

#### 2. union(x, y): x와 y가 속한 두 집합 합치기

```typescript
union(x: string, y: string): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);

    // 이미 같은 집합 → 사이클 발생!
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
        this.parent.set(rootY, rootX);
        this.rank.set(rootX, rankX + 1);
    }

    return true;
}
```

### 경로 압축 (Path Compression)

경로 압축은 `find` 연산의 성능을 최적화하는 핵심 기법입니다.

#### 경로 압축 없이

```
초기: A → B → C → D (D가 루트)

find(A) 호출 시:
- A → B → C → D (4번 탐색)
- 상태 변화 없음

다음 find(A) 호출 시:
- 또 다시 A → B → C → D (4번 탐색)
```

#### 경로 압축 적용

```
초기: A → B → C → D (D가 루트)

find(A) 첫 호출 시:
- 탐색하면서 경로상의 모든 노드를 루트에 직접 연결
- 결과: A → D, B → D, C → D

다음 find(A) 호출 시:
- A → D (1번만 탐색!) ← O(1)에 가까운 성능
```

### 재귀 실행 과정 상세 설명

**핵심 질문**: `parent.set()`은 언제 실행되나요?

**답**: 재귀가 **돌아오는(unwinding) 과정**에서 실행됩니다!

```typescript
this.parent.set(x, this.find(this.parent.get(x)!));
//               ↑
//            이것이 먼저 실행됨 (재귀 호출)
//        ↑
//     재귀가 반환된 후 실행됨 (set)
```

#### 단계별 실행 과정

**초기 상태**: `A → B → C → D` (D가 루트)

**`find(A)` 호출 시:**

```
📍 1단계: 재귀 호출 (내려가기 - Going Down)

find(A) 호출
 ↓ A ≠ parent[A](B) → 재귀 호출
 └─> find(B) 호출
      ↓ B ≠ parent[B](C) → 재귀 호출
      └─> find(C) 호출
           ↓ C ≠ parent[C](D) → 재귀 호출
           └─> find(D) 호출
                ✅ D = parent[D] → 루트 발견!
                return D

📍 2단계: 재귀 반환 (올라오기 - Unwinding)

           find(D) returns D
           ↓
      find(C) 재개
      → root = D를 받음
      → parent[C] = D 실행! ✅
      → return D
      ↓
 find(B) 재개
 → root = D를 받음
 → parent[B] = D 실행! ✅
 → return D
 ↓
find(A) 재개
→ root = D를 받음
→ parent[A] = D 실행! ✅
→ return D

📍 3단계: 최종 결과

변경 전: A → B → C → D
변경 후: A → D, B → D, C → D

모든 노드가 루트를 직접 가리킴!
```

#### 왜 이렇게 동작하나요?

```typescript
// 루트를 먼저 알아야 set을 할 수 있습니다
const root = this.find(this.parent.get(x)!);  // 1. 루트 찾기 (재귀)
this.parent.set(x, root);                      // 2. 루트를 이용해 set

// 한 줄로 작성하면:
this.parent.set(x, this.find(this.parent.get(x)!));
//                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                  이것이 먼저 완료되어야 set 가능!
```

**핵심 포인트:**
1. `find()` 재귀 호출이 먼저 실행됨 (루트를 찾을 때까지)
2. 루트를 찾으면 그 값이 반환됨
3. 반환된 값(root)을 받아서 `set()` 실행
4. 따라서 `set()`은 재귀가 돌아오는 과정에서 실행됨

#### 시각화된 실행 순서

```
실행 순서 타임라인:

시간 →
1. find(A) 시작
2.   find(B) 시작
3.     find(C) 시작
4.       find(D) 시작
5.       find(D) 반환 D ← 루트 발견!
6.     set(C, D) 실행 ← 재귀 반환 시점!
7.     find(C) 반환 D
8.   set(B, D) 실행   ← 재귀 반환 시점!
9.   find(B) 반환 D
10. set(A, D) 실행    ← 재귀 반환 시점!
11. find(A) 반환 D
```

### 랭크 기반 합치기 (Union by Rank)

트리의 높이를 최소화하여 `find` 연산을 빠르게 만드는 기법입니다.

#### 랭크 없이 union

```
집합 1: A → B → C (높이 3)
집합 2: D (높이 1)

단순히 D를 A에 붙이면:
A → B → C
         ↓
         D
높이가 4로 증가! 😞
```

#### 랭크 기반 union

```
집합 1: A → B → C (rank 3)
집합 2: D (rank 1)

rank가 낮은 D를 높은 A에 붙임:
A → B → C
↑
D
높이가 3으로 유지! 😊
```

**코드:**
```typescript
if (rankX < rankY) {
    this.parent.set(rootX, rootY);  // X를 Y에 붙임
} else if (rankX > rankY) {
    this.parent.set(rootY, rootX);  // Y를 X에 붙임
} else {
    this.parent.set(rootY, rootX);  // 같으면 한쪽에 붙이고
    this.rank.set(rootX, rankX + 1); // rank 증가
}
```

## 알고리즘 구현

### 전체 코드 구조

```typescript
type Edge = [number, string, string];  // [가중치, 정점1, 정점2]

type KruskalGraph = {
    vertices: string[];  // 정점 배열
    edges: Edge[];       // 간선 배열
};

function kruskal(graph: KruskalGraph): Edge[] {
    const mst: Edge[] = [];
    const uf = new UnionFind(graph.vertices);

    // 1. 간선을 가중치 순으로 정렬
    const sortedEdges = [...graph.edges].sort((a, b) => a[0] - b[0]);

    // 2. 간선을 하나씩 확인
    for (const edge of sortedEdges) {
        const [weight, vertex1, vertex2] = edge;

        // 3. 사이클 확인 및 추가
        if (uf.union(vertex1, vertex2)) {
            mst.push(edge);
        }

        // 4. n-1개 선택하면 종료
        if (mst.length === graph.vertices.length - 1) {
            break;
        }
    }

    return mst;
}
```

## 시간 복잡도

| 연산 | 시간 복잡도 | 설명 |
|------|------------|------|
| 간선 정렬 | O(E log E) | E개의 간선을 정렬 |
| Union-Find 초기화 | O(V) | V개의 정점 초기화 |
| find 연산 | O(α(V)) | 거의 O(1) (아커만 함수의 역함수) |
| union 연산 | O(α(V)) | 거의 O(1) |
| 전체 알고리즘 | **O(E log E)** | 정렬이 지배적 |

여기서 α(V)는 아커만 함수의 역함수로, 실질적으로 상수 시간으로 간주됩니다.

**최적화 포인트:**
- 경로 압축: find 연산을 거의 O(1)로 만듦
- 랭크 기반 합치기: 트리 높이를 낮게 유지
- 조기 종료: n-1개 간선 선택 시 즉시 종료

## 실행 예시

### 예제 그래프

```
정점: A, B, C, D, E, F, G
간선:
  A - B: 7    B - C: 8    D - E: 7
  A - D: 5    B - D: 9    D - F: 6
  B - E: 7    C - E: 5    E - F: 8
  E - G: 9    F - G: 11
```

### 실행 과정

```
=== 1단계: 간선 정렬 ===
(5,A-D), (5,C-E), (6,D-F), (7,A-B), (7,B-E), (7,D-E), 
(8,B-C), (8,E-F), (9,B-D), (9,E-G), (11,F-G)

=== 2단계: 간선 선택 ===
✅ (5,A-D): 추가 - MST 간선 수: 1
✅ (5,C-E): 추가 - MST 간선 수: 2
✅ (6,D-F): 추가 - MST 간선 수: 3
✅ (7,A-B): 추가 - MST 간선 수: 4
✅ (7,B-E): 추가 - MST 간선 수: 5
❌ (7,D-E): 사이클 발생! 건너뜀
❌ (8,B-C): 사이클 발생! 건너뜀
❌ (8,E-F): 사이클 발생! 건너뜀
❌ (9,B-D): 사이클 발생! 건너뜀
✅ (9,E-G): 추가 - MST 간선 수: 6

🎉 MST 완성! (7개 정점 → 6개 간선)

=== 3단계: 최종 결과 ===
최소 신장 트리:
1. A - D: 5
2. C - E: 5
3. D - F: 6
4. A - B: 7
5. B - E: 7
6. E - G: 9

총 가중치: 39
```

### 실행 결과 (터미널)

```bash
╔════════════════════════════════════════╗
║     크루스칼 알고리즘 (Kruskal MST)    ║
╚════════════════════════════════════════╝

그래프 정보:
정점: A, B, C, D, E, F, G
간선 수: 11

간선 목록 (가중치, 시작점, 끝점):
  A - B: 7
  A - D: 5
  ...

최소 신장 트리 (MST):
  1. A - D: 5
  2. C - E: 5
  3. D - F: 6
  4. A - B: 7
  5. B - E: 7
  6. E - G: 9

총 가중치: 39
간선 개수: 6 (정점 수 7 - 1)
```

## 장점과 단점

### 장점

1. **구현이 직관적**
   - 간선을 정렬하고 순서대로 선택
   - 이해하기 쉬운 알고리즘

2. **희소 그래프에 효율적**
   - 간선이 적을 때 유리
   - O(E log E)는 간선 수에 비례

3. **항상 최적해 보장**
   - 그리디 알고리즘이지만 항상 MST를 찾음
   - 증명된 정확성

4. **메모리 효율적**
   - Union-Find만 O(V) 공간 사용
   - 인접 행렬 불필요

### 단점

1. **정렬 필요**
   - 간선을 먼저 정렬해야 함
   - O(E log E) 시간 소요

2. **간선 중심 알고리즘**
   - 간선이 많으면 비효율적
   - 밀집 그래프에는 프림 알고리즘이 더 효율적

3. **온라인 알고리즘 아님**
   - 모든 간선 정보가 미리 필요
   - 동적으로 간선 추가 시 재계산 필요

### 크루스칼 vs 프림 알고리즘

| 특징 | 크루스칼 | 프림 |
|------|---------|------|
| 접근 방식 | 간선 중심 | 정점 중심 |
| 시간 복잡도 | O(E log E) | O(E log V) |
| 적합한 그래프 | 희소 그래프 | 밀집 그래프 |
| 자료구조 | Union-Find | 우선순위 큐 |
| 구현 난이도 | 중간 | 쉬움 |

**선택 기준:**
- 간선 수 << 정점² → 크루스칼
- 간선 수 ≈ 정점² → 프림

## 실행 방법

### TypeScript로 실행

```bash
# 프로젝트 루트에서
npx ts-node Ch2/Kruskal/Kruskal.ts
```

### 예상 출력

```
╔════════════════════════════════════════╗
║     크루스칼 알고리즘 (Kruskal MST)    ║
╚════════════════════════════════════════╝

그래프 정보:
정점: A, B, C, D, E, F, G
간선 수: 11

========================================
크루스칼 알고리즘 실행
========================================

=== 간선 정렬 완료 ===
가중치 순서: (5, A-D), (5, C-E), ...

✅ 간선 추가: A - D (가중치: 5)
   현재 MST 간선 수: 1
...

🎉 MST 완성! (n-1개 간선 선택 완료)

총 가중치: 39
```

---

## 참고 자료

- **응용 분야**
  - 네트워크 설계 (최소 비용으로 모든 노드 연결)
  - 도로 건설 (최소 비용으로 모든 도시 연결)
  - 전력망 구축
  - 클러스터링 알고리즘

- **관련 알고리즘**
  - 프림 알고리즘 (Prim's Algorithm)
  - 보루프카 알고리즘 (Borůvka's Algorithm)

---

💡 **핵심 요약**

크루스칼 알고리즘은:
1. 간선을 가중치 순으로 정렬
2. 가중치가 작은 간선부터 선택
3. 사이클이 생기지 않는 간선만 추가
4. Union-Find로 사이클을 효율적으로 감지
5. n-1개 간선 선택 시 완료

**경로 압축의 마법**: `set()`은 재귀가 돌아오는 과정에서 실행되어, 한 번의 `find()` 호출로 경로상의 모든 노드가 루트를 직접 가리키게 됩니다! 🚀

