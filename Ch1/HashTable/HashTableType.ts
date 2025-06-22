export class SimpleHashTable {
    private table: Array<[string, any]>;
    private size: number;

    constructor(size: number) {
        this.table = new Array(size);
        this.size = size;
    }

    hash(key: string): number {
        return key.split('').reduce((acc, char) => {
            return acc + char.charCodeAt(0);
        }, 0);
    }

    set(key: string, value: any): void {
        const index = this.hash(key);
        this.table[index] = [key, value];
    }

    get(key: string): any {
        const index = this.hash(key);
        return this.table[index];
    }
}

export class HashTable {
    private table: Array<Array<[string, any]>>;
    private size: number;

    constructor(size: number) {
        this.table = new Array(size);
        this.size = size;
    }

    hash(key: string): number {
        return key.split('').reduce((acc, char) => {
            return acc + char.charCodeAt(0);
        }, 0) % this.size;
    }

    save(key: string, value: string): void {
        const index = this.hash(key);

        if (this.table[index] !== undefined) {
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i][0] === key) {
                    this.table[index][i][1] = value;
                    return;
                }
            }
            this.table[index].push([key, value]);
        } else {
            this.table[index] = [[key, value]];
        }
    }

    read(key: string): number | undefined {
        const index = this.hash(key);
        if (this.table[index] !== undefined) {
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i][0] === key) {
                    return this.table[index][i][1];
                }
            }
        }
    }
}