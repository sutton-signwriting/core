
import { isType } from './swu-structure';

it('should pass', () => {
  expect(true).toBe(true);
})

it('should check symbol types', () => {
  expect(isType('񀀁', 'hand')).toBe(true);
  expect(isType('񀀁', 'head')).toBe(false);
  expect(isType('񋾡', 'hand')).toBe(false);
  expect(isType('񋾡', 'head')).toBe(true);
})

it('should not break isType on bad input', () => {
  expect(isType()).toBe(false);
  expect(isType(5)).toBe(false);
  expect(isType(['what'])).toBe(false);
  expect(isType('S10000')).toBe(false);
  expect(isType('S10000', 5)).toBe(false);
  expect(isType('S10000', ['a'])).toBe(false);
  expect(isType('S10000', 'unavailable')).toBe(false);
})
