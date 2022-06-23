/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */

export function length<T>(iterable: Iterable<T>): number {
  let length = 0;
  for (const _ of iterable) {
    length++;
  }
  return length;
}
