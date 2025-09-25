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

// 4260원을 만드는데 필요한 최소 동전 개수 출력
console.log(minCoinCount(coinList, 4260));

// 추가 테스트 케이스들
console.log("\n=== 추가 테스트 케이스 ===");
console.log("1000원:", minCoinCount(coinList, 1000));
console.log("1234원:", minCoinCount(coinList, 1234));
console.log("999원:", minCoinCount(coinList, 999));
