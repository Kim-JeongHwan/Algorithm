// Fibonacci
export const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// 2×1 타일링 문제
export const tileWays = (n: number): number => {
  if (n <= 2) return n;
  return tileWays(n - 1) + tileWays(n - 2);
};

// 삼각형 수열 (동적 계획법)
export const triangle = (num: number): number => {
  // 기저 케이스
  if (num <= 3) return 1;
  
  // 캐시 배열 초기화
  const cache: number[] = [1, 1, 1];
  
  // 동적 계획법으로 계산
  for (let i = 3; i < num; i++) {
    cache.push(cache[i - 2] + cache[i - 3]);
  }
  return cache[num - 1];
};

console.log(fibonacci(10));
console.log(tileWays(4));
console.log(triangle(10));