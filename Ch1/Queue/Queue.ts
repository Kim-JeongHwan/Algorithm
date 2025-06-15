import { IQueue } from './QueueTypes';

// Queue 선언하기
export class Queue<T> implements IQueue<T> {
    private items: T[] = [];

    // 큐에 요소 추가
    enqueue(element: T): void {
        this.items.push(element);
    }

    // 큐에서 요소 제거 및 반환
    dequeue(): T | undefined {
        return this.items.shift();
    }

    // 큐의 맨 앞 요소 확인
    peek(): T | undefined {
        return this.items[0];
    }

    // 큐가 비어있는지 확인
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // 큐의 크기 반환
    size(): number {
        return this.items.length;
    }

    // 큐 초기화
    clear(): void {
        this.items = [];
    }
}