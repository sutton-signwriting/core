
import { colorize } from './fsw-colorize';

it('should return the right color for a symbol key', () => {
  expect(colorize('S10000')).toBe("#0000CC");
  expect(colorize('S20600')).toBe("#CC0000");
  expect(colorize('S2f700')).toBe("#FF0099");
  expect(colorize('S35d00')).toBe("#006600");
  expect(colorize('S36d00')).toBe("#000000");
  expect(colorize('S37f00')).toBe("#884411");
  expect(colorize('S38b00')).toBe("#FF9900");
  expect(colorize('S00000')).toBe("#000000");
})

it('should not break colorize on bad input', () => {
  expect(colorize()).toBe('#000000')
  expect(colorize(5)).toBe('#000000')
  expect(colorize(['what'])).toBe('#000000')
})
