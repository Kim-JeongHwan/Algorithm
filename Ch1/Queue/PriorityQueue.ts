import { IPriorityQueue, PriorityItem } from './QueueTypes';

export class PriorityQueue<T> implements IPriorityQueue<T> {
    private items: PriorityItem<T>[] = [];

    enqueue(value: T, priority: number): void {
        const item: PriorityItem<T> = { value, priority };
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            if (item.priority < this.items[i].priority) {
                this.items.splice(i, 0, item);
                added = true;
                break;
            }
        }

        if (!added) {
            this.items.push(item);
        }
    }

    dequeue(): T | undefined {
        return this.items.shift()?.value;
    }

    peek(): T | undefined {
        return this.items[0]?.value;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }
} 