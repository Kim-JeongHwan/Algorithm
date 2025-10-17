/**
 * 그리디 알고리즘 (Greedy Algorithm) 예제
 * 
 * 이 파일에는 세 가지 그리디 알고리즘 예제가 포함되어 있습니다:
 * 1. 동전 개수 최적화 문제 (Coin Change Problem)
 * 2. 분할 가능한 배낭 문제 (Fractional Knapsack Problem)
 * 3. 작업 스케줄링 문제 (Job Scheduling Problem)
 */

// ==================== 동전 개수 최적화 문제 ====================

// 사용할 동전의 종류를 배열로 정의 (500원, 100원, 50원, 1원)
const coinList: number[] = [500, 100, 50, 1];

// 동전 상세 정보를 위한 타입 정의
type CoinDetail = {
    coin: number;
    count: number;
};

/**
 * 최소 동전 개수로 목표 금액을 만드는 그리디 알고리즘
 * @param cList 사용 가능한 동전 종류 배열
 * @param target 목표 금액
 * @returns 필요한 최소 동전 개수
 */
function minCoinCount(cList: number[], target: number): number {
    // 사용된 동전의 총 개수를 저장하는 변수
    let coinCount: number = 0;
    // 각 동전이 몇 개씩 사용되었는지 저장할 배열
    const details: CoinDetail[] = [];
    // 큰 동전부터 사용하기 위해 내림차순 정렬
    const sortedCoinList = [...cList].sort((a, b) => b - a);

    // 각 동전에 대해 반복
    for (const coin of sortedCoinList) {
        // 목표 금액이 0이 되면 종료
        if (target === 0) {
            break;
        }
        // 현재 동전으로 만들 수 있는 최대 개수를 계산하여 더함
        const currentCoinCount = Math.floor(target / coin);
        coinCount += currentCoinCount;
        // (동전 금액, 사용된 개수) 형태로 상세 내역 저장
        details.push({ coin, count: currentCoinCount });
        // 남은 금액 계산
        target = target % coin;
    }
    
    console.log("Coin details:", details);
    return coinCount;
}

// 테스트 함수 정의
function testCoinCount(): void {
    console.log("=== 동전 개수 최적화 테스트 ===");
    
    const testCases: number[] = [4260, 1000, 1234, 999];
    
    testCases.forEach((amount: number) => {
        console.log(`\n${amount}원을 만드는데 필요한 최소 동전 개수:`);
        const result = minCoinCount(coinList, amount);
        console.log(`결과: ${result}개`);
    });
}

// 테스트 실행
testCoinCount();



// ==================== 분할 가능한 배낭 문제 ====================

// 아이템 타입 정의
type Item = {
    weight: number;
    value: number;
    valuePerWeight: number;
};

// 배낭 결과 타입 정의
type KnapsackResult = {
    totalValue: number;
    details: Array<{
        weight: number;
        value: number;
        fraction: number;
    }>;
};

/**
 * 무게 제한 내에서 최대 가치를 구하는 그리디 알고리즘 (분할 가능한 배낭 문제)
 * @param items 아이템 배열 (무게, 가치)
 * @param capacity 배낭의 용량
 * @returns 최대 가치와 상세 내역
 */
function getMaxValue(items: Array<[number, number]>, capacity: number): KnapsackResult {
    // 무게당 가치를 계산하고 내림차순으로 정렬
    const sortedItems: Item[] = items
        .map(([weight, value]) => ({
            weight,
            value,
            valuePerWeight: value / weight
        }))
        .sort((a, b) => b.valuePerWeight - a.valuePerWeight);

    let totalValue: number = 0;
    let remainingCapacity: number = capacity;
    const details: Array<{ weight: number; value: number; fraction: number }> = [];

    for (const item of sortedItems) {
        if (remainingCapacity <= 0) break;

        if (remainingCapacity >= item.weight) {
            // 아이템을 완전히 담을 수 있는 경우
            remainingCapacity -= item.weight;
            totalValue += item.value;
            details.push({
                weight: item.weight,
                value: item.value,
                fraction: 1
            });
        } else {
            // 아이템의 일부만 담을 수 있는 경우
            const fraction: number = remainingCapacity / item.weight;
            totalValue += item.value * fraction;
            details.push({
                weight: item.weight,
                value: item.value,
                fraction: fraction
            });
            break;
        }
    }

    return { totalValue, details };
}

