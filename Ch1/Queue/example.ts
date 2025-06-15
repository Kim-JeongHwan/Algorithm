import { Queue } from './Queue';
import { PriorityQueue } from './PriorityQueue';

// 기본 큐 사용 예시
const queue = new Queue<string>();
queue.enqueue('apple');
queue.enqueue('banana');

console.log(queue.dequeue()); // apple
console.log(queue.peek()); // banana
console.log(queue.size()); // 1

// 우선순위 큐 사용 예시
const priorityQueue = new PriorityQueue<string>();
priorityQueue.enqueue('중요한 작업', 1);    // 우선순위 1 (가장 높음)
priorityQueue.enqueue('일반 작업', 2);      // 우선순위 2
priorityQueue.enqueue('덜 중요한 작업', 3);  // 우선순위 3 (가장 낮음)

console.log(priorityQueue.dequeue()); // '중요한 작업' (우선순위가 가장 높은 것)
console.log(priorityQueue.peek());    // '일반 작업'
console.log(priorityQueue.size());    // 2 