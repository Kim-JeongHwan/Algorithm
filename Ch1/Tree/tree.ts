import { Tree } from "./TreeType";

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

console.log(tree.search(15));
console.log(tree.search(27));