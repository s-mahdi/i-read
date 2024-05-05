export async function* zipAsync<T, U>(
  iter1: AsyncIterable<T>,
  iter2: AsyncIterable<U>
): AsyncIterable<[T, U]> {
  const iterator1 = iter1[Symbol.asyncIterator]();
  const iterator2 = iter2[Symbol.asyncIterator]();

  while (true) {
    const result1 = await iterator1.next();
    const result2 = await iterator2.next();

    if (result1.done || result2.done) {
      break;
    }

    yield [result1.value, result2.value];
  }
}
