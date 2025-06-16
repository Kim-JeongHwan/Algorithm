class ListNode {
    data: number;
    next: ListNode | null;

    constructor(data: number, next: ListNode | null = null) {
        this.data = data;
        this.next = next;
    }
}

let head: ListNode;

const add = (data: number): void => {
    let node = head;
    while (node.next) {
        node = node.next;
    }
    node.next = new ListNode(data);
}

// 노드 생성 및 연결
const node1 = new ListNode(1);
const node2 = new ListNode(2);
node1.next = node2;
head = node1;

// 3부터 9까지 노드 추가
for (let index = 3; index < 10; index++) {
    add(index);
}

// 연결 리스트 순회하며 출력
let node: ListNode | null = head;
while (node && node.next) {
    console.log(node.data);
    node = node.next;
}
if (node) {
    console.log(node.data);
}
