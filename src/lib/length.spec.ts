import test from 'ava';

import { iterate } from './iterate';
import { length } from './length';

test('length() works fine', t => {
  const result = iterate([1, 2, 3])(length);

  t.is(result, 3);
});
