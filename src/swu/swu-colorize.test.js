
import { colorize } from './swu-colorize';
import { code2swu } from '../convert';

it('should pass', () => {
  expect(true).toBe(true);
})

it('should return the right color for a symbol key', () => {
  expect(colorize(code2swu(0x40001))).toBe('#0000CC');
  expect(colorize(code2swu(0x461e0))).toBe('#0000CC');
  expect(colorize(code2swu(0x461e1))).toBe('#CC0000');
  expect(colorize(code2swu(0x4bca0))).toBe('#CC0000');
  expect(colorize(code2swu(0x4bca1))).toBe('#FF0099');
  expect(colorize(code2swu(0x4bfa0))).toBe('#FF0099');
  expect(colorize(code2swu(0x4bfa1))).toBe('#006600');
  expect(colorize(code2swu(0x4e8e0))).toBe('#006600');
  expect(colorize(code2swu(0x4e8e1))).toBe('#000000');
  expect(colorize(code2swu(0x4ec40))).toBe('#000000');
  expect(colorize(code2swu(0x4efa1))).toBe('#884411');
  expect(colorize(code2swu(0x4f2a0))).toBe('#884411');
  expect(colorize(code2swu(0x4f2a1))).toBe('#FF9900');
  expect(colorize(code2swu(0x4f480))).toBe('#FF9900');
})

it('should not break colorize on bad input', () => {
  expect(colorize()).toBe('#000000')
  expect(colorize(5)).toBe('#000000')
  expect(colorize(['what'])).toBe('#000000')
})
