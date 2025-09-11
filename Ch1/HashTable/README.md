# HashTable (해시 테이블)

## 개요
해시 테이블은 키-값 쌍을 저장하는 자료구조로, 해시 함수를 사용하여 키를 인덱스로 변환하여 빠른 검색을 가능하게 합니다.

## 파일 구조
- `HashTableType.ts`: 해시 테이블 클래스 구현 (SimpleHashTable, HashTable)
- `hashTable.ts`: 해시 테이블 사용 예제

## 상세 해설

### HashTableType.ts

#### 1. SimpleHashTable 클래스
```typescript
export class SimpleHashTable {
    private table: Array<[string, any]>;
    private size: number;
}
```

**특징**:
- 충돌 처리가 없는 간단한 해시 테이블
- 같은 해시값이 나오면 덮어쓰기 발생
- 빠르지만 데이터 손실 가능성

**주요 메서드**:
- `getKey(data: string)`: SHA-256 해시 함수로 키 생성
- `hash(key: string)`: 해시값을 테이블 크기로 나눈 나머지
- `set(key, value)`: 키-값 쌍 저장
- `get(key)`: 키로 값 검색

#### 2. HashTable 클래스 (충돌 처리 포함)
```typescript
export class HashTable {
    private table: Array<Array<[string, any]>>;
    private size: number;
}
```

**특징**:
- 체이닝(Chaining) 방식으로 충돌 처리
- 같은 해시값에 대해 배열로 여러 키-값 쌍 저장
- 데이터 손실 없음

**주요 메서드**:
- `save(key, value)`: 키-값 쌍 저장 (충돌 시 체이닝)
- `read(key)`: 키로 값 검색

### save 함수 상세 분석

```typescript
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
```

#### 데이터 구조 이해

**HashTable의 내부 구조**:
```typescript
private table: Array<Array<[string, any]>>;
```

- `this.table`: 전체 해시 테이블 (1차원 배열)
- `this.table[index]`: 특정 인덱스의 체이닝 배열 (2차원 배열)
- `this.table[index][i]`: 체이닝 배열의 i번째 키-값 쌍 (튜플)
- `this.table[index][i][0]`: 키 (문자열)
- `this.table[index][i][1]`: 값 (any 타입)

**예시 데이터 구조**:
```
this.table = [
    undefined,                    // index 0: 비어있음
    [["key1", "value1"], ["key2", "value2"]],  // index 1: 2개 키-값 쌍 체이닝
    [["key3", "value3"]],        // index 2: 1개 키-값 쌍
    undefined                     // index 3: 비어있음
]
```

#### 단계별 상세 분석

**1단계: 해시 인덱스 계산**
```typescript
const index = this.hash(key);
```
- `key`를 SHA-256 해시 함수로 변환 후 테이블 크기로 나눈 나머지
- 예: `key = "apple"` → `hash("apple") = 12345` → `index = 12345 % 4 = 1`
- 결과: `index = 1` (테이블의 1번 인덱스에 저장할 예정)

**2단계: 기존 데이터 존재 여부 확인**
```typescript
if (this.table[index] !== undefined) {
```
- `this.table[1]`이 `undefined`인지 확인
- `undefined`: 해당 인덱스에 아무 데이터도 없음 (첫 번째 저장)
- `Array`: 해당 인덱스에 이미 체이닝된 배열이 존재 (충돌 발생)

**3단계: 중복 키 검사 (기존 데이터가 있을 때)**
```typescript
for (let i = 0; i < this.table[index].length; i++) {
    if (this.table[index][i][0] === key) {
        this.table[index][i][1] = value;
        return;
    }
}
```

**상세 설명**:
- `this.table[index].length`: 체이닝 배열의 길이 (저장된 키-값 쌍의 개수)
- `this.table[index][i][0]`: i번째 위치의 키
- `this.table[index][i][1]`: i번째 위치의 값
- **목적**: 같은 키가 이미 저장되어 있는지 확인
- **발견 시**: 기존 값만 업데이트하고 함수 종료 (`return`)

**예시**:
```typescript
// this.table[1] = [["apple", "red"], ["banana", "yellow"]]
// key = "apple", value = "green" 저장 시도

// i=0: this.table[1][0][0] = "apple" === "apple" ✓ (일치!)
// this.table[1][0][1] = "green"으로 업데이트
// return으로 함수 종료
```

**4단계: 새 데이터 추가**

**케이스 A: 중복 키가 없을 때 (체이닝 추가)**
```typescript
this.table[index].push([key, value]);
```
- **왜 push를 사용하는가?**: 
  - 같은 해시값을 가진 다른 키들이 이미 존재
  - 기존 데이터를 유지하면서 새 키-값 쌍을 추가해야 함
  - `push()`는 배열 끝에 새 요소를 추가하는 메서드

**예시**:
```typescript
// this.table[1] = [["apple", "red"]]
// key = "banana", value = "yellow" 저장 시도
// "banana"는 기존에 없으므로 push 실행
// 결과: this.table[1] = [["apple", "red"], ["banana", "yellow"]]
```

