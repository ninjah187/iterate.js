/* eslint-disable functional/prefer-readonly-type */

export function toArray<T>(items: Iterable<T>): T[] {
  return [...items];
}
