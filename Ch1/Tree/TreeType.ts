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
}