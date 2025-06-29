import { log } from "console";

export class Heap {
    heap: number[];

    constructor() {
        this.heap = [];
    }

    insert(data: number) {
        this.heap.push(data);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] > this.heap[parentIndex]) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    pop() {
        if (this.heap.length === 0) {
            return null;
        }

        const root = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return root;
    }

    heapifyDown() {
        let index = 0;
        while (index < this.heap.length) {
            const leftChildIndex = index * 2 + 1;
            const rightChildIndex = index * 2 + 2;

            if (leftChildIndex >= this.heap.length) {
                break;
            }

            const leftChild = this.heap[leftChildIndex] || 0;
            const rightChild = this.heap[rightChildIndex] || 0;

            if (rightChildIndex >= this.heap.length) {
                if (leftChild > this.heap[index]) {
                    [this.heap[index], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[index]];
                    index = leftChildIndex;
                }
                break;
            }

            if (leftChild > rightChild && leftChild > this.heap[index]) {
                [this.heap[index], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[index]];
                index = leftChildIndex;
            } else if (rightChild > leftChild && rightChild > this.heap[index]) {
                [this.heap[index], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[index]];
                index = rightChildIndex;
            } else {
                break;
            }
        }
    }
}

let heap = new Heap();
heap.insert(4);
heap.insert(3);
heap.insert(10);
heap.insert(19);
heap.insert(1);
heap.insert(2);
heap.insert(13);
heap.insert(11);
heap.insert(12);
heap.insert(14);
heap.insert(15);
heap.insert(16);
heap.insert(17);
heap.insert(18);
heap.insert(20);