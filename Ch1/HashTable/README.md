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