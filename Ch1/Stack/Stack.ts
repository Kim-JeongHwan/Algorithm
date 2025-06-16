export class Stack<T> implements IStack<T> {
    private items: T[] = [];

    push(element: T): void {
        this.items.push(element);
    }

    pop(): T | undefined {
        return this.items.pop();
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

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
}

interface IStack<T> {
    push(element: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack);
stack.pop();
console.log(stack);
console.log(stack.peek());
console.log(stack.isEmpty());
console.log(stack.size());
stack.clear();
console.log(stack);