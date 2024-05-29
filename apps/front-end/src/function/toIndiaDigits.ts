export function toIndiaDigits(value: string | number) {
  const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return value.toString().replace(/[0-9]/g, (w) => id[+w]!);
}
