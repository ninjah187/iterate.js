/* eslint-disable functional/functional-parameters */
import { Projection } from './projection';

export function iterate<T>(iterable: Iterable<T>) {
  return iterate_core(iterable);
}

// We need iterate_core to pull up proper TypeScript type resolving for iterate.
// If I try to export iterate_core directly, I get an error "Return type of exported function has or is using private name 'project'.ts(4060)".
function iterate_core<T>(iterable: Iterable<T>): typeof project {

  function project<T1, T2, T3, T4, U>(p1: Projection<Iterable<T>, T1>, p2: Projection<T1, T2>, p3: Projection<T2, T3>, p4: Projection<T3, T4>, p5: Projection<T4, U>): U;
  function project<T1, T2, T3, U>(p1: Projection<Iterable<T>, T1>, p2: Projection<T1, T2>, p3: Projection<T2, T3>, p4: Projection<T3, U>): U;
  function project<T1, T2, T3, U>(p1: Projection<Iterable<T>, T1>, p2: Projection<T2, T3>, p3: Projection<T3, U>): U;
  function project<T1, T2, U>(p1: Projection<Iterable<T>, T1>, p2: Projection<T1, T2>, p3: Projection<T2, U>): U;
  function project<T1, U>(p1: Projection<Iterable<T>, T1>, p2: Projection<T1, U>): U;
  function project<U>(p1: Projection<Iterable<T>, U>): U;
  function project(): Iterable<T>;
  function project(...projections: readonly Projection<any, any>[]): any {
    return projections.reduce((x, f) => f(x), iterable);
  }

  return project;
}
