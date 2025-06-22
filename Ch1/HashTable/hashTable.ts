import { SimpleHashTable, HashTable } from "./HashTableType";

const simpleHashTable = new SimpleHashTable(3);
simpleHashTable.set('Andy', '0001111222');
simpleHashTable.set('Dave', '1112222333');
simpleHashTable.set('Trump', '2223333444');

console.log(simpleHashTable.get('Andy'));
console.log(simpleHashTable.get('Dave'));
console.log(simpleHashTable.get('Trump'));

const hashTable = new HashTable(3);
hashTable.save('Dd', '010000000222')
hashTable.save('Db', '010000000333')

console.log(hashTable.read('Dd'));
console.log(hashTable.read('Db'));