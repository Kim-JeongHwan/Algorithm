export interface INode {
    data: number;
    prev: INode | null;
    next: INode | null;
}

export class Node implements INode {
    data: number;
    prev: Node | null;
    next: Node | null;

    constructor(data: number, prev: Node | null = null, next: Node | null = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

export class NodeManager {
    head: Node | null;
    tail: Node | null;

    constructor(data: number) {
        this.head = new Node(data);
        this.tail = this.head;
    }

    insert(data: number): void {
        if (!this.head) {
            this.head = new Node(data);
            this.tail = this.head;
            return;
        }

        let node = this.head;
        while (node.next) {
            node = node.next;
        }
        node.next = new Node(data);
        node.next.prev = node;
        this.tail = node.next;
    }

    insertBefore(data: number, target: number): void {
        if (!this.head) {
            this.head = new Node(data);
            this.tail = this.head;
            return;
        }

        let node = this.tail;
        while(node) {
            if (node.data === target) {
                const newNode = new Node(data, node.prev, node);
                if (node.prev) {
                    node.prev.next = newNode;
                }
                break;
            }
            node = node.prev;
        }
    }

    describe(): void {
        let node = this.head;
        while (node && node.next) {
            console.log(node.data);
            node = node.next;
        }
    }

    delete(data: number): void {
        if (!this.head) {
            console.log('해당 값을 가진 노드가 없습니다.');
            return;
        }

        if (this.head.data === data) {
            this.head = this.head.next;
            return;
        }

        let node = this.head;
        while (node.next) {
            if (node.next.data === data) {
                node.next = node.next.next; 
                return;
            }
            node = node.next;
        }
    }

    searchFromHead(data: number): Node | null {
        let node = this.head;
        while (node) {
            if (node.data === data) {
                return node;
            }
            node = node.next;
        }
        return null;
    }

    searchFromTail(data: number): Node | null {
        let node = this.tail;
        while (node) {
            if (node.data === data) {
                return node;
            }
            node = node.prev;
        }
        return null;
    }
}

export const add = (head: Node | null, data: number): void => {
    if (!head) {
        head = new Node(data);
        return;
    }

    let node = head;
    while (node.next) {
        node = node.next;
    }
    node.next = new Node(data);
}