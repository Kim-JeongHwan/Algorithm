export interface TreeType {
    data: number;
    left: TreeType | null;
    right: TreeType | null;
}

export class Tree {
    root: TreeType | null;

    constructor() {
        this.root = null;
    }

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
}