
import { symbolRanges } from './swuquery-symbol-ranges';

it('should return a range for symbol', () => {
  expect(symbolRanges('񀀁')).toBe('\uD8C0\uDC01');
  expect(symbolRanges('񀀁f')).toBe('(\uD8C0\uDC01|\uD8C0\uDC11|\uD8C0\uDC21|\uD8C0\uDC31|\uD8C0\uDC41|\uD8C0\uDC51)');
  expect(symbolRanges('񀀁r')).toBe('\uD8C0[\uDC01-\uDC10]');
  expect(symbolRanges('񀀁fr')).toBe('\uD8C0[\uDC01-\uDC60]');
})
