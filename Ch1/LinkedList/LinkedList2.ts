import { add, Node } from "./NodeType";

// 노드 생성 및 연결
const node1 = new Node(1);
const node2 = new Node(2);
node1.next = node2;
let head: Node | null = node1;

for (let index = 3; index < 10; index++) {
    add(head, index);
}

const node3 = new Node(1.5);
while (head && head.next) {
    if (head.data < node3.data && head.next.data > node3.data) {
        node3.next = head.next;
        head.next = node3;
        break;
    }
    head = head.next;
}

let node: Node | null = head;
while (node && node.next) {
    console.log(node.data);
    node = node.next;
}
if (node) {
    console.log(node.data);
}