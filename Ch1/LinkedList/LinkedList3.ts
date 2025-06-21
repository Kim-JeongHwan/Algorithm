import { NodeManager } from "./NodeType";

const linkedList1 = new NodeManager(0);
linkedList1.describe();
linkedList1.insert(1);

for (let index = 2; index < 11; index++) {
    linkedList1.insert(index);
}

linkedList1.describe();
console.log(linkedList1.searchFromHead(5));

linkedList1.insertBefore(10, 5);
linkedList1.describe();