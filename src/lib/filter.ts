/* eslint-disable functional/no-loop-statement */

export function filter<T>(predicate: (item: T) => boolean): (iterable: Iterable<T>) => Iterable<T> {
  return function* (iterable: Iterable<T>): Iterable<T> {
    for (const item of iterable) {
      if (predicate(item)) {
        yield item;
      }
    }
  }
}
