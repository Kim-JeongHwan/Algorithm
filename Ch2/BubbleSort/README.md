# 버블 정렬 (Bubble Sort)

## 개요
버블 정렬은 가장 기본적인 정렬 알고리즘 중 하나입니다. 인접한 두 원소를 비교하여 순서가 잘못되어 있으면 교환하는 방식으로 동작합니다.

## 알고리즘 동작 원리
1. 첫 번째 원소부터 시작하여 인접한 원소와 비교
2. 첫 번째 원소가 두 번째 원소보다 크면 교환
3. 이 과정을 배열의 끝까지 반복
4. 한 번의 순회가 끝나면 가장 큰 원소가 배열의 끝에 위치
5. 남은 원소들에 대해 같은 과정을 반복

## 코드 분석

### 전체 코드 구조
```typescript
const bubbleSort = (arr: number[]) => {
    let n = arr.length
    if (n == 0) {
        return
    }

    for (let i = 0; i < n - 1; i++) {
        let swap = true
        for (let index = 0; index < n - 1 - i; index++) {
            if (arr[index] > arr[index + 1]) {
                [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
                swap = false
            }
        }
        if (swap) {
            break
        }   
    }
}
```

### For문 상세 분석

#### 외부 for문: `for (let i = 0; i < n - 1; i++)`
- **목적**: 전체 정렬 과정을 제어하는 라운드
- **동작**: 배열의 길이가 n일 때, 최대 n-1번의 라운드가 필요
- **최적화**: `swap` 변수를 통해 이미 정렬된 경우 조기 종료

#### 내부 for문: `for (let index = 0; index < n - 1 - i; index++)`
- **목적**: 각 라운드에서 인접한 원소들을 비교하고 교환
- **범위**: `n - 1 - i`까지 비교 (이미 정렬된 부분은 제외)
- **동작**: 인접한 두 원소를 비교하여 순서가 잘못되어 있으면 교환

## 실행 예시

### 초기 배열: `[5, 2, 3, 1, 4]`
**배열 길이 n = 5**

#### 1차 라운드 (i = 0)
- 비교 범위: index 0 ~ 3 (n-1-i = 5-1-0 = 4, index < 4이므로 0~3)
- `swap = true`로 시작

| 단계 | 비교 | 배열 상태 | 교환 여부 |
|------|------|-----------|-----------|
| 1 | arr[0] > arr[1] (5 > 2) | [**2, 5**, 3, 1, 4] | ✅ 교환 |
| 2 | arr[1] > arr[2] (5 > 3) | [2, **3, 5**, 1, 4] | ✅ 교환 |
| 3 | arr[2] > arr[3] (5 > 1) | [2, 3, **1, 5**, 4] | ✅ 교환 |
| 4 | arr[3] > arr[4] (5 > 4) | [2, 3, 1, **4, 5**] | ✅ 교환 |

**결과**: `[2, 3, 1, 4, 5]` (가장 큰 수 5가 맨 뒤로)

#### 2차 라운드 (i = 1)
- 비교 범위: index 0 ~ 2 (n-1-i = 5-1-1 = 3, index < 3이므로 0~2)
- `swap = true`로 시작

| 단계 | 비교 | 배열 상태 | 교환 여부 |
|------|------|-----------|-----------|
| 1 | arr[0] > arr[1] (2 > 3) | [2, 3, 1, 4, 5] | ❌ 교환 안함 |
| 2 | arr[1] > arr[2] (3 > 1) | [2, **1, 3**, 4, 5] | ✅ 교환 |
| 3 | arr[2] > arr[3] (3 > 4) | [2, 1, 3, 4, 5] | ❌ 교환 안함 |

**결과**: `[2, 1, 3, 4, 5]` (두 번째로 큰 수 4가 뒤에서 두 번째로)

#### 3차 라운드 (i = 2)
- 비교 범위: index 0 ~ 1 (n-1-i = 5-1-2 = 2, index < 2이므로 0~1)
- `swap = true`로 시작

| 단계 | 비교 | 배열 상태 | 교환 여부 |
|------|------|-----------|-----------|
| 1 | arr[0] > arr[1] (2 > 1) | [**1, 2**, 3, 4, 5] | ✅ 교환 |

**결과**: `[1, 2, 3, 4, 5]` (정렬 완료!)

#### 4차 라운드 (i = 3)
- 비교 범위: index 0 ~ 0 (n-1-i = 5-1-3 = 1, index < 1이므로 0~0)
- 내부 for문이 실행되지 않음
- `swap = true`이므로 조기 종료

## 최적화 포인트

### 1. 조기 종료 (Early Termination)
```typescript
if (swap) {
    break
}
```
- 한 라운드에서 교환이 한 번도 일어나지 않으면 이미 정렬된 상태
- 불필요한 반복을 줄여 성능 향상

### 2. 범위 최적화
```typescript
for (let index = 0; index < n - 1 - i; index++)
```
- 각 라운드마다 비교 범위를 줄임
- 이미 정렬된 부분은 다시 비교하지 않음

## 시간 복잡도
- **최선의 경우**: O(n) - 이미 정렬된 배열
- **평균의 경우**: O(n²)
- **최악의 경우**: O(n²) - 역순으로 정렬된 배열

## 공간 복잡도
- **O(1)** - 추가 메모리 공간이 거의 필요하지 않음

## 장단점

### 장점
- 구현이 간단하고 이해하기 쉬움
- 추가 메모리 공간이 거의 필요하지 않음
- 안정 정렬 (Stable Sort)

### 단점
- 시간 복잡도가 O(n²)로 비효율적
- 대용량 데이터에는 부적합

## 사용 사례
- 교육 목적의 알고리즘 학습
- 작은 크기의 데이터 정렬
- 거의 정렬된 데이터의 정렬 