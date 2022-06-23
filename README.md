# iterate.js
## Lazy operations on `Iterable<T>`

This package is a set of utils functions for working with JavaScript iterators and `Iterable<T>`.

- Lazy-evaluated - reduce memory usage on big data sets.
- Built on top of native `Iterable<T>` - stick to well-established standards.
- Fully tree-shakable - add minimal code overhead.
- TypeScript support - leverage static type checking and code hints.
- Functional programming approach - use the best modern practices.
- Mimics array API - easy to understand and get started.

Inspired by wu.js, rxjs and LINQ.

## Quickstart

Install the library:
```
npm install --save iterate.js
```
Import and you're good to go:
```
import { iterate, filter } from 'iterate.js';

iterate([1, 2, 3])(filter(x => x < 3));
```

## Lazy evaluation

Lazy evaluation means that operations are executed just-in-time, instead of executing them eagerly.

For example - eagerly-evaluated JS code is:

```
const result = [1, 2, 3]
  .filter(x => x < 3)
  .map(x => 'a' + x);
```

The main drawback is that it creates an array for each step in the process:

```
const result = [1, 2, 3]
  .filter(x => x < 3)                 // -> [1, 2]
  .map(x => 'a' + x);                 // -> ['a1', 'a2']
```

In this case, lazy evaluation means processing data on the fly and creating only single array at the end. It can be particularly useful when working with large data sets.

iterate.js provides convenient API for doing this:

```
const result = iterate([1, 2, 3])(
  filter(x => x < 3),                 // -> Iterable<number>
  map(x => 'a' + x),                  // -> Iterable<string>
  toArray                             // -> ['a1', 'a2']
);
```

It's also possible to efficiently iterate the data, without creating an array:

```
const iterable = iterate([1, 2, 3])(filter(x => x < 3));

for (const item of iterable) {
  // item = 1
  // item = 2
}
```
