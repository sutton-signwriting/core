
import { range } from './fswquery-range';

it('should return a range for min and max', () => {
  expect(range(500, 750)).toBe('(([56][0-9][0-9])|(7[0-4][0-9])|(750))');
})

it('should return a range for min and max in hex', () => {
  expect(range('100', '10e', 'hex')).toBe('10[0-9a-e]');
})
