
import { isType } from './fsw-structure';

it('should check symbol types', () => {
  expect(isType('S10000', 'hand')).toBe(true);
  expect(isType('S10000', 'head')).toBe(false);
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
