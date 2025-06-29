# Tree (트리)

## 개요
트리는 계층적 구조를 가진 비선형 자료구조입니다. 노드들이 부모-자식 관계로 연결되어 있으며, 이진 탐색 트리(BST)는 검색과 정렬에 효율적인 구조입니다.

## 파일 구조
- `TreeType.ts`: 이진 탐색 트리 클래스 구현
- `tree.ts`: 트리 사용 예제 및 테스트

## 상세 해설

### TreeType.ts

#### 1. TreeType 인터페이스
```typescript
export interface TreeType {
    data: number;
    left: TreeType | null;
    right: TreeType | null;
}
```

**특징**:
- 이진 트리 노드의 구조 정의
- `data`: 노드에 저장되는 값
- `left`: 왼쪽 자식 노드 포인터
- `right`: 오른쪽 자식 노드 포인터

#### 2. Tree 클래스
```typescript
export class Tree {
    root: TreeType | null;

    constructor() {
        this.root = null;
    }
}
```

**특징**:
- 루트 노드를 가리키는 포인터
- 빈 트리로 초기화

#### 3. 삽입 연산 (insert)
```typescript
insert(data: number) {
    if (this.root === null) {
        this.root = { data, left: null, right: null };
        return;
    }

    let currentNode = this.root;
    while (currentNode !== null) {
        if (data < currentNode.data) {
            if (currentNode.left === null) {
                currentNode.left = { data, left: null, right: null };
                break;
            }
            currentNode = currentNode.left;
        } else {
            if (currentNode.right === null) {
                currentNode.right = { data, left: null, right: null };
                break;
            }
            currentNode = currentNode.right;
        }
    }
}
```

**동작 원리**:
1. 루트가 비어있으면 새 노드를 루트로 설정
2. 현재 노드의 값과 비교
3. 작으면 왼쪽, 크면 오른쪽으로 이동
4. 자식이 없으면 그 위치에 새 노드 삽입

#### 4. 검색 연산 (search)
```typescript
search(data: number) {
    let currentNode = this.root;
    while (currentNode !== null) {
        if (data === currentNode.data) {
            return currentNode;
        }
        if (data < currentNode.data) {
            currentNode = currentNode.left;
        } else {
            currentNode = currentNode.right;
        }
    }
    return null;
}
```

**동작 원리**:
1. 루트부터 시작하여 값 비교
2. 찾는 값이 작으면 왼쪽, 크면 오른쪽으로 이동
3. 값을 찾으면 해당 노드 반환
4. 찾지 못하면 null 반환

#### 5. 삭제 연산 (delete)
```typescript
delete(data: number) {
    let currentNode: TreeType | null = this.root;
    let parentNode: TreeType | null = null;
    
    // 삭제할 노드 찾기
    while (currentNode !== null) {
        if (data === currentNode.data) {
            // 케이스 1: 리프 노드
            if (currentNode.left === null && currentNode.right === null) {
                if (parentNode === null) {
                    this.root = null;
                } else {
                    if (parentNode.left === currentNode) {
                        parentNode.left = null;
                    } else {
                        parentNode.right = null;
                    }
                }
            }
            // 케이스 2: 자식이 하나만 있는 경우
            else if (currentNode.left === null) {
                if (parentNode === null) {
                    this.root = currentNode.right;
                } else {
                    if (parentNode.left === currentNode) {
                        parentNode.left = currentNode.right;
                    } else {
                        parentNode.right = currentNode.right;
                    }
                }
            }
            else if (currentNode.right === null) {
                if (parentNode === null) {
                    this.root = currentNode.left;
                } else {
                    if (parentNode.left === currentNode) {
                        parentNode.left = currentNode.left;
                    } else {
                        parentNode.right = currentNode.left;
                    }
                }
            }
            // 케이스 3: 자식이 둘 다 있는 경우
            else {
                let minNode = currentNode.right;
                let minParentNode = currentNode;
                while (minNode.left !== null) {
                    minParentNode = minNode;
                    minNode = minNode.left;
                }

                currentNode.data = minNode.data;
                if (minParentNode === currentNode) {
                    // 오른쪽 자식이 최소값인 경우
                    currentNode.right = minNode.right;
                } else {
                    // 오른쪽 서브트리의 왼쪽 자식이 최소값인 경우
                    minParentNode.left = minNode.right;
                }
            }
            break;
        }
        parentNode = currentNode;
        if (data < currentNode.data) {
            currentNode = currentNode.left;
        } else {
            currentNode = currentNode.right;
        }
    }
}
```

**삭제 케이스**:

**케이스 1: 리프 노드**
- 자식이 없는 노드
- 단순히 부모의 포인터를 null로 설정

