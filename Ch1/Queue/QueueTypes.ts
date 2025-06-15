export interface PriorityItem<T> {
    value: T;
    priority: number;
}

export interface IQueue<T> {
    enqueue(element: T, priority?: number): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
}

export interface IPriorityQueue<T> extends IQueue<T> {
    enqueue(value: T, priority: number): void;
} 