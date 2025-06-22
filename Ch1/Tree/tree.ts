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
tree.insert(32)
tree.insert(75)
tree.insert(28);
tree.delete(27);
// console.log(tree.search(15));


// 랜덤한 100개의 숫자를 생성 (0부터 999 사이)
const bstNums: Set<number> = new Set<number>();
while (bstNums.size !== 100) {
    bstNums.add(Math.floor(Math.random() * 1000));
}

// 이진 탐색 트리 생성 및 숫자 삽입
const tree2 = new Tree();
bstNums.forEach(num => {
    tree2.insert(num);
});

// 삽입한 모든 숫자들을 검색하여 테스트
bstNums.forEach(num => {
    if (tree2.search(num) === null) {
        console.log('search failed', num);
    }
});

// 랜덤하게 10개의 숫자를 선택하여 삭제
const deleteNums: Set<number> = new Set<number>();
const bstNumsArray = Array.from(bstNums);
while (deleteNums.size !== 10) {
    const randomIndex = Math.floor(Math.random() * 100);
    deleteNums.add(bstNumsArray[randomIndex]);
}

// 선택한 숫자들 삭제 및 확인
deleteNums.forEach(delNum => {
    tree2.delete(delNum);
    if (tree2.search(delNum) !== null) {
        console.log('delete failed', delNum);
    }
});