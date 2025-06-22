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
        let parentNode: TreeType | null = this.root;
        while (currentNode !== null && parentNode !== null) {
            if (data === currentNode.data) {
                if (currentNode.left === null && currentNode.right === null) {
                    if (parentNode === currentNode) {
                        this.root = null;
                    } else {
                        if (parentNode.left === currentNode) {
                            parentNode.left = null;
                        } else {
                            parentNode.right = null;
                        }
                    }
                } else if (currentNode.left === null) {
                    if (parentNode.left === currentNode) {
                        parentNode.left = currentNode.right;
                    } else {
                        parentNode.right = currentNode.right;
                    }
                } else if (currentNode.right === null) {
                    if (parentNode.left === currentNode) {
                        parentNode.left = currentNode.left;
                    } else {
                        parentNode.right = currentNode.left;
                    }
                } else {
                    let minNode = currentNode.right;
                    let minParentNode = currentNode;
                    while (minNode.left !== null) {
                        minParentNode = minNode;
                        minNode = minNode.left;
                    }

                    currentNode.data = minNode.data;
                    if (minParentNode.left === minNode) {
                        minParentNode.left = minNode.right;
                    } else {
                        minParentNode.right = minNode.right;
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