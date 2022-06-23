/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */

import test from 'ava';

import { filter } from './filter';
import { iterate } from './iterate';
import { map } from './map';
import { toArray } from './to-array';

function record<T>(callstack: string[], recorder: (item: T) => string): (items: Iterable<T>) => Iterable<T> {
  return function* (items: Iterable<T>): Iterable<T> {
    for (const item of items) {
      const log = recorder(item);
      callstack.push(log);
      yield item;
    }
  }
}

const recordFilter = <T>(callstack: string[]) => record<T>(callstack, x => `filter ${x}`);
const recordMap = <T>(callstack: string[]) => record<T>(callstack, x => `map ${x}`);

function isIterable<TExpected>(result: Iterable<TExpected>): result is Iterable<TExpected> {
  if (typeof result[Symbol.iterator] === 'function') {
    return true;
  }
  return false;
}

test('iterate() is evaluated on toArray() call', t => {
  const callstack: string[] = [];

  const result = iterate([1, 2, 3])(
    recordFilter(callstack),
    filter(x => x < 3),
    toArray
  );

  t.deepEqual(result, [1, 2]);
  t.deepEqual(callstack, [
    'filter 1',
    'filter 2',
    'filter 3',
  ]);
});

test('iterate() is evaluated with for-of loop', t => {
  const callstack: string[] = [];

  const iterable = iterate([1, 2, 3])(
    recordFilter(callstack),
    filter(x => x < 3)
  );

  let result: readonly number[] = [];

  for (const item of iterable) {
    result = [...result, item];
  }

  t.deepEqual(result, [1, 2]);
  t.deepEqual(callstack, [
    'filter 1',
    'filter 2',
    'filter 3',
  ]);
});

test('iterate() is not evaluated without materialization', t => {
  const callstack: string[] = [];

  const result = iterate([1, 2, 3])(
    recordFilter(callstack),
    filter(x => x < 3)
  );

  t.true(isIterable<number>(result));
  t.deepEqual(callstack, []);
});

test('iterate() is lazy evaluated', t => {
  const callstack: string[] = [];

  const result = iterate([1, 2, 3, 4])(
    recordFilter(callstack),
    filter(x => x !== 3),
    recordMap(callstack),
    map(x => 'a' + x),
    toArray
  );

  t.deepEqual(result, ['a1', 'a2', 'a4']);
  t.deepEqual(callstack, [
    'filter 1',
    'map 1',
    'filter 2',
    'map 2',
    'filter 3',
    'filter 4',
    'map 4'
  ]);
});