**케이스 B: 해당 인덱스가 완전히 비어있을 때**
```typescript
this.table[index] = [[key, value]];
```
- **왜 새 배열을 생성하는가?**:
  - `this.table[index]`가 `undefined`이므로 배열이 존재하지 않음
  - 첫 번째 키-값 쌍을 저장하기 위해 새 배열 생성
  - `[[key, value]]`: 배열 안에 튜플을 담은 배열

**예시**:
```typescript
// this.table[2] = undefined
// key = "cherry", value = "red" 저장 시도
// 새 배열 생성: this.table[2] = [["cherry", "red"]]
```

#### 충돌 처리 메커니즘

**해시 충돌이란?**
- 서로 다른 키가 같은 해시값을 가지는 경우
- 예: `hash("apple") = 1`, `hash("orange") = 1` (둘 다 인덱스 1)

**체이닝 방식의 동작**:
```
인덱스 1: [["apple", "red"], ["orange", "orange"]]
         ↑                    ↑
    첫 번째 키-값 쌍      두 번째 키-값 쌍 (충돌로 인한 추가)
```

**왜 이런 구조가 필요한가?**
1. **데이터 보존**: 충돌이 발생해도 모든 키-값 쌍을 잃지 않음
2. **확장성**: 같은 해시값을 가진 키가 몇 개든 저장 가능
3. **검색 정확성**: 정확한 키를 찾기 위해 체이닝 배열을 순회

#### 시간복잡도 상세 분석

**평균 케이스 O(1)**:
- 좋은 해시 함수로 인해 충돌이 적음
- 대부분의 경우 체이닝 배열 길이가 1 또는 매우 짧음
- 중복 키 검사 루프가 거의 실행되지 않음

**최악 케이스 O(n)**:
- 모든 키가 같은 해시값을 가짐
- 체이닝 배열 길이가 n (저장된 모든 키의 개수)
- 중복 키 검사를 위해 전체 배열을 순회해야 함

**예시**:
```typescript
// 최악의 경우
hashTable.save("a", "1");    // index 0: [["a", "1"]]
hashTable.save("b", "2");    // index 0: [["a", "1"], ["b", "2"]]
hashTable.save("c", "3");    // index 0: [["a", "1"], ["b", "2"], ["c", "3"]]
// "d" 저장 시: 체이닝 배열 3개 요소를 모두 검사해야 함
```

### hashTable.ts

#### 사용 예제
```typescript
// SimpleHashTable 사용
const simpleHashTable = new SimpleHashTable(3);
simpleHashTable.set('Andy', '0001111222');
simpleHashTable.set('Dave', '1112222333');
simpleHashTable.set('Trump', '2223333444');

// HashTable 사용 (충돌 처리)
const hashTable = new HashTable(3);
hashTable.save('Dd', '010000000222');
hashTable.save('Db', '010000000333');
```

## 해시 함수 분석

### SHA-256 해시 함수
```typescript
getKey(data: string): number {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    const hexDig = hash.digest('hex');
    return parseInt(hexDig, 16);
}
```

**특징**:
- 암호학적으로 안전한 해시 함수
- 256비트(64자리 16진수) 출력
- 균등 분포로 좋은 해시 성능

### 해시 인덱스 계산
```typescript
hash(key: string): number {
    return this.getKey(key) % this.size;
}
```

**원리**:
- 해시값을 테이블 크기로 나눈 나머지
- 0 ~ (size-1) 범위의 인덱스 생성

## 충돌 처리 방식

### 1. SimpleHashTable (충돌 무시)
- 같은 해시값이 나오면 이전 값 덮어쓰기
- 빠르지만 데이터 손실 가능

### 2. HashTable (체이닝)
- 같은 해시값에 대해 배열로 여러 키-값 쌍 저장
- 충돌 시 배열에 추가
- 검색 시 배열을 순회하여 키 찾기

## 시간복잡도

### 평균 케이스 (좋은 해시 함수)
- **삽입**: O(1)
- **검색**: O(1)
- **삭제**: O(1)

### 최악 케이스 (모든 키가 같은 해시값)
- **삽입**: O(n)
- **검색**: O(n)
- **삭제**: O(n)

## 장단점

### 장점
- **빠른 검색**: 평균 O(1) 시간복잡도
- **유연한 키 타입**: 문자열, 객체 등 다양한 키 사용 가능
- **효율적인 메모리 사용**: 필요한 만큼만 사용

### 단점
- **충돌 문제**: 해시 함수 품질에 따라 성능 저하
- **순서 없음**: 키의 순서가 보장되지 않음
- **메모리 오버헤드**: 해시 함수 계산 비용

## 활용 사례
- 데이터베이스 인덱싱
- 캐시 시스템
- 프로그래밍 언어의 객체/딕셔너리
- 중복 제거
- 빠른 검색이 필요한 모든 상황 