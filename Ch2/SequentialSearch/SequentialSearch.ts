// 랜덤 데이터 리스트 생성
const randDataList: number[] = [];
for (let i = 0; i < 10; i++) {
    randDataList.push(Math.floor(Math.random() * 100) + 1);
}

// 순차 검색 함수
export const sequentialSearch = (dataList: number[], target: number): number => {
    if (dataList.length === 0 || dataList === null) {
        return -1;
    } else {
        for (let index = 0; index < dataList.length; index++) {
            if (dataList[index] === target) {
                return index;
            }
        }
        return -1;
    }
}

// 결과 출력
console.log("Data List:", randDataList);
console.log(sequentialSearch(randDataList, 50));