// 테스트 데이터
const itemList: Array<[number, number]> = [
    [10, 10], [15, 12], [20, 10], [25, 8], [30, 5]
];

// 테스트 실행
function testKnapsack(): void {
    console.log("\n=== 배낭 문제 (분할 가능) 테스트 ===");
    console.log("아이템 목록 (무게, 가치):", itemList);
    
    const result = getMaxValue(itemList, 30);
    
    console.log("\n최종 결과:");
    console.log(`총 가치: ${result.totalValue.toFixed(2)}`);
    console.log("상세 내역:");
    result.details.forEach((detail, index) => {
        console.log(`  ${index + 1}. 무게: ${detail.weight}, 가치: ${detail.value}, 비율: ${detail.fraction.toFixed(2)}`);
    });
}

testKnapsack();


// ==================== 작업 스케줄링 문제 ====================

/**
 * 작업 스케줄링 결과 타입 정의
 */
type SchedulingResult = {
    totalWaitingTime: number;
    processingOrder: number[];
    individualWaitingTimes: number[];
};

/**
 * 최소 대기 시간을 위한 작업 스케줄링 그리디 알고리즘
 * 처리 시간이 짧은 작업부터 처리하여 전체 대기 시간을 최소화
 * @param processingTimes 각 작업의 처리 시간 배열
 * @param shouldSort 정렬 여부 (기본값: true)
 * @returns 스케줄링 결과 (총 대기 시간, 처리 순서, 개별 대기 시간)
 */
function calculateTotalWaitingTime(processingTimes: number[], shouldSort: boolean = true): SchedulingResult {
    // 정렬 여부에 따라 처리 순서 결정
    const orderedTimes: number[] = shouldSort 
        ? [...processingTimes].sort((a, b) => a - b)
        : [...processingTimes];
    
    let totalWaitingTime: number = 0;
    let currentWaitingTime: number = 0;
    const individualWaitingTimes: number[] = [];
    
    for (const time of orderedTimes) {
        currentWaitingTime += time;
        totalWaitingTime += currentWaitingTime;
        individualWaitingTimes.push(currentWaitingTime);
    }
    
    return {
        totalWaitingTime,
        processingOrder: orderedTimes,
        individualWaitingTimes
    };
}

// 테스트 데이터
const tasks: number[] = [3, 1, 4, 3, 2];

// 테스트 실행
function testScheduling(): void {
    console.log("\n=== 작업 스케줄링 문제 테스트 ===");
    console.log("원본 작업 처리 시간:", tasks);
    
    // 최적화된 순서 (정렬됨)
    const optimizedResult = calculateTotalWaitingTime(tasks, true);
    console.log("\n최적 처리 순서 (짧은 시간부터):", optimizedResult.processingOrder);
    console.log("개별 대기 시간:", optimizedResult.individualWaitingTimes);
    console.log(`총 대기 시간: ${optimizedResult.totalWaitingTime}`);
    
    // 원본 순서 (정렬하지 않음)
    const originalResult = calculateTotalWaitingTime(tasks, false);
    console.log("\n원본 순서로 처리했을 때:", originalResult.processingOrder);
    console.log("개별 대기 시간:", originalResult.individualWaitingTimes);
    console.log(`총 대기 시간: ${originalResult.totalWaitingTime}`);
    
    const improvement = originalResult.totalWaitingTime - optimizedResult.totalWaitingTime;
    console.log(`\n최적화로 인한 대기 시간 단축: ${improvement} (${((improvement / originalResult.totalWaitingTime) * 100).toFixed(1)}% 개선)`);
}

testScheduling();