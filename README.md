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

```js
import { iterate, filter } from 'iterate.js';

iterate([1, 2, 3])(filter(x => x < 3));
```

## Lazy evaluation

Lazy evaluation means that operations are executed just-in-time, instead of executing them eagerly.

For example - eagerly-evaluated JS code is:

```js
const result = [1, 2, 3]
  .filter(x => x < 3)
  .map(x => 'a' + x);
```

The main drawback is that it creates an array for each step in the process:

```js
const result = [1, 2, 3]
  .filter(x => x < 3)                 // -> [1, 2]
  .map(x => 'a' + x);                 // -> ['a1', 'a2']
```

In this case, lazy evaluation means processing data on the fly and creating only single array at the end. It can be particularly useful when working with large data sets.

iterate.js provides convenient API for doing this:

```js
const result = iterate([1, 2, 3])(
  filter(x => x < 3),                 // -> Iterable<number>
  map(x => 'a' + x),                  // -> Iterable<string>
  toArray                             // -> ['a1', 'a2']
);
```

It's also possible to efficiently iterate the data, without creating an array:

```js
const iterable = iterate([1, 2, 3])(filter(x => x < 3));

for (const item of iterable) {
  // item = 1
  // item = 2
}
```

## References

- [typescript-starter](https://github.com/bitjson/typescript-starter) - Quickly create and configure a new library or Node.js project.
- [wu.js](https://fitzgen.github.io/wu.js/) - JavaScript library providing higher order functions for ECMAScript 6 iterators. 
- [rxjs](https://github.com/ReactiveX/rxjs) - Reactive extensions for JavaScript.
