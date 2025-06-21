// 해시 테이블 클래스 정의
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

    set(key: string, value: any): void {
        const index = this.hash(key);
        this.table[index] = [key, value];
    }

    get(key: string): any {
        const index = this.hash(key);
        return this.table[index];
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

const hashTable = new HashTable(3);
hashTable.save('Andy', '0001111222');
hashTable.save('Dave', '1112222333');
hashTable.save('Trump', '2223333444');

console.log(hashTable.get('Andy'));
console.log(hashTable.read('Dave'));
console.log(hashTable.get('Trump'));
console.log(hashTable.get('Anthony'));