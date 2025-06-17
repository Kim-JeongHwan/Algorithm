export interface IListNode {
    data: number;
    next: IListNode | null;
}

export class ListNode implements IListNode {
    data: number;
    next: ListNode | null;

    constructor(data: number, next: ListNode | null = null) {
        this.data = data;
        this.next = next;
    }
}

export const add = (head: ListNode | null, data: number): void => {
    if (!head) {
        head = new ListNode(data);
        return;
    }

    let node = head;
    while (node.next) {
        node = node.next;
    }
    node.next = new ListNode(data);
}