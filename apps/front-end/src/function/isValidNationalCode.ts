export function isValidNationalCode(input: string) {
  if (!/^\d{10}$/.test(input)) return false;
  const check = +input[9]!;
  const sum =
    input
      .split('')
      .slice(0, 9)
      .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
  return sum < 2 ? check === sum : check + sum === 11;
}
