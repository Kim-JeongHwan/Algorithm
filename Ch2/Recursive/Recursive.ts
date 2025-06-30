// Factorial
export const factorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

// List Recursion
export const listRecursion = (list: number[]): number => {
  if (list.length === 0) return 0;
  return list[0] + listRecursion(list.slice(1));
};

// Palindrome
export const palindrome = (str: string): boolean => {
  if (str.length <= 1) return true;
  return str[0] === str[str.length - 1] && palindrome(str.slice(1, -1));
};

// Collatz
export const collatz = (n: number): number => {
  if (n === 1) return 1;
  if (n % 2 === 0) return collatz(n / 2);
  return collatz(3 * n + 1);
};

// n을 1+2+3 의 합으로 나타내는 방법의 수
export const countWays = (n: number): number => {
  if (n === 0) return 1;
  if (n < 0) return 0;
  return countWays(n - 1) + countWays(n - 2) + countWays(n - 3);
};

console.log(palindrome("racecar"));
console.log(palindrome("hello"));
console.log(countWays(3));