**케이스 2: 자식이 하나만 있는 노드**
- 자식을 부모의 자식으로 연결
- 부모의 포인터를 자식으로 변경

**케이스 3: 자식이 둘 다 있는 노드**
- 오른쪽 서브트리에서 최소값 찾기
- 최소값을 현재 노드로 복사
- 최소값 노드 삭제

### tree.ts

#### 1. 기본 사용 예제
```typescript
const tree = new Tree();
tree.insert(10);
tree.insert(8);
tree.insert(15);
tree.insert(27);
tree.insert(88);
tree.insert(1);
tree.insert(0);
tree.insert(17);
tree.insert(65);
tree.insert(23);
tree.insert(32);
tree.insert(75);
tree.insert(28);
tree.delete(27);
```

#### 2. 대규모 테스트
```typescript
// 랜덤한 100개의 숫자를 생성 (0부터 999 사이)
const bstNums: Set<number> = new Set<number>();
while (bstNums.size !== 100) {
    bstNums.add(Math.floor(Math.random() * 1000));
}

// 이진 탐색 트리 생성 및 숫자 삽입
const tree2 = new Tree();
bstNums.forEach(num => {
    tree2.insert(num);
});

// 삽입한 모든 숫자들을 검색하여 테스트
bstNums.forEach(num => {
    if (tree2.search(num) === null) {
        console.log('search failed', num);
    }
});

// 랜덤하게 10개의 숫자를 선택하여 삭제
const deleteNums: Set<number> = new Set<number>();
const bstNumsArray = Array.from(bstNums);
while (deleteNums.size !== 10) {
    const randomIndex = Math.floor(Math.random() * 100);
    deleteNums.add(bstNumsArray[randomIndex]);
}

// 선택한 숫자들 삭제 및 확인
deleteNums.forEach(delNum => {
    tree2.delete(delNum);
    if (tree2.search(delNum) !== null) {
        console.log('delete failed', delNum);
    }
});
```

## 이진 탐색 트리의 특징

### BST 성질
- 왼쪽 서브트리의 모든 노드 < 현재 노드
- 오른쪽 서브트리의 모든 노드 > 현재 노드
- 중위 순회 시 정렬된 순서로 방문

### 트리 구조
```
       10
      /  \
     8    15
    /      \
   1        27
  /        /  \
 0        17   88
```

## 시간복잡도

### 평균 케이스 (균형잡힌 트리)
- **삽입**: O(log n)
- **검색**: O(log n)
- **삭제**: O(log n)

### 최악 케이스 (편향된 트리)
- **삽입**: O(n)
- **검색**: O(n)
- **삭제**: O(n)

## 트리 순회 방식

### 1. 중위 순회 (Inorder)
```typescript
function inorderTraversal(root: TreeType | null): number[] {
    const result: number[] = [];
    
    function inorder(node: TreeType | null) {
        if (node) {
            inorder(node.left);
            result.push(node.data);
            inorder(node.right);
        }
    }
    
    inorder(root);
    return result;
}
```

### 2. 전위 순회 (Preorder)
```typescript
function preorderTraversal(root: TreeType | null): number[] {
    const result: number[] = [];
    
    function preorder(node: TreeType | null) {
        if (node) {
            result.push(node.data);
            preorder(node.left);
            preorder(node.right);
        }
    }
    
    preorder(root);
    return result;
}
```

### 3. 후위 순회 (Postorder)
```typescript
function postorderTraversal(root: TreeType | null): number[] {
    const result: number[] = [];
    
    function postorder(node: TreeType | null) {
        if (node) {
            postorder(node.left);
            postorder(node.right);
            result.push(node.data);
        }
    }
    
    postorder(root);
    return result;
}
```

## 장단점

### 장점
- **효율적인 검색**: 평균 O(log n) 시간복잡도
- **정렬된 데이터**: 중위 순회로 정렬된 순서
- **동적 구조**: 삽입/삭제가 효율적

### 단점
- **편향 가능성**: 최악의 경우 O(n) 성능
- **균형 문제**: 자동으로 균형을 맞추지 않음
- **복잡한 삭제**: 자식이 둘인 경우 복잡

## 활용 사례
- 데이터베이스 인덱싱
- 파일 시스템 구조
- 컴파일러의 구문 분석 트리
- 게임의 의사결정 트리
- 우선순위 큐 구현
- 정렬 알고리즘 (트리 정렬)

## 개선 방안

### 1. 균형 이진 탐색 트리
- AVL 트리
- Red-Black 트리
- B-트리

### 2. 자동 균형 조정
- 삽입/삭제 시 자동으로 균형 조정
- 최악의 경우도 O(log n) 보장 