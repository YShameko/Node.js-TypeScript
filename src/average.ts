function average(numbers: number[]): number {
  let sum: number = 0;
  if (numbers.length === 0) {
    return 0;
  }
  sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

export default average;
