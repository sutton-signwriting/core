
import { regex } from './fswquery-regex';

it('should return regex for general query string', () => {
  expect(regex('Q')).toEqual(['(?:A(?:S00000|S[123][0-9a-f]{2}[0-5][0-9a-f])+)?[BLMR][0-9]{3}x[0-9]{3}(?:S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*']);
})

it('should return regex for complex query strings 1', () => {
  expect(regex('QAS10000R100t204S20500T')).toEqual(['(?:AS10000S((1[0-9a-f][0-9a-f])|(20[0-4]))[0-5][0-9a-f]S20500(?:S00000|S[123][0-9a-f]{2}[0-5][0-9a-f])*)[BLMR][0-9]{3}x[0-9]{3}(?:S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*']);
})
it('should return regex for complex query strings 2', () => {
    expect(regex('QAS10000R100t204S20500TS20000500x500')).toEqual(['(?:AS10000S((1[0-9a-f][0-9a-f])|(20[0-4]))[0-5][0-9a-f]S20500(?:S00000|S[123][0-9a-f]{2}[0-5][0-9a-f])*)[BLMR][0-9]{3}x[0-9]{3}(?:S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*S20000((4[89][0-9])|(5[01][0-9])|(520))x((4[89][0-9])|(5[01][0-9])|(520))(?:S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*']);
})

it('should return regex for query string with styling', () => {
  expect(regex('QS20000R100t105500x500-')).toEqual(['(?:A(?:S00000|S[123][0-9a-f]{2}[0-5][0-9a-f])+)?[BLMR][0-9]{3}x[0-9]{3}(?:S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*S20000[0-9]{3}x[0-9]{3}(?:S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*(?:-(C)?(P[0-9]{2})?(G_(?:(?:[0-9a-fA-F]{3}){1,2}|[a-zA-Z]+)_)?(D_(?:(?:[0-9a-fA-F]{3}){1,2}|[a-zA-Z]+)(?:,(?:(?:[0-9a-fA-F]{3}){1,2}|[a-zA-Z]+))?_)?(Z(?:[0-9]+(?:\\.[0-9]+)?|x))?(?:-((?:D[0-9]{2}_(?:(?:[0-9a-fA-F]{3}){1,2}|[a-zA-Z]+)(?:,(?:(?:[0-9a-fA-F]{3}){1,2}|[a-zA-Z]+))?_)*))?(?:-(-?[_a-zA-Z][_a-zA-Z0-9-]{0,100}(?: -?[_a-zA-Z][_a-zA-Z0-9-]{0,100})*)?!(?:([a-zA-Z][_a-zA-Z0-9-]{0,100})!)?)?)?',
    '(?:A(?:S00000|S[123][0-9a-f]{2}[0-5][0-9a-f])+)?[BLMR][0-9]{3}x[0-9]{3}(?:S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*S10[0-5][0-5][0-9a-f]((4[89][0-9])|(5[01][0-9])|(520))x((4[89][0-9])|(5[01][0-9])|(520))(?:S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*(?:-(C)?(P[0-9]{2})?(G_(?:(?:[0-9a-fA-F]{3}){1,2}|[a-zA-Z]+)_)?(D_(?:(?:[0-9a-fA-F]{3}){1,2}|[a-zA-Z]+)(?:,(?:(?:[0-9a-fA-F]{3}){1,2}|[a-zA-Z]+))?_)?(Z(?:[0-9]+(?:\\.[0-9]+)?|x))?(?:-((?:D[0-9]{2}_(?:(?:[0-9a-fA-F]{3}){1,2}|[a-zA-Z]+)(?:,(?:(?:[0-9a-fA-F]{3}){1,2}|[a-zA-Z]+))?_)*))?(?:-(-?[_a-zA-Z][_a-zA-Z0-9-]{0,100}(?: -?[_a-zA-Z][_a-zA-Z0-9-]{0,100})*)?!(?:([a-zA-Z][_a-zA-Z0-9-]{0,100})!)?)?)?']);
})

it('should return regex for prefix OR search', () => {
  expect(regex('QAS105uuoS107uuT')).toEqual(['(?:A(?:S105[0-5][0-9a-f]|S107[0-5][0-9a-f])(?:S00000|S[123][0-9a-f]{2}[0-5][0-9a-f])*)[BLMR][0-9]{3}x[0-9]{3}(?:S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*']);
})

it('should return regex for signbox OR search', () => {
  expect(regex('QS105uuoS107uu')).toEqual(['(?:A(?:S00000|S[123][0-9a-f]{2}[0-5][0-9a-f])+)?[BLMR][0-9]{3}x[0-9]{3}(?:S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*(?:S105[0-5][0-9a-f]|S107[0-5][0-9a-f])[0-9]{3}x[0-9]{3}(?:S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*']);
})
