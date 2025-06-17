import { add, ListNode } from "./ListNode";

// 노드 생성 및 연결
const node1 = new ListNode(1);
const node2 = new ListNode(2);
node1.next = node2;
let head: ListNode | null = node1;

// 3부터 9까지 노드 추가
for (let index = 3; index < 10; index++) {
    add(head, index);
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
