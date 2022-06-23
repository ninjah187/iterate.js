/* eslint-disable functional/no-loop-statement */

export function map<T, U>(mapper: (item: T) => U): (iterable: Iterable<T>) => Iterable<U> {
  return function* (iterable: Iterable<T>): Iterable<U> {
    for (const item of iterable) {
      yield mapper(item);
    }
  };
}
