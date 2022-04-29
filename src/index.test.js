import { sum, mul } from './index';

/* eslint-disable */
describe('Wokring suite', () => {
  test('sum', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('mul', () => {
    expect(mul(1, 2)).toBe(2);
  });
});
/* eslint-enable */
