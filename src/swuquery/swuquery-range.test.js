
import { range } from './swuquery-range';

it('should return a range for min and max of symbols', () => {
  expect(range('񀀁', '񀇡')).toBe('\uD8C0[\uDC01-\uDDE1]');
})

it('should return a range for min and max of numbers', () => {
  expect(range('𝣔', '𝤸')).toBe('\uD836[\uDCD4-\uDD38]');
})